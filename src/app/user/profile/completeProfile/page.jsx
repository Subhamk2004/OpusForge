"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SignupForm from "@/components/forms/SignupForm";
import { useSelector } from "react-redux";
import { useState } from "react";

function page() {
    const { user } = useSelector((state) => state.user);
    let [userData, setUserData] = useState(user);
    let handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("Form submitted with data:", userData);
    }
    return (
        <div className="w-screen h-screen bg-light text-black flex flex-col items-center relative">
            <Link href="/user/profile" className="absolute top-0 left-0">
                <ArrowLeft className="w-6 h-6 text-gray-600 cursor-pointer hover:-translate-x-1 transition-all" />
            </Link>
            <h1 className="text-2xl font-bold text-center mt-10">Complete Your Profile</h1>
            <SignupForm
                handleSubmit={handleSubmit}
                data={userData}
                setData={setUserData}
            />
        </div>
    )
}

export default page