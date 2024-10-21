'use client'
import { Tillana } from 'next/font/google'
import React, {useState} from 'react'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'

const tillana = Tillana({ 
  weight: ['600'],
  subsets: ['latin'] 
})

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(true)
  const [authenticating, setAuthenticating] = useState(false)

  const {signup, login} = useAuth()

  async function handleSubmit(){
    if(!email || !password || password.length < 6) {
      return 
    }

    setAuthenticating(true)

    try{

      if(isRegister){
        console.log('Logging in existing user')
        await login(email, password)
      } else {
        console.log('Signing up a new user')
        await signup(email, password)
      }

    } catch (err) {
      console.log(err.message)
      alert('Invalid email or password.')

    } finally {
      setAuthenticating(false)
    }

  }

  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'text-2xl sm:text-4xl md:text-5xl ' + tillana.className}>{isRegister ? 'Log In' : 'Register'} </h3>
      <p>Get ready to track your daily mood!</p>

      <input value={email} onChange={(e) => {
        setEmail(e.target.value)
      }} className='max-w-[400px] w-full mx-auto px-4 py-2 sm:py-3 duration-200 hover:border-slate-600 focus:border-slate-600
      border border-solid border-slate-400 rounded-full outline-none' placeholder='Enter Email'/>

      <input value={password} onChange={(e) => {
        setPassword(e.target.value)
      }} type='password' className='max-w-[400px] w-full mx-auto px-4 py-2 sm:py-3 duration-200 hover:border-slate-600 focus:border-slate-600
      border border-solid border-slate-400 rounded-full outline-none' placeholder='Enter Password'/>

      <div className='max-w-[400px] w-full mx-auto'>
        <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting' : 'Submit'} full dark />
      </div>

      <p>{isRegister ? 'Don\'t have an account? ' : 'Already have an account? '}
        <button onClick={() => setIsRegister(!isRegister)} className='text-indigo-800'>{isRegister? 'Sign up' : 'Sign in'}</button>
      </p>
      
    </div>
  )
}
