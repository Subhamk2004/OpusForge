"use client"
import { Calendar, GithubIcon, Mail, Verified, Workflow, X, ExternalLink, Briefcase, Link2 } from "lucide-react";
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
        <div className='w-screen h-screen bg-light text-black overflow-y-auto no-scrollbar'>
            {!emailVerified && (
                <div className={`${show} flex-col items-center justify-center p-3 rounded-2xl w-full max-w-[1300px] bg-errorbg relative mb-5`}>
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
            {
                user &&
                <div className="flex flex-col items-center justify-center w-full max-w-[1300px] mx-auto px-4 ">
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
                                {user?.name}
                            </span>
                            <Verified className={`inline w-6 h-6 lg:w-8 lg:h-8 text-primary ${emailVerified ? 'visible' : 'invisible'}`} />
                        </h1>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="bg-green-400 w-2 h-2 rounded-full"></div>
                            {
                                user?.updatedAt ?
                                    <div>
                                        <span>last updated: </span>
                                        <span className="text-gray-500">
                                            {new Date(user?.updatedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    :
                                    <div>
                                        <span>created: </span>
                                        <span className="text-gray-500">
                                            {new Date(user?.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                            }
                        </div>
                    </div>

                    {/* Overview Section */}
                    <div className="w-full mt-7">
                        <div className="flex items-center mb-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mr-3">
                                <Workflow className="w-5 h-5 text-primary" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">Overview</h2>
                        </div>
                        <div className="flex flex-row flex-wrap items-center justify-center lg:justify-around w-full p-4 py-8 bg-s shadow-inner rounded-2xl gap-3">
                            <div className="flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-2xl text-black shadow-md">
                                <h2 className="font-semibold flex items-center">
                                    <Calendar className="w-5 h-5 mr-1" />    User since:
                                    <span className="text-texts font-normal ml-2">
                                        {new Date(user?.createdAt).toDateString()}
                                    </span>
                                </h2>
                            </div>
                            <div className="email flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-2xl text-black shadow-md">
                                <h2 className="font-semibold flex items-center">
                                    <Mail className="w-5 h-5 mr-1" />
                                    Email:
                                    <span className="text-texts font-normal ml-2">
                                        {user?.email}
                                    </span>
                                </h2>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-2xl text-black shadow-md">
                                <h2 className="font-semibold flex items-center">
                                    <GithubIcon className="w-5 h-5 mr-1" />
                                    Github Username:
                                    <span className="text-texts font-normal ml-2">
                                        {user?.githubUsername || "Not provided"}
                                    </span>
                                </h2>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-2xl text-black shadow-md">
                                <h2 className="font-semibold flex items-center">
                                    <Briefcase className="w-5 h-5 mr-1" />
                                    Profession:
                                    <span className="text-texts font-normal ml-2">
                                        {user?.profession || "Not provided"}
                                    </span>
                                </h2>
                            </div>
                        </div>
                    </div>

                    {/* Links & Social Section */}
                    <div className="w-full mt-7 mb-32">
                        <div className="flex items-center mb-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mr-3">
                                <Link2 className="w-5 h-5 text-primary" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-800">Links & Social</h2>
                        </div>
                        <div className="w-full p-4 py-8 bg-s shadow-inner rounded-2xl">
                            <div className=" rounded-2xl  w-full">
                                {user?.links && user.links.length > 0 ? (
                                    <div className="flex flex-row flex-wrap items-center justify-center lg:justify-around w-full bg-s rounded-2xl gap-3">
                                        {user.links.map((link, index) => (
                                            <a
                                                key={index}
                                                href={link.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center p-4 bg-light
                                                shadow-md hover:bg-gray-50 rounded-2xl transition-all duration-200 hover:shadow-md border border-gray-100 hover:border-gray-200"
                                            >
                                                <div className="flex-shrink-0 mr-3">
                                                    <Image
                                                        src={link.image}
                                                        alt={link.name}
                                                        width={40}
                                                        height={40}
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                    />
                                                </div>
                                                <div className="flex-grow min-w-0">
                                                    <h3 className="font-medium text-gray-800 group-hover:text-primary transition-colors">
                                                        {link.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {link.link.replace(/^https?:\/\//, '')}
                                                    </p>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <Link2 className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-500 mb-2">No links added yet</p>
                                        <Link
                                            href="/user/profile/completeProfile"
                                            className="text-primary hover:underline text-sm font-medium"
                                        >
                                            Add your first link
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default page;