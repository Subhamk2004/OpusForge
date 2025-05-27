import logo from '@/assets/logo1.png'
import Image from 'next/image'
import Link from 'next/link'
import github from '@/assets/github1.png'

function LoginForm({ handleSubmit, data, setData, handleGithub }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <div className="flex flex-col justify-start items-center gap-2 lg:gap-3 mt-16 mb-10">
        <Image
          src={logo}
          alt="Logo"
          className="w-20 h-20 lg:w-24 lg:h-24 mb-2"
        />
        <span className="text-4xl font-semibold">
          Welcome back !
        </span>
      </div>
      <button
        className='flex max-w-lg flex-row items-center justify-center gap-5 border p-3 rounded-2xl bg-white hover:shadow-lg transition duration-300 ease-in-out w-full mb-5'
        onClick={handleGithub}
      >
        <Image
          src={github}
          className='w-8'
          alt='Github'
        />
        Sign in with Github
      </button>
      <form className="w-full max-w-lg flex flex-col items-center justify-center gap-4"
        onSubmit={handleSubmit}
      >
        <div className='relative w-full flex items-center justify-center'>
          <p className='text-sm bg-white z-10 px-3 text-texts'>
            or login with email
          </p>
          <hr className='absolute w-full z-0' />
        </div>

        <fieldset className="w-full border border-gray-200 rounded-xl p-1 hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 bg-gray-50/30 focus-within:bg-white">
          <legend className="px-2 text-sm font-medium text-gray-600 bg-white">Email Address</legend>
          <input
            type="email"
            value={data.email}
            required
            onChange={(e) => setData({ ...data, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full p-3 bg-transparent border-none outline-none placeholder:text-gray-400 text-gray-700"
          />
        </fieldset>

        <fieldset className="w-full border border-gray-200 rounded-xl p-1 hover:border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200 bg-gray-50/30 focus-within:bg-white">
          <legend className="px-2 text-sm font-medium text-gray-600 bg-white">Password</legend>
          <input
            type="password"
            value={data.password}
            required
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="Enter your password"
            className="w-full p-3 bg-transparent border-none outline-none placeholder:text-gray-400 text-gray-700"
          />
        </fieldset>

        <button className="bg-purple font-semibold hover:bg-hoverbg text-black p-2 rounded-lg w-full"
          onSubmit={handleSubmit}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm