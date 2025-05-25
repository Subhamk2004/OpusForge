import Link from "next/link"

function page() {
  return (
    <div className='bg-light h-screen w-screen overflow-scroll text-black'>
      User dashboard page
      <Link 
      href="/user/profile"
      className="flex ">
      Profile
      </Link>
    </div>
  )
}

export default page