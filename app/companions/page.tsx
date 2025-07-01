import { getAllCompanions } from "@/lib/actions/companion.actions";
import { SearchParams } from "next/dist/server/request/search-params";

const Companions = async ({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) => {
  const filters = await searchParams;
  const subject = filters?.subject?.toString() || '';
  const topic = filters?.topic?.toString() || '';

  const companions = await getAllCompanions({subject, topic});  

  console.log(companions)

  return ( 
    <div>
        Companions
    </div>
  )
}

export default Companions  
