"use client";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import github from '@/assets/github.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-s h-screen w-screen overflow-scroll text-black flex flex-col justify-center items-center">
      <div className="w-[98%] h-screen rounded-3xl bg-light p-4 text-black flex flex-col items-center  gap-10">
        <h1 className='text-2xl font-semibold text-center mt-10'>
          This Feature is currently unavailable!
          <br />
          <span className='text-purple text-xl'>
            For now please use github login
          </span>
        </h1>
        <Link
        href="/login"
          className='flex max-w-md flex-row items-center justify-center gap-5 border p-3 rounded-2xl bg-black hover:shadow-lg transition duration-300 ease-in-out w-full mb-5 text-white '
        >
          <Image
            src={github}
            className='w-8'
            alt='Github'
          />
          Sign in with Github
        </Link>

        <div className="w-full h-full flex items-center justify-center -mt-10">
          <DotLottieReact
            src="/SignupStranded.lottie"
            loop
            autoplay
            className="w-full h-full max-w-[750px] max-h-[750px] min-w-[200px] min-h-[200px]"
          />
        </div>
      </div>
    </div>
  );
}