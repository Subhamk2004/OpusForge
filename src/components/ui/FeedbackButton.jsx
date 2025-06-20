'use client';
import { useState } from 'react';
import FeedbackModal from "@/components/forms/FeedbackModal";
import { MessageCircleMoreIcon } from 'lucide-react';

export default function FeedbackButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex flex-row items-center justify-center bg-purple p-3 lg:p-5 rounded-full shadow-xl absolute bottom-8 right-6 gap-2
        hover:scale-105 active:scale-95 group transition-all "
            >
                <MessageCircleMoreIcon />
            </button>

            <FeedbackModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}