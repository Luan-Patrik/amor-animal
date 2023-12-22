import SignInForm from '@/components/forms/SignInForm'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function signInPage() {
  const session = await auth()

  if (session) redirect('/')

  return <SignInForm />
}
