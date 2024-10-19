'use client'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-1 flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Oh no, something went wrong...</h1>
      <p className="text-accent-foreground">We can&apos;t find this page</p>
      <p className="text-accent-foreground">
        <Link href="/" className="text-blue-600 underline">
          Go back home
        </Link>
      </p>
    </div>
  )
}
