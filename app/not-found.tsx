import Link from "next/link"


export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-600">Oops! The page you’re looking for doesn’t exist.</p>
      
      <button className="mt-6 text-white bg-black px-4 py-2 rounded hover:bg-gray-800 transition">
        <Link href="/">Go back home</Link>
      </button>
      </div>
    )
}