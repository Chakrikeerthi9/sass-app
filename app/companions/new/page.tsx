import CompanionForm from '@/components/CompanionForm'
import { newCompanionPermissions } from '@/lib/actions/companion.actions';
import { auth } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const comapnionForm = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const canCreateCompanion = await newCompanionPermissions();


  return (
    <main className='min-lg:w-1/3 min-md:2/3 items-center justify-center pb-5'>
      {canCreateCompanion ? (
        <article className='w-full gap-4 flex flex-col'>
          <h1>Companion Builder</h1>

          <CompanionForm />
        </article>
      ) : (
        <article className='companion-limit'>
          <Image src="/images/limit.svg" alt="Companion limit reached" width={360} height={230} />

          <div className='cta-badge'>
            Upgrade your plan
          </div>
          <h1>You've reached monthly companion limit</h1>
          <p>Upgrade your plan to create more companions</p>

          <Link href="/subscription" className='btn-primary w-full justify-center'>
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  )
}

export default comapnionForm
