import Registracija from '@/components/Register/Registracija'
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const Page = async () => {
  const session = await getServerSession(authOptions)
  if(!session?.user){ return (
    <div className='flex items-center justify-center h-screen'>
      <div className='p-6 flex flex-col items-center max-w-md'>
        <Registracija />
      </div>
    </div>
  )}
  else redirect('/')
}

export default Page;
