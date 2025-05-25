import CompanionForm from '@/components/CompanionForm'

const comapnionForm = () => {
  return (
    <main className='min-lg:w-1/3 min-md:2/3 items-center justify-center pb-5'>
      <article className='w-full gap-4 flex flex-col'>
        <h1>Companion Builder</h1>

        <CompanionForm />
      </article>
    </main>
  )
}

export default comapnionForm
