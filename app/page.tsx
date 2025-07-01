import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import Cts from '@/components/Cts'
import { recentSessions } from '@/constants'
import { getAllCompanions, getRecentSessions } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
import React from 'react'

const Page = async () => {
  const companions = await getAllCompanions({limit: 3});
  const recentSessionsCompanions = await getRecentSessions(10);
  return (
    <main>
      <h1 className='text-2xl underline'>Popular Companions</h1>
      <section className='home-section'>
        {
          companions.map((companion)=> (
            <CompanionCard 
              key={companion.id}
              {...companion}
              color = {getSubjectColor(companion.subject)}
            />
          ))
        }
        
      </section>
      
      <section className='home-section'>
        <CompanionList 
          title='Recent Completed Sessions'
          companions={recentSessionsCompanions}
          className='w-2/3 max-lg:w-full'
        />
        <Cts />
      </section>
    </main>
  )
}

export default Page