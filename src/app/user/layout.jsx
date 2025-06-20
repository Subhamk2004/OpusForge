'use client';
import FeedbackButton from '@/components/ui/FeedbackButton';

export default function Layout({ children }) {
  return (
    <div className="bg-s h-screen w-screen overflow-scroll text-black flex flex-col justify-center items-center">
      <div className="w-[98%] h-screen rounded-3xl bg-light text-black p-6 flex flex-row overflow-scroll gap-10">
        {children}
      </div>
      <FeedbackButton />
    </div>
  );
}