import HeaderClient from "./HeaderClient"
import { getUserSessionServer } from "@/actions/auth/getUserSessionServer"
import { userHasMembership } from "@/actions/auth/access"

export default async function HeaderServer() {
  const session = await getUserSessionServer()
  const user = session || null

  const hasMembership = user ? await userHasMembership(user.id) : false
  const isAdmin = user?.role === "admin"

  return <HeaderClient hasMembership={hasMembership} isAdmin={isAdmin} />
}