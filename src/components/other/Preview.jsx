"use client"
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import processTemplateString from "@/helper/normalToBackticks";
import Portfolio from "@/components/other/Portfolio";

function page() {
    const templates = useSelector((state) => state.templates.templates);

    const userData = {
        username: "John Doe",
        profession: "Web Developer",
        image: "/profile.jpg",
        aboutPic: "/about.jpg",
        resumeLink: "/resume.pdf",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        email: "example@email.com"
    };
    let [show, setShow] = useState("flex");
    let [isLoaded, setIsLoaded] = useState(false);
    let [data, setData] = useState(userData);
    let [debouncedData, setDebouncedData] = useState(userData);

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebouncedData({ ...data, username: data.username });
        }, 1000);
        return () => clearTimeout(delayInputTimeoutId);
    }, [data, 1000]);

    useEffect(() => {
        if (templates !== undefined) {
            setIsLoaded(true);
        } else {
            setIsLoaded(false);
        }
    }, [templates]);

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

    return (
        <div className='w-screen overflow-hidden h-screen bg-light text-black'>

            <div className="flex flex-row items-center justify-between p-4 bg-primary text-white seperator w-full h-screen overflow-auto">
                <div className="w-1/2 lg:w-[35%] flex flex-col items-start gap-4 text-black overflow-hidden h-full p-2">
                    <input
                        type="text"
                        value={data.username}
                        onChange={(e) => setData({ ...data, username: e.target.value })}
                        className="border p-2 rounded w-full max-w-md mt-4"
                        placeholder="Type something here..."
                    />
                </div>
                <hr className="h-screen w-[1px] bg-error" />
                <div className="w-1/2 lg:w-[65%] flex h-screen gap-4 text-black overflow-scroll">
                    <Portfolio userData={debouncedData} templates={templates[0]} />
                </div>
            </div>
        </div>
    );
}

export default page;