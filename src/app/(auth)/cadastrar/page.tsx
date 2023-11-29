import SignUpForm from '@/components/forms/SignUpForm'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function signUpPage() {
  const session = await auth()

  if (session) redirect('/')

  return <SignUpForm />
}
