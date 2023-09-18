import { getAuthSession } from "@/lib/auth"

export async function getCurrentUser() {
  const session = await getAuthSession()
  return session?.user
}