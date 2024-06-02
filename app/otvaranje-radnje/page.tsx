import Setup from '@/components/OtvaranjeRadnje/Setup'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const Page = async () => {
    const session = await getServerSession(authOptions) 
  return (
    <div className='flex flex-col mt-0 md:mt-10 lg:mt-24'>
        <Setup session={session} />
    </div>
  )
}

export default Page