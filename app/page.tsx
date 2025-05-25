import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import Cts from '@/components/Cts'
import { recentSessions } from '@/constants'
import React from 'react'

const Page = () => {
  return (
    <main>
      <h1 className='text-2xl underline'>Popular Companions</h1>
      <section className='home-section'>
        <CompanionCard 
          id='123'
          name='Neura the Brainy Exploreer'
          topic='Neural Network of the Brain'
          subject='science'
          duration={45}
          color='#ffda6e'
        />
        <CompanionCard 
          id='456'
          name='Countsy the Number Wizard'
          topic='Derivation & Integrals'
          subject='science'
          duration={30}
          color='#e5d0ff'
        />
        <CompanionCard 
          id='123'
          name='Verba the Vocabulary Builder'
          topic='language'
          subject='English Literature'
          duration={39}
          color='#bde7ff'
        />
        
      </section>
      
      <section className='home-section'>
        <CompanionList 
          title='Recent Completed Sessions'
          companions={recentSessions}
          className='w-2/3 max-lg:w-full'
        />
        <Cts />
      </section>
    </main>
  )
}

export default Page