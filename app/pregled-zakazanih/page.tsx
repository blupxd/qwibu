import ProfilInfo from '@/components/PregledZakazanih/ProfilInfo'
import Schedules from '@/components/PregledZakazanih/Schedules'
import React from 'react'

const Page = () => {
  return (
    <div className='flex flex-col m-6'>
        <ProfilInfo />
        <Schedules />
    </div>
  )
}

export default Page