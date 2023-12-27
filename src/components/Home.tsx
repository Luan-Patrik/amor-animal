import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

const Home = () => {
  return (
    <section className='flex items-center justify-center'>
      <div className='container relative flex flex-col gap-2 sm:max-w-3xl'>
        <h1 className='text-center text-4xl font-bold very-xs:text-5xl sm:text-6xl md:text-7xl'>
          Meu amor animal
        </h1>
        <p className='font mx-auto text-base font-normal sm:text-lg'>
          Sua plataforma dedicada à busca de animais perdidos. Juntos, podemos
          reunir famílias e trazer alegria de volta aos lares. Navegue pelos
          perfis, compartilhe informações e seja parte dessa missão de amor
          pelos animais. Vamos transformar histórias de perda em emocionantes
          reencontros. Sua ajuda faz a diferença.
        </p>
        <div className='flex flex-col gap-2 very-xs:flex-row'>
          <Link
            href='/animais/1'
            className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}>
            Animais
          </Link>
          <Link
            href='/cadastrar-animal'
            className={cn(buttonVariants({ variant: 'default' }), 'w-full')}>
            Divulgar animal
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home
