import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Login = () => {

  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.email) {
      router.push("/")
      console.log("Session ", session)
    }
  }, [session])

  return (
    <div className="flex justify-center items-center mt-[50%]">
      <button className='bg-[#46474a] p-2 rounded-xl px-3 text-white' onClick={() => signIn()}>
        Google Login
      </button>
    </div>
  )
}

export default Login