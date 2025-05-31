import Link from "next/link"

function Page() {
  return (
    <div>
      <Link href="/user/templates/addTemplate">
        Add Template
      </Link>
      <br />
      <Link href="/user/templates/viewTemplate">
        View Templates
      </Link>
    </div>
  )
}

export default Page