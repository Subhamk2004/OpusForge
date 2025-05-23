import hero1 from "@/assets/hero1.png";
import { ArrowUpRightFromCircle, LucideArrowUpRight, LucideArrowUpRightFromSquare } from "lucide-react";
import Image from "next/image";
import Github from "@/assets/github.png";
import pattern1 from "@/assets/pattern3.webp";
import Link from "next/link";

function Hero1() {
    return (
        <div className="w-full flex flex-row justify-around items-center mt-10">
            <div className="w-[35%] md:w-[40%] flex flex-col justify-around items-center lg:gap-3 bg-p p-6 lg:p-10 rounded-3xl border h-full relative overflow-hidden">
                <p className="text-lg z-10 lg:text-3xl font-semibold ">
                    Easily create a stunning portfolio website with OpusForge
                </p>
                <p className="z-10 text-sm lg:text-lg font-normal text-texts hidden lg:block">
                    OpusForge lets you build a portfolio website in minutes. It is a free and open-source platform that allows you to create a portfolio website with ease. You can customize your portfolio website with various templates and themes. OpusForge is built with Next.js, Tailwind CSS, and Framer Motion.
                </p>
                <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4 z-10">
                    <Link href="/login"
                        className="w-full z-10 flex-row justify-start items-center gap-5 mt-3 p-2 px-3 rounded-2xl bg-light border cursor-pointer hover:scale-110 transition-all duration-300 hidden lg:flex">
                        <LucideArrowUpRight className="w-9 h-9 text-black" />
                        <p className="text-black text-lg font-semibold ">
                            Get Started
                        </p>
                    </Link>
                    <Link
                        href="https://github.com/Subhamk2004/OpusForge" target="_blank"
                        className="w-full z-10 flex flex-row justify-start items-center gap-5 mt-3 p-2 px-3 rounded-2xl bg-black cursor-pointer hover:scale-110 transition-all duration-300">
                        <Image
                            src={Github}
                            alt="github"
                            className="w-9 h-9 "
                        />
                        <p className="text-white text-lg font-semibold ">
                            Star on Github
                        </p>
                    </Link>
                </div>
                <Image
                    src={pattern1}
                    alt="pattern"
                    className="z-0 h-full absolute rounded-3xl"
                />
            </div>
            <div className="w-[65%] md:w-[55%]">
                <Image
                    src={hero1}
                    alt="hero1"
                    className="w-full rounded-3xl"
                />
            </div>
        </div>
    )
}

export default Hero1