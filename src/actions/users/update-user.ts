'use server'

import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { Role, ROLE_VALUES } from '@/interfaces/user.interface'

const userSchema = z.object({
  id: z
    .string()
    .uuid(),
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(255, { message: 'El nombre debe tener menos de 255 caracteres' }),
  email: z
    .string()
    .email({ message: 'El correo no es válido' }),
  phoneNumber: z
    .string()
    .min(10, { message: 'El número de teléfono debe tener 10 caracteres sin el código de país' })
    .max(10, { message: 'El número de teléfono debe tener 10 caracteres sin el código de país' }),
  password: z
    .string()
    .optional()
    .refine(value => !value || (value.length >= 6 && value.length <= 10), {
      message: 'La contraseña debe tener entre 6 y 10 caracteres si se proporciona'
    }),
  role: z
    .enum(ROLE_VALUES)
    .optional(),
  isActive: z
    .boolean()
    .optional(),
  image: z
    .string()
    .nullable()
    .optional()
})

interface IData {
  id: string
  name: string
  email: string
  phoneNumber: string
  password?: string | null
  role?: Role
  isActive?: boolean
  image?: string | null
}

export const updateUser = async (data: IData) => {
  try {
    const userParsed = userSchema.safeParse(data)

    if (!userParsed.success) {
      return {
        ok: false,
        message: 'Error al subir imagen'
      }
    }

    const { name, email, password, id, phoneNumber, role, isActive, image } = userParsed.data

    const dataUserUpdated: {
      name: string
      email: string
      phoneNumber: string
      password?: string
      role?: Role
      isActive?: boolean
      image?: string | null
    } = {
      name,
      email,
      phoneNumber
    }

    if (role !== undefined) {
      dataUserUpdated.role = role
    }

    if (isActive !== undefined) {
      dataUserUpdated.isActive = isActive
    }

    if (image !== undefined) {
      dataUserUpdated.image = image
    }

    if (password && password.length > 0) {
      const encryptedPassword = bcrypt.hashSync(password)
      dataUserUpdated.password = encryptedPassword
    }

    const userUpdated = await prisma.user.update({
      where: { id },
      data: dataUserUpdated
    })

    if (!userUpdated) {
      return {
        ok: false,
        message: 'Usuario no encontrado'
      }
    }

    revalidatePath('/platform/admin/users')
    revalidatePath('/platform/profile')

    return {
      ok: true,
      message: 'Usuario actualizado correctamente'
    }
  } catch (error) {
    console.error('Error al actualizar usuario', error)
    return {
      ok: false,
      message: 'Error al actualizar usuario, por favor contacte a soporte'
    }
  }
}
