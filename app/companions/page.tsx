import { getAllCompanions } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";

const Companions = async ({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) => {
  const filters = await searchParams;
  const subject = filters?.subject?.toString() || '';
  const topic = filters?.topic?.toString() || '';

  const companions = await getAllCompanions({subject, topic}); 

  return ( 
    <main>
        <section className="flex justify-between gap-4 max-sm:flex-col">
          <h1>Companion Library</h1>
          <div className="flex gap-4">
            <SearchInput />
            <SubjectFilter />
          </div>
        </section>
        <section className="companions-grid">
          {companions.map((companion)=>(
            <CompanionCard 
            key={companion.id} 
            {...companion}
            color={getSubjectColor(companion.subject)}
             />
          ))}
        </section>
    </main>
  )
}

export default Companions  
