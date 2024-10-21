import { Tillana } from 'next/font/google'
import React from 'react'

const tillana = Tillana({ 
    weight: ['600'],
    subsets: ['latin'] 
  })

export default function Button(props) {
    
    const {text, dark, full, clickHandler} = props

  return (
    <button onClick={clickHandler} className={'rounded-full overflow-hidden duration-200 hover:opacity-70 border-2 border-solid border-slate-700 ' +
     (dark ? ' text-white bg-slate-700 ' : ' text-slate-700 ') + 
     (full ? ' grid place-items-center w-full ' : ' ')}>
        <p className={'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ' + tillana.className }>{text}</p>
    </button>
  )
}
