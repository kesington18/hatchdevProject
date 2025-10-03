"use client";
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password: string;
    confirmPassword?: string;
}

export const SignUp = () => {
    const router = useRouter();

    
    const { 
        register,
        handleSubmit, 
        watch,  
        formState: { errors }, 
        reset 
    } = useForm<RegisterData>()
    
    const onSubmit: SubmitHandler<RegisterData> = (data) => {
        console.log(data)

        const { confirmPassword, ...userData} = data;

        const existingUsers: RegisterData[] = JSON.parse(localStorage.getItem("register") || "[]");

        existingUsers.push(userData);

        localStorage.setItem("register", JSON.stringify(existingUsers));
        reset();

        router.push("/todo/signin");
    }

  return <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 border">
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your account</h2>

    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div>
                <label htmlFor="firstName" className="block text-lg/6 font-medium text-gray-900">First Name</label>
                <input type="text" placeholder='please enter your First Name' {
                    ...register("firstName", {
                        validate: (val) => {
                            if (!/^[a-zA-Z]{3,100}$/.test(val)) {
                                return "Boss, put in your first name!";
                            }
                        }
                    }) 

                } className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2"/>
                <p className="text-red-600">{errors.firstName?.message}</p>
            </div>

            <div>
                <label htmlFor="lastName" className="block text-lg/6 font-medium text-gray-900">Last Name</label>
                <input type="text" placeholder='please enter your Last Name' {
                    ...register("lastName", {
                        validate: (val) => {
                            if (!/^[a-zA-Z]{3,100}$/.test(val)) {
                                return "Boss, put in your last name!";
                            }
                        }
                    }) 

                } className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2"/>
                <p className="text-red-600">{errors.lastName?.message}</p>
            </div>

            <div>
                <label htmlFor="email" className="block text-lg/6 font-medium text-gray-900">Email</label>
                <input type="email" placeholder='please enter your email address' {
                    ...register("email", {
                        validate: (val) => {
                            if (!/^\S+@\S+\.\S+$/.test(val)) {
                                return "Boss, put in a real email!"; 
                            }
                        }
                    }) 

                } className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2"/>
                <p className="text-red-600">{errors.email?.message}</p>
            </div>

            <div>
                <label htmlFor="age" className="block text-lg/6 font-medium text-gray-900">Age</label>
                <input type="number" placeholder='please enter your age' {
                    ...register("age", {
                        validate: (val) => {
                            if (val < 16) {
                                return "Boss, you must be at least 16 years old!"; 
                            }
                        }
                    }) 
                } className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2"/>
                <p className="text-red-600">{errors.age?.message}</p>
            </div>

            <div>
                <label htmlFor="password" className="block text-lg/6 font-medium text-gray-900">Password</label>
                <input type="password" placeholder='please enter your password' {
                    ...register("password", {
                        required: "Password is required",
                        pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                        message:
                            "Password must be at least 8 chars, include uppercase, lowercase and a number",
                        }
                    }) 
                } className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>

                <p className="text-red-600">{errors.password?.message}</p>
            </div>

            <div>
                <label htmlFor="password" className="block text-lg/6 font-medium text-gray-900">Confirm Password</label>
                <input
                type="password"
                placeholder="please Confirm Password"
                {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                        val === watch("password") || "Passwords do not match",
                })}
                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                <p className="text-red-600">{errors.confirmPassword?.message}</p>
            </div>

            <button type='submit'>Submit</button>
        </form>
    </div>
  </div>
}

export default SignUp