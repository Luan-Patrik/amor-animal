import RegisterAnimal from '@/components/forms/RegisterAnimal'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function RegisterAnimalPage() {
  const session = await auth()

  if (!session) return redirect('/entrar')

  return <RegisterAnimal />
}
