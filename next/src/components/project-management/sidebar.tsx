"use client";

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const SideBar = () => {
    const router = useRouter()

    return(
        <div className="w-[64px] fixed left-0 top-0 min-h-full bg-black border-r-2 border-bordernormal navMobile:hidden">
            <Image onClick={()=>{router.push("/")}} src='/images/logo.png' width={40} height={40} alt='sidebar logo' className='mx-auto my-4 mb-20 cursor-pointer'/>
        </div>
    )
}