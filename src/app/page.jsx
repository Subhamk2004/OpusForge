import Hero1 from "@/components/ui/Hero1";

export default function Home() {
  return (
    <div className="bg-s h-screen w-screen overflow-scroll text-black flex flex-col justify-center items-center">
      <div className="w-[98%] h-screen rounded-3xl bg-light  text-black p-4 flex flex-col items-center overflow-y-scroll">
        <div className="flex flex-col justify-start items-start gap-2 lg:gap-3 mt-16 lg:mb-10">
          <span className="text-5xl lg:text-7xl font-bold">
            Showcase your potential,
          </span>
          <div className="text-5xl lg:text-7xl font-bold">
            Build it with
            <span className="text-purple text-5xl lg:text-7xl font-bold ml-1">
              OpusForge
            </span>
          </div>

        </div>
        <Hero1 />
      </div>
    </div>
  );
}
