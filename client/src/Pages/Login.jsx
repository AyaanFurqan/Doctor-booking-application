import React, { useState } from 'react'
const loginpage = () => {
  const [state, setState] = useState('Signu')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onsubmit = async ()=>{
    
  }
  return (
    <div className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='font-semibold text-2xl'>{state == 'Signup'? "Create account" : "Login"}</p>
        <p>Please {state == 'Signup'? "Signup" : "Login"} to book an appointment </p>
        {state === 'Signup'?
        <div className='w-full'>
          <p>Full Name</p> 
          <input className='border border-zinc-300 rounded-full w-full p-2 mt-1' type="text" onChange={(e)=>{setName(e.target.value)}} value={name} required />
        </div>:""}
        <div className='w-full'>
          <p>Email</p> 
          <input className='border border-zinc-300 rounded-full w-full p-2 mt-1' type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} required />
        </div>
        <div className='w-full'>
          <p>Password</p> 
          <input className='border border-zinc-300 rounded-full w-full p-2 mt-1' type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state == 'Signup'? "Create Account" : "Login"}</button>
        {
          state === 'Signup'?
          <p>Already have an account? <span className='cursor-pointer text-primary underline' onClick={()=>{setState('login')}}>Login here</span></p>:
          <p>Dont have an account? <span className='cursor-pointer text-primary underline' onClick={()=>{setState('Signup')}}>Signup here</span></p>
        }
      </div>
    </div>
  )
}

export default loginpage
