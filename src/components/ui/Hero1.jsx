import hero1 from "@/assets/hero1.png";
import Image from "next/image";
import HeroCard from "../cards/HeroCard";

function Hero1() {
    return (
        <div className="w-full flex flex-col md:flex-row justify-around items-center no-scrollbar">
            <div className="w-full md:hidden mb-4">
                <Image
                    src={hero1}
                    alt="hero1"
                    className="w-full rounded-3xl"
                />
            </div>
            <HeroCard />
            <div className="w-full hidden md:block md:w-[55%]">
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