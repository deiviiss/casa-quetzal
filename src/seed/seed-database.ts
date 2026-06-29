import { initialData } from './seed'
import { countries } from './seed-countries'
import prisma from '../lib/prisma'

const main = async () => {
  // delete all data (order matters for FK constraints)
  await prisma.purchase.deleteMany()
  await prisma.product.deleteMany()
  await prisma.userAddress.deleteMany()
  await prisma.country.deleteMany()
  await prisma.user.deleteMany()

  // seed
  const { users } = initialData

  // users
  await prisma.user.createMany({
    data: users
  })

  // countries
  await prisma.country.createMany({
    data: countries
  })

  // products (membership)
  await prisma.product.create({
    data: {
      name: 'Membresía Dispensario',
      type: 'membership',
      price: 0,
      isActive: true,
    }
  })

  console.log('Seed executed successfully')
}

(() => {
  if (process.env.NODE_ENV === 'production') return

  main()
}
)()

