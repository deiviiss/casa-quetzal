import HeaderClient from "./HeaderClient"
import { getUserSessionServer } from "@/actions/auth/getUserSessionServer"

export default async function HeaderServer() {
  const session = await getUserSessionServer()
  const user = session || null

  const isAdmin = user?.role === "admin"

  return <HeaderClient isAdmin={isAdmin} />
}