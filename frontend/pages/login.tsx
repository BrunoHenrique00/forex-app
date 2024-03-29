import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useRef } from 'react'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import getTranslate from '../utils/translate'

const Login: NextPage = () => {
    const router = useRouter()
    const emailRef = useRef<HTMLInputElement>(null)
    const translate = getTranslate()

    async function handleLogin(e: FormEvent){
      e.preventDefault()
      try {
        const email = emailRef?.current?.value
        const response = await api.post('/user/login', {
          email
        })
        if(response.data.user._id){
          window.localStorage.setItem("userId" , response.data.user._id)
          router.push('/dashboard')
          return
        }
        toast.warn("User don't exists")
      } catch (error) {
        toast.warn("User don't exists")
      }
    }

    return (
    <div>
      <Head>
        <title>Forex App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{translate["Log in to your account"]}</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  {translate["Email address"]}
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  ref={emailRef}
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder={translate["Email address"]}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href='/'>
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    {translate["Not registered?"]}
                  </a>
                </Link>                
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {translate["Login in"]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
