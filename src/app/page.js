'use client'
import Image from "next/image";
import { signIn } from 'next-auth/react'
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-start p-10 min-h-screen gap-y-2">
      <h1>next-auth credentials</h1>
      <button className="bg-blue-500 text-white p-2 rounded-md">
        <Link href={'/signUp'}>Register</Link>
      </button>
      <button
       className="bg-blue-500 text-white p-2 rounded-md"
       onClick={() => signIn()}
      >
        Login
      </button>
    </div>
  );
}
