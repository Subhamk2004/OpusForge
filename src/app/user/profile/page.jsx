"use client"
import { Mail, Newspaper } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import profileBg from "@/assets/profileBg9.jpg";
import Image from "next/image";
import useNotifications from "@/hooks/useNotifications";
import NotificationsSection from "@/components/notification/NotificationsSection";

function page() {
    const { user } = useSelector((state) => state.user);
    let [isLoaded, setIsLoaded] = useState(false);
    let { notifications, loading, markAsRead } = useNotifications();


    useEffect(() => {
        if (user !== undefined) {
            setIsLoaded(true);
        }
    }, [user]);

    // console.log(user);

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
    // console.log(notifications);
    

    const emailVerified = user?.emailVerified;

    return (
        <div className='w-screen h-screen bg-light text-black overflow-y-auto no-scrollbar flex flex-col items-center justify-start pb-[200px]'>
            {/* {!emailVerified && (
                <div className={`${show} flex-col items-center justify-center p-3 rounded-2xl w-full text-sm md:text-base max-w-[1300px] bg-errorbg relative mb-5`}>
                    <p className="text-base md:text-xl font-semibold text-error">
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
            )} */}
            {
                user &&
                <div className="flex flex-col items-center justify-center w-full max-w-[1300px] mx-auto mt-5 px-4">
                    <div className="profileBg flex flex-row justify-end rounded-2xl w-full bg-[#fafafa] h-64 lg:h-[320px] relative">
                        <Image
                            src={profileBg}
                            alt="Profile Background"
                            className="w-full h-64 lg:h-[320px] object-cover rounded-2xl"
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

                    <div className="ml-2 flex flex-col w-full mt-14 lg:mt-24 gap-1">
                        <h1 className="flex items-center">
                            <span className="text-2xl lg:text-4xl font-semibold text-primary mr-1">
                                {user?.githubUsername}
                            </span>
                        </h1>

                        <div className="flex items-center gap-2 text-sm">
                            <h2 className="font-semibold flex items-center">
                                <div className="p-1 bg-green-500 mr-2 rounded-full"></div>  User since:
                                <span className="text-texts font-normal ml-2">
                                    {new Date(user?.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long'
                                    })}
                                </span>
                            </h2>
                        </div>

                        <div className="contact-button w-auto mt-3 flex items-center gap-2">
                            <Link href="/contact" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                                <Mail className="w-5 h-5" />
                                Contact Support
                            </Link>
                        </div>
                    </div>

                    {/* Overview Section */}
                    <div className="w-full mt-7">
                        <div className="flex items-center mb-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mr-1">
                                <Newspaper className="w-5 h-5 text-primary" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">Updates</h2>
                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-center lg:justify-around w-full p-4 py-8 bg-s shadow-inner rounded-2xl gap-3">
                            <NotificationsSection
                                notifications={notifications}
                                markAsRead={markAsRead}
                                loading={loading}
                            />
                        </div>
                    </div>

                </div>
            }
        </div>
    );
}

export default page;