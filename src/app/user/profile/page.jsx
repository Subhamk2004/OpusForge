"use client"
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux"
function page() {
    const user = useSelector((state) => state.user)
    let emailVerified = user.emailVerified;
    let [show, setShow] = useState("flex");

    return (
        <div className='w-screen h-screen bg-light  text-black'>
            {
                !emailVerified &&
                <div className={`${show} flex-col items-center justify-center p-3 rounded-2xl w-full bg-errorbg relative`}>
                    <p className="text-xl font-semibold text-error">
                        Your porfile is incomplete!
                    </p>
                    <p>
                        please complete your profile
                        <Link href="/user/profile/completeProfile"
                            className="font-semibold mx-1 underline"
                        >
                            here </Link>
                        to access all features.
                    </p>
                    <button className="absolute top-2 right-2"
                        onClick={() => setShow("hidden")}
                    >
                        <X className="w-6 p-1 rounded-full bg-error text-white" />
                    </button>
                </div>
            }
        </div >
    )
}

export default page