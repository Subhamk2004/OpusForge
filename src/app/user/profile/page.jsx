"use client"
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import profileBg from "@/assets/profileBg9.jpg";
import Image from "next/image";

function page() {
    const { user } = useSelector((state) => state.user);
    let [show, setShow] = useState("flex");
    let [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (user !== undefined) {
            setIsLoaded(true);
        }
    }, [user]);
    console.log(user);
    

    if (!isLoaded) {
        return (
            <div className='w-screen h-screen bg-light text-black flex items-center justify-center'>
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    const emailVerified = user?.emailVerified;

    return (
        <div className='w-screen h-screen bg-light text-black'>
            {!emailVerified && (
                <div className={`${show} flex-col items-center justify-center p-3 rounded-2xl w-full bg-errorbg relative mb-5`}>
                    <p className="text-xl font-semibold text-error">
                        Your profile is incomplete!
                    </p>
                    <p>
                        Please complete your profile
                        <Link
                            href="/user/profile/completeProfile"
                            className="font-semibold mx-1 underline"
                        >
                            here
                        </Link>
                        to access all features.
                    </p>
                    <button
                        className="absolute top-2 right-2"
                        onClick={() => setShow("hidden")}
                    >
                        <X className="w-6 p-1 rounded-full bg-error text-white" />
                    </button>
                </div>
            )}

            <div className="flex flex-col items-center justify-center w-full">
                <div className="profileBg flex flex-row justify-end rounded-2xl w-full bg-[#fafafa] h-64 lg:h-[320px] relative">
                    <Image
                        src={profileBg}
                        alt="Profile Background"
                        className="w-full  h-64 lg:h-[320px] object-cover rounded-2xl"
                        width={1920}
                        height={1080}
                    />
                    <Image
                        src={user?.image || "/defaultProfilePic.png"}
                        alt="Profile Picture"
                        className="w-28 h-28 lg:w-44 lg:h-44 rounded-full border-8 border-white -bottom-10 lg:-bottom-20 left-8 lg:left-10 object-cover absolute"
                        width={128}
                        height={128}
                    />
                </div>
            </div>
        </div>
    );
}

export default page;