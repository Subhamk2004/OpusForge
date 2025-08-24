import Github from "@/assets/logo1.png";
import pattern1 from "@/assets/pattern3.webp";
import Link from "next/link";
import { LucideArrowUpRight } from "lucide-react";
import Image from "next/image";

function HeroCard() {
    return (
        <div className="w-full md:w-[40%] flex flex-col justify-around items-center lg:gap-3 bg-p p-6 lg:p-10 rounded-3xl border h-full relative overflow-hidden">
            <p className="text-lg z-10 lg:text-3xl font-semibold ">
                Easily create a stunning portfolio website with OpusForge
            </p>
            <p className="z-10 text-sm lg:text-lg font-normal text-texts hidden lg:block">
               OpusForge is a no-code portfolio builder that lets you create and update professional portfolio websites in minutes. It provides live previews, Auto-fill with resume, GitHub integration, one-click deployment, mobile-responsive design, centralized asset management, and automatic updates — all designed to make building and maintaining your portfolio fast and easy.
            </p>
            <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4 z-10">
                <Link href="/signin"
                    className="w-full z-10 flex-row justify-start items-center gap-5 mt-3 p-2 px-3 rounded-2xl bg-light border cursor-pointer hover:scale-110 transition-all duration-300 hidden lg:flex">
                    <LucideArrowUpRight className="w-9 h-9 text-black" />
                    <p className="text-black text-lg font-semibold ">
                        Get Started
                    </p>
                </Link>
                <Link
                    href="/demo" 
                    className="w-full z-10 flex flex-row justify-start items-center gap-5 mt-3 p-2 px-3 rounded-2xl bg-black cursor-pointer hover:scale-110 transition-all duration-300">
                    <Image
                        src={Github}
                        alt="demo"
                        className="w-7 h-7 md:w-9 md:h-9 "
                    />
                    <p className="text-white md:text-lg font-semibold ">
                        View Demo
                    </p>
                </Link>
            </div>
            <Image
                src={pattern1}
                alt="pattern"
                className="z-0 h-full absolute rounded-3xl"
            />
        </div>
    )
}

export default HeroCard