'use client'
import { Tillana } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import Calendar from './Calendar'
import { useAuth } from '@/context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Login from './Login'
import Loading from './Loading'

const tillana = Tillana({ 
  weight: ['600'],
  subsets: ['latin'] 
})

export default function Dashboard() {
  const {currentUser, userDataObj, setUserDataObj, loading} = useAuth()
  const [data, setData] = useState({})
  const now = new Date()

  function countValues(){
    let total_number_of_days = 0
    let sum_moods = 0

    for(let year in data){
      for (let month in data[year]){
        for (let day in data[year][month])
        {
          let days_mood = data[year][month][day]
          total_number_of_days ++
          sum_moods += days_mood
        }
      }
    }
    return {recorded_days: total_number_of_days, average_mood: parseFloat((sum_moods/total_number_of_days).toFixed(2)) }
  }

  async function handleSetMood(mood){
    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()

    try{

      const newData = {...userDataObj}

      //if year is empty
      if(!newData?.[year]){
        newData[year] = {}
      }
      //if year and month are empty
      if(!newData?.[year]?.[month]){
        newData[year][month] = {}
      }

      newData[year][month][day] = mood
      
      //update current state
      setData(newData)

      //update global state
      setUserDataObj(newData)

      //update firebase
      const docRef = doc(db, 'users', currentUser.uid)
      const res = await setDoc(docRef, {
        [year]: {
          [month]: {
            [day]: mood
          }
        }
      }, {merge: true})

    }catch(err){
      console.log('failed to update data: ' + err.message)
    }
    
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23-now.getHours()}h ${String(60-now.getMinutes()).padStart(2, '0')}m`,
  }

  const moods = {
    'okay' : '🙂',
    'meh' : '😒',
    'happy' : '😆',
    'sad' : '😢',
    'angry' : '🤬',
    'lovely' : '😍',
  }

  useEffect(() => {
    if(!currentUser || !userDataObj){
      return
    }
    setData(userDataObj)

  }, [currentUser, userDataObj])
  
  if(loading){
    return <Loading/>
  }

  if(!currentUser){
    return <Login/>
  }

  return (
    <div className='flex flex-col flex-1 gap-4 sm:gap-8 md:gap-12'>
      <div className='grid grid-cols-3 bg-slate-50 text-slate-600 rounded-lg p-4 gap-4'>
        {Object.keys(statuses).map((status, statusIndex) => {
          return(
            <div key={statusIndex} className='flex flex-col flex-1 gap-1 sm:gap-2'>
              <p className='font-medium capitalize text-xs sm:text-sm truncate'>{status.replaceAll('_',' ')}</p>
              <p className={'text-base sm:text-lg truncate ' + tillana.className}>{statuses[status]}{status === 'recorded_days' ? '🎈' : ''}</p>
            </div>
          )
        })}
      </div>

      <h4 className={'text-4xl sm:text-5xl md:text-6xl text-center ' + tillana.className} >
        How do you <span className='textGradient'>feel</span> today?
      </h4>

      <div className='grid grid-cols-3 sm:grid-cols-6 gap-4 '>
        {Object.keys(moods).map((mood, moodIndex) => {
          return(
            <button onClick={() => {
              const currentMoodValue = moodIndex + 1
              handleSetMood(currentMoodValue)
              
            }} className='p-4 rounded-lg purpleShadow duration-200 bg-slate-50 hover:bg-[lavender] text-center flex flex-col items-center gap-2' key={moodIndex}>
              <p className='text-3xl sm:text-4xl md:text-5xl'>{moods[mood]}</p>
              <p className={'capitalize text-slate-600 text-xs sm:text-sm md:text-base ' + tillana.className}>{mood}</p>
            </button>
          )
        })}
      </div>

      <Calendar completeData={data} moods={moods} handleSetMood={handleSetMood} />
      
    </div>
  )
}
