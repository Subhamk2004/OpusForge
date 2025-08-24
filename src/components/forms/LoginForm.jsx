import { useState } from 'react'
import logo from '@/assets/logo1.png'
import Image from 'next/image'
import Link from 'next/link'
import github from '@/assets/github1.png'
import Testimonials from '../other/Testimonials'

function LoginForm({ handleGithub }) {
  const [ageVerified, setAgeVerified] = useState(false)

  const handleSignIn = () => {
    if (!ageVerified) {
      alert('Please confirm that you are 13 years or older, or have parental consent to use OpusForge.')
      return
    }
    handleGithub()
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start overflow-scroll pb-12">
      <div className="flex flex-col justify-start items-center gap-2 lg:gap-3 mt-4 mb-10 lg:mb-5">
        <Image
          src={logo}
          alt="Logo"
          className="w-20 h-20 lg:w-20 lg:h-20 mb-2"
        />
        <span className="text-3xl font-semibold">
          Welcome to OpusForge
        </span>
      </div>



      <button
        className={`flex max-w-lg flex-row items-center justify-center gap-5 border p-3 rounded-2xl transition duration-300 ease-in-out w-full mb-5 ${ageVerified
            ? 'bg-white hover:shadow-lg cursor-pointer'
            : 'bg-inputbg text-texts cursor-not-allowed opacity-60'
          }`}
        onClick={handleSignIn}
        disabled={!ageVerified}
      >
        <Image
          src={github}
          className='w-8'
          alt='Github'
        />
        Sign in with Github
      </button>
      {/* Age Verification Checkbox */}
      <div className="flex items-start gap-3 mb-6 max-w-lg w-full">
        <input
          type="checkbox"
          id="ageVerification"
          checked={ageVerified}
          onChange={(e) => setAgeVerified(e.target.checked)}
          className="mt-1 w-4 h-4 text-textPurple border-border-light rounded focus:ring-textPurple focus:ring-2"
        />
        <label htmlFor="ageVerification" className="text-sm text-texts">
          I confirm that I am 13 years of age or older, or I have parental consent to use OpusForge.
        </label>
      </div>

      <p className='text-sm lg:text-base text-center max-w-lg'>
        By signing in, you agree to our{' '}
        <Link href='/terms' className='text-blue-500 hover:underline'>
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href='/privacy' className='text-blue-500 hover:underline'>
          Privacy Policy
        </Link>
        .
      </p>

      <Testimonials whichPage={"signin"} />
    </div>
  )
}

export default LoginForm