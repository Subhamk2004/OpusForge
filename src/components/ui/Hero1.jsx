import hero1 from "@/assets/hero1.png";
import Image from "next/image";
import HeroCard from "../cards/HeroCard";

function Hero1() {
    return (
        <div className="w-full flex flex-row justify-around items-center no-scrollbar">
            <HeroCard />
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