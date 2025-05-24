import bg1 from "@/assets/bg6.png";
import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
export default function Home() {
  return (
    <div className="bg-s h-screen w-screen overflow-scroll text-black flex flex-col justify-center items-center">
      <div className="w-[98%] h-screen rounded-3xl bg-light  text-black p-6 flex flex-row  gap-10">
        <div className="w-[40%] lg:w-[50%] h-[90%] border rounded-3xl relative">
          <Image
            src={bg1}
            alt="Background"
            className="w-full absolute h-full object-cover rounded-3xl"
          />
          {/* <video
            autoPlay
            loop
            muted
            className="w-full absolute h-full object-cover rounded-3xl"
          >
            <source src="/bg1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
        </div>
        <div className="flex w-[60%] lg:w-[50%] flex-col justify-start items-start gap-2 lg:gap-3  lg:mb-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
