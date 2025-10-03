"use client";
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router';
// import { useEffect } from 'react';

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
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
    
    const onSubmit: SubmitHandler<RegisterData> = data => {
        console.log(data)
        localStorage.setItem('regsiter', JSON.stringify(data))
        reset()
        router.push("/signIn")
    }

  return <div className=''>
    <h2>Registration form</h2>

    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" placeholder='please enter your First Name' {
                    ...register("firstName", {
                        validate: (val) => {
                            if (!/^[a-zA-Z]{3,100}$/.test(val)) {
                                return "Boss, put in your first name!";
                            }
                        }
                    }) 

                }/>
                <p className="text-red-600">{errors.firstName?.message}</p>
            </div>

            <div>
                <label htmlFor="lastName">First Name</label>
                <input type="text" placeholder='please enter your Last Name' {
                    ...register("lastName", {
                        validate: (val) => {
                            if (!/^[a-zA-Z]{3,100}$/.test(val)) {
                                return "Boss, put in your last name!";
                            }
                        }
                    }) 

                }/>
                <p className="text-red-600">{errors.lastName?.message}</p>
            </div>

            <div>
                <label htmlFor="email">First Name</label>
                <input type="email" placeholder='please enter your email address' {
                    ...register("email", {
                        validate: (val) => {
                            if (!/^\S+@\S+\.\S+$/.test(val)) {
                                return "Boss, put in a real email!"; 
                            }
                        }
                    }) 

                }/>
                <p className="text-red-600">{errors.email?.message}</p>
            </div>

            <div>
                <label htmlFor="age">First Name</label>
                <input type="number" placeholder='please enter your age' {
                    ...register("age", {
                        validate: (val) => {
                            if (val < 16) {
                                return "Boss, you must be at least 16 years old!"; 
                            }
                        }
                    }) 
                }/>
                <p className="text-red-600">{errors.age?.message}</p>
            </div>

            <div>
                <label htmlFor="password">First Name</label>
                <input type="password" placeholder='please enter your password' {
                    ...register("password", {
                        required: "Password is required",
                        pattern: {
                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
                        message:
                            "Password must be at least 8 chars, include uppercase, lowercase and a number",
                        }
                    }) 
                }/>

                <p className="text-red-600">{errors.password?.message}</p>
            </div>

            <div>
                <label htmlFor="password">First Name</label>
                <input
                type="password"
                placeholder="please Confirm Password"
                {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                        val === watch("password") || "Passwords do not match",
                })}
                />
                <p className="text-red-600">{errors.confirmPassword?.message}</p>
            </div>

            <button type='submit'>Submit</button>
        </form>
    </div>
  </div>
}

export default SignUp