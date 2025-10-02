"use client";
import Image from "next/image";
import Link  from "next/link";
// import { useRouter }  from "next/navigation";

export default function Home() {
  return (
    
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl md:text-6xl font-bold">Welcome to the only hitlist you will ever need</h1>

        <p className="text-2xl">sponsored by john wick</p>

        <Link href="/todo" className="px-6 py-2 text-2xl bg-white text-black hover:bg-gray-600 hover:text-white hover:cursor-pointer transition-all duration-300 active:scale-95 font-semibold rounded-2xl">Submit your target</Link>
       
      </main>
  );
}
