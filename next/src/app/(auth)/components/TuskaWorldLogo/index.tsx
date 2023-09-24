import React from 'react'
import Image from 'next/image'
import M_icon from '@/assets/images/M_icon.webp'
import tuskaworld from '@/assets/images/T_tuskaworld.webp'

import './index.css'

const TuskaWorldLogo = () => {
  return (
    <div className="flex gap-x-5 absolute top-[18px] ms-3 sm:top-[10px] sm:ms-5 md:right-[5vw] md:top-16 items-center">
      <div className="w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px] relative">
        <Image
          src={M_icon}
          alt="logo"
          style={{ objectFit: 'contain' }}
          fill={true}
          priority={true}
          suppressHydrationWarning
        />
      </div>
      <div className="self-center">
        <div className="w-[200px] h-[35px] md:w-[250px] md:h-[45px] lg:w-[317px] lg:h-[58px] relative">
          <Image
            src={tuskaworld}
            alt="tuskaworld"
            style={{ objectFit: 'contain' }}
            fill={true}
            priority={true}
            suppressHydrationWarning
          />
        </div>
      </div>
    </div>
  )
}

export default TuskaWorldLogo
