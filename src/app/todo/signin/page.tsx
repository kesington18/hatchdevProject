"use client";
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { RegisterData } from '../signUp';

interface LoginData {
  email: string,
  password: string,
}

const LogIn = () => {
  const router = useRouter()
    const { 
        register,
        handleSubmit, 
        formState: { errors }, 
        reset 
    } = useForm<LoginData>();

    const [loginError, setLoginError] = useState("")

    
    const onSubmit: SubmitHandler<LoginData> = (data) => {
      const getDataFromLs: RegisterData[] = JSON.parse(localStorage.getItem("register") || "[]");

      const user = getDataFromLs.find((user) => user.email === data.email && user.password === data.password)

      if (user) {
        setLoginError("")
        console.log("login successful")
        router.push("/todo/todoList")
      } else {
        setLoginError("invalid email or password")
        console.log("invalid email or password")
      }
    }

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" placeholder='please enter your email address' {
                  ...register("email", {
                      required: "email is required"
                  }) 

              }/>
              <p className="text-red-600">{errors.email?.message}</p>
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='please enter your password' {
                    ...register("password", {
                        required: "Password is required"
                    }) 
                }/>

                <p className="text-red-600">{errors.password?.message}</p>
            </div>

            {loginError && <p className='text-red-600'>{loginError}</p>}

            <button type='submit'>Login</button>
        </form>
      
    </div>
  )
}

export default LogIn