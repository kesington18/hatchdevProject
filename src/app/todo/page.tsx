import { SignUp } from "./signUp";

// import Info from "@/app/target/info"
export default function Home() {
  return (
    
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-2xl md:text-6xl font-bold">Welcome to the only hitlist you will ever need</h1>


       {/* <Info /> */}
       <SignUp />
      </main>
  );
}
