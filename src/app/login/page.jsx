"use client";
import React, { useState } from "react";
import bg1 from "@/assets/bg6.png";
import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
import { signIn } from "next-auth/react"


export default function Home() {

  let initialUserData = {
    email: "",
    password: "",
  };

  let [userData, setUserData] = useState(initialUserData);

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", userData);
  }

  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl: '/user' });
  };

  return (
    <div className="bg-s h-screen w-screen overflow-scroll text-black flex flex-col justify-center items-center">
      <div className="w-[98%] h-screen rounded-3xl bg-light  text-black p-6 flex flex-row  gap-10">
        <div className="w-[40%] lg:w-[50%] h-[90%] border rounded-3xl relative">
          <Image
            src={bg1}
            alt="Background"
            className="w-full absolute h-full object-cover rounded-3xl"
          />
        </div>
        <div className="flex w-[60%] lg:w-[50%] flex-col justify-start items-start gap-2 lg:gap-3  lg:mb-10">
          <LoginForm
            handleSubmit={handleSubmit}
            data={userData}
            setData={setUserData}
            handleGithub={handleGitHubSignIn}
          />
        </div>
      </div>
    </div>
  );
}
