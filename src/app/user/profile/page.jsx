"use client"
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

function page() {
    const { user } = useSelector((state) => state.user);
    let [show, setShow] = useState("flex");
    let [isLoaded, setIsLoaded] = useState(false);
    let [inp, setInp] = useState("");

    useEffect(() => {
        if (user !== undefined) {
            setIsLoaded(true);
            console.log("User data:", user);
            console.log("Email verified:", user?.emailVerified);
        }
    }, [user]);

    function processTemplateString(str, context) {
        return str.replace(/\$\{([^}]+)\}/g, (match, expression) => {
            try {
                return new Function(...Object.keys(context), `return ${expression}`)(...Object.values(context));
            } catch (e) {
                return match;
            }
        });
    }

    let strinDiv = "<div>Hello (${inp}) this is a string div</div>";
    let processed = processTemplateString(strinDiv, { inp })
    // console.log(processed);


    if (!isLoaded) {
        return (
            <div className='w-screen h-screen bg-light text-black flex items-center justify-center'>
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    const emailVerified = user?.emailVerified;

    return (
        <div className='w-screen h-screen bg-light text-black'>
            {!emailVerified && (
                <div className={`${show} flex-col items-center justify-center p-3 rounded-2xl w-full bg-errorbg relative`}>
                    <p className="text-xl font-semibold text-error">
                        Your profile is incomplete!
                    </p>
                    <p>
                        Please complete your profile
                        <Link
                            href="/user/profile/completeProfile"
                            className="font-semibold mx-1 underline"
                        >
                            here
                        </Link>
                        to access all features.
                    </p>
                    <button
                        className="absolute top-2 right-2"
                        onClick={() => setShow("hidden")}
                    >
                        <X className="w-6 p-1 rounded-full bg-error text-white" />
                    </button>
                </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: processed }} />
            <input
                type="text"
                value={inp}
                onChange={(e) => setInp(e.target.value)}
                className="border p-2 rounded w-full max-w-md mt-4"
                placeholder="Type something here..."
            />
        </div>
    );
}

export default page;