'use client';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
        const delayBebounceFn = setTimeout(()=>{
            if(searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: 'topic',
                    value: searchQuery
                });
                router.push(newUrl, {scroll: false});
            } else {
                if(pathname === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ['topic'],
                    });
                    router.push(newUrl, {scroll: false});
                }
            }
         }, 300);
        },[searchParams,pathname,router,searchQuery])

  return (
    <div className='relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit'>
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <input 
        type="text"
        placeholder='Search companions ...'
        className='outline-none'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
       />
    </div>
  )
}

export default SearchInput
