import temp1 from "@/assets/temp1.png";
import temp2 from "@/assets/temp2.png";
import temp3 from "@/assets/temp3.png";
import temp4 from "@/assets/temp4.png";
import Image from "next/image";


function Hero2() {
    return (
        <div className="w-full flex flex-col items-center mt-10">
            <h2 className="text-3xl lg:text-5xl font-semibold text-center lg:mt-10">
                Explore a wide variety of templates
            </h2>
            <div className="w-full p-5 flex flex-row justify-around items-center gap-5 mt-10 overflow-x-scroll no-scrollbar border rounded-3xl shadow-inner">
                <Image
                    src={temp2}
                    alt="temp1"
                    className="w-[300px] lg:w-[450px] rounded-3xl border cursor-pointer hover:scale-105 transition-all duration-300"
                />
                <Image
                    src={temp3}
                    alt="temp2"
                    className="w-[300px] lg:w-[450px] rounded-3xl border cursor-pointer hover:scale-105 transition-all duration-300"
                />
                <Image
                    src={temp1}
                    alt="temp3"
                    className="w-[300px] lg:w-[450px] rounded-3xl border cursor-pointer hover:scale-105 transition-all duration-300"
                />
                <Image
                    src={temp4}
                    alt="temp4"
                    className="w-[300px] lg:w-[450px] rounded-3xl border cursor-pointer hover:scale-105 transition-all duration-300"
                />
            </div>
        </div>
    )
}

export default Hero2