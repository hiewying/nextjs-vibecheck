import { Tillana } from 'next/font/google'
import React from 'react'
import Button from './Button'
import Calendar from './Calendar'
import Link from 'next/link'
import CallToAction from './CallToAction'

const tillana = Tillana({ 
  weight: ['600'],
  subsets: ['latin'] 
})

export default function Hero() {
  return (
    <div className='py-4 md:py-10 flex flex-col gap-8 sm:gap-10 '>
      <h1 className={'text-3xl sm:text-4xl md:text-5xl text-center ' + tillana.className }>
        <span className='textGradient'>VibeCheck</span> helps you track your 
        <span  className='textGradient'> daily</span> mood!
      </h1>

      <p className='text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]'>
        Are you <span className='font-semibold textGradientVibing'>vibing</span> or <span className='font-semibold textGradientSurviving'>surviving</span> today?
      </p>

      <CallToAction />
      
    </div>
  )
}
