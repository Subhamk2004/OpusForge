"use client"
import { useSelector } from "react-redux"
function page() {
    const user = useSelector((state) => state.user)
    return (
        <div className='w-screen h-screen text-4xl bg-light  text-black'>
            
        </div>
    )
}

export default page