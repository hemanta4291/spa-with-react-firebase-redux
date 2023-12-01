import React from 'react'
import { useDispatch } from 'react-redux'
import { signInWithGoogle } from '../features/auth/authSlice'
import { Link } from 'react-router-dom'



const SignIn = () => {
  const dispatch = useDispatch()
  const signInWithGoogle1 = () => {

    dispatch(signInWithGoogle())
  }


  return (
    <div className='sign-in pb-[40px] mb-[40px]'>
      <div className='container mx-auto flex justify-center items-center h-[calc(100vh-6rem)]'>
        <div className='border border-gray-100 p-8 mx-auto w-full h-[350px] max-w-[650px] text-center bg-white flex items-center justify-center'>
          <div>
            <h2 className='text-center text-3xl pb-6'>Login</h2>
            <button onClick={signInWithGoogle1} className='transition-all duration-1000 ease-out hover:bg-primary-25 bg-primary-600 px-4 py-3 text-white font-semibold rounded-md'>Sign in google</button>
            <Link className='block pt-4' to="/">Back to home</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignIn