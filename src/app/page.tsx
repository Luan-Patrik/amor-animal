import Home from '@/components/Home'
import TotalAnimals from '@/components/TotalAnimals'

export default function PageHome() {
  return (
    <div className='flex min-h-[calc(100svh_-_5.54rem)] flex-col justify-center gap-10'>
      <Home />
      <TotalAnimals page='1' postsPerPage='3' totalItems={3} />
    </div>
  )
}
