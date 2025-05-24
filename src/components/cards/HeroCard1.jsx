import github from "@/assets/github1.png";
import leetcode from "@/assets/leetcode.png";
import gfg from "@/assets/gfg.png";
import cf from "@/assets/cf.webp";
import Image from "next/image";

function HeroCard1() {
  const platforms = [
    { src: github, alt: "GitHub", name: "GitHub" },
    { src: leetcode, alt: "LeetCode", name: "LeetCode" },
    { src: gfg, alt: "GeeksforGeeks", name: "GFG" },
    { src: cf, alt: "Codeforces", name: "Codeforces" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-16">
      <div className="flex flex-col sm:flex-row items-center gap-12 lg:gap-16">
        
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl "></div>
            
            <div className="relative bg-s from-gray-50 to-white rounded-3xl p-8 ">
              <div className="grid grid-cols-2 gap-6">
                {platforms.map((platform, index) => (
                  <div 
                    key={platform.name}
                    className="group relative flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex flex-col items-center space-y-3">
                      <Image
                        src={platform.src}
                        alt={platform.alt}
                        className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                      <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-300 font-medium">
                        {platform.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6 text-center ">
          <div className="space-y-4">
            <h2 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent leading-tight">
              All Your Coding Profiles
              <span className="block text-xl lg:text-2xl font-normal text-gray-600 mt-2">
                in One Place
              </span>
            </h2>
            
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed max-w-md mx-auto">
              Showcase your competitive programming journey across multiple platforms. 
              Connect GitHub, LeetCode, Codeforces, and GeeksforGeeks seamlessly.
            </p>
          </div>

          <div className="pt-4">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Ready to connect your profiles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCard1;