import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from 'react';

interface registerData {
    firstName: string,
    lastName: string,
    email: string,
    age: number
    password: string,
}

export const SignUp = () => {

    const onSubmit: SubmitHandler<registerData> = data => {
        console.log(data)
        reset()
        localStorage.setItem('regsiter', JSON.stringify(data))
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<registerData>()
    
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
            </div>

            <div>
                <label htmlFor="email">First Name</label>
                <input type="email" placeholder='please enter your email address' {
                    ...register("email", {
                        validate: (val) => {
                            if (!/^[a-zA-Z]{3,100}$/.test(val)) {
                                return "Boss, put in a real name!";
                            }
                        }
                    }) 

                }/>
            </div>
        </form>
    </div>
  </div>
}

export default SignUp