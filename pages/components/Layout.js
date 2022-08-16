import React from 'react'
import Link from 'next/link'

export default function Layout({children}) {
  return (
    <div>
        <nav className='border px-10 py-2 shadow-md fixed inset-x-0'>
          <Link href="/">
            <a className="mx-2 font-semibold">Home</a>
          </Link>
          <Link href="/upload">
            <a className="mx-2 font-semibold">Upload</a>
          </Link>
        </nav>
        <div className='flex h-screen'>
          <div className='m-auto'>{children}</div>
        </div>
    </div>
  )
}
