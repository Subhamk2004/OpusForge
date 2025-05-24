import docs from "@/assets/docs.avif";
import docs1 from "@/assets/docs1.png";
import Image from "next/image";

function HeroCard2() {


    return (
        <div className="w-full max-w-6xl mx-auto px-4 mt-16">
            <div className="flex flex-col sm:flex-row items-center gap-12 lg:gap-16">

                <div className="flex-1 space-y-6 text-center ">
                    <div className="space-y-4">
                        <h2 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent leading-tight">
                            Easily access all your assets
                        </h2>

                        <p className="text-gray-600 text-left text-base lg:text-lg leading-relaxed max-w-md mx-auto">
                            Save your important assets like resumes, cover letters, and certificates in one place.
                            No more searching through folders or emails. Everything you need is just a click away.
                        </p>
                    </div>

                    <div className="pt-4">
                        <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>No more last time searching</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex justify-center">
                    <Image
                        src={docs1}
                        alt="docs1"
                        className="w-[400px] h-[400px] object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                </div>


            </div>
        </div>
    );
}

export default HeroCard2;