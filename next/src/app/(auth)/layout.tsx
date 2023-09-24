import React from 'react'
import Image from 'next/image'
import background from '@/assets/images/M_background.webp'
import TuskaWorldLogo from './components/TuskaWorldLogo'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex overflow-y-hidden bg-[#1e1e1e] min-h-[970px] md:min-h-max ">
      <TuskaWorldLogo />
      <div className="flex flex-col ">
        <div className="h-[80px] bg-black border-b-2 border-[#B58529] md:hidden block"></div>
        <Image
          src={background}
          alt="background"
          width={500}
          height={500}
          style={{
            width: '100vw',
            height: '100%',
            minHeight: '100vh',
          }}
          priority={true}
          className="md:min-h-[560px] md:max-h-[950px]"
          suppressHydrationWarning
        />
      </div>
      <div className="flex w-full justify-center absolute left-0 md:relative align-center self-center md:mt-[150px]">
        <div className="flex backdrop-blur-sm bg-transparent/30 md:bg-transparent md:backdrop-blur-0 h-[80vh] min-h-[800px] md:h-auto rounded-md pt-[65px] md:pt-10 md:pb-0 min-w-[278px] fold:min-w-[380px] sm:min-w-[450px] pb-[80px] md:w-min justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}
