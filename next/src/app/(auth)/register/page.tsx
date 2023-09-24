'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/lib/supabase-provider'
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox'
import Image from 'next/image'
import Link from 'next/link'
import show from '@/assets/images/M_show.png'
import hide from '@/assets/images/M_hide.png'
import BarLoader from 'react-spinners/BarLoader'
import EmailConfirmationModal from '@/components/modal/email-confirm-modal';
import '../index.css'

const Register = () => {
  // const onClickRegister = async () => {
  //   if (!email || !password) return
  //   const { data, error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //   })
  //   if (error) return setErr(error.message)
  //   router.push('/login')
  // }

  const router = useRouter()
  const { supabase } = useSupabase() || {}

  const [loading, setLoading] = useState<boolean>(false)
  const [err, setErr] = useState<string>('')
  const [passwordType, setPasswordType] = useState<string>('password')
  const [confirmType, setConfirmType] = useState<string>('password')
  const [checked, setChecked] = useState<boolean>(false)
  const [emailComfirmationModalVisible, setEmailConfirmationModalVisible] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
      return
    }
    setPasswordType('password')
  }
  const toggleConfirm = () => {
    if (confirmType === 'password') {
      setConfirmType('text')
      return
    }
    setConfirmType('password')
  }

  const onSubmit = async (values: any) => {
    console.log(checked)
    if (!checked) {
      setErr('please check')
      return
    }
    const { email, password } = values
    setLoading(true)
    setErr('')
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    setLoading(false)
    if (error) return setErr(error.message)
    // router.push('/login')
    setEmailConfirmationModalVisible(true);
  }

  return (
    <div className='w-full relative'>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="project-sign-in-text text-[30px] md:text-[32px] lg:text-[42px]">
            Create An Account
          </h1>
          <input
            type="text"
            placeholder="Enter email"
            className="mt-[68px] p-[20px] h-[63px] w-[30vw] min-w-[250px] md:min-w-[300px] border-[#B58529] focus-within:border-blue-600 border-[2px] bg-transparent via-transparent  rounded-[10px] outline-none input-text"
            {...register('email', {
              required: 'Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
          />
          <span className="flex justify-end text-red-400 text-sm">
            {errors?.email?.message?.toString()}
          </span>

          <div className="flex mt-[39px]">
            <input
              type={passwordType}
              className="p-[20px] pr-[50px] bg-[#242425] h-[63px] w-[30vw] min-w-[250px] md:min-w-[300px] box-border outline-none border-[2px] rounded-[10px] border-[#242425] focus-within:border-blue-600 input-text"
              placeholder="Password"
              {...register('password', {
                required: 'Required',
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$/,
                  message: '6-20 characters, 1 number, 1 letter, 1 symbol.',
                },
              })}
            />

            <div
              className="mx-[-45px] cursor-pointer self-center"
              onClick={togglePassword}
            >
              {passwordType === 'password' ? (
                <Image src={hide} alt="hide" width={30} height={30} />
              ) : (
                <Image src={show} alt="show" width={30} height={30} />
              )}
            </div>
          </div>

          <span className="flex justify-end text-red-400 text-sm">
            {errors?.password?.message?.toString()}
          </span>

          <div className="flex mt-[39px]">
            <input
              type={confirmType}
              className="p-[20px] pr-[50px] bg-[#242425] h-[63px] w-[30vw] min-w-[250px] md:min-w-[300px] box-border outline-none border-[2px] rounded-[10px] border-[#242425] focus-within:border-blue-600 input-text"
              placeholder="Confirm Password"
              {...register('confirm', {
                required: 'Required',
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,50}$/,
                  message: '6-20 characters, 1 number, 1 letter, 1 symbol.',
                },
              })}
            />

            <div
              className="mx-[-45px] cursor-pointer self-center"
              onClick={toggleConfirm}
            >
              {confirmType === 'password' ? (
                <Image src={hide} alt="hide" width={30} height={30} />
              ) : (
                <Image src={show} alt="show" width={30} height={30} />
              )}
            </div>
          </div>

          <span className="flex justify-end text-red-400 text-sm">
            {errors?.confirm?.message?.toString()}
          </span>
          <span className="flex justify-end text-red-400 text-sm">{err}</span>
          <div className="flex items-center mt-[17px] md:justify-start justify-center">
            <Checkbox
              sx={{
                [`&, &.${checkboxClasses.checked}`]: {
                  color: '#B58529',
                },
              }}
              checked={checked}
              onChange={() => {
                console.log(checked)
                setChecked(!checked)
              }}
            />
            <p className="forgot-password-white w-[28vw] min-w-[200px]">
              By Register I agree that I&lsquo;m 18 years of age or older&nbsp;
              <span className="forgot-password cursor-pointer hover:text-blue-600">
                <Link href="/forgot">User Agreements</Link>
              </span>
            </p>
          </div>
          <button
            type="submit"
            className="flex flex-col w-[30vw] min-w-[250px] md:min-w-[300px] h-[62px] mt-[64px] bg-[#B58529] shadow-[0px_10px_0px_#654302] rounded-xl justify-center cursor-pointer"
          >
            <span className="self-center project-sign-in-btn">Register</span>
            <BarLoader
              className="mt-1 self-center"
              color="#1e1e1e"
              width="20vw"
              loading={loading}
            />
          </button>

          <div className="flex  flex-col xl:flex-row mt-[47px] items-center justify-center">
            <span className="forgot-password-white text-[16px]">
              Already have an account?&nbsp;
            </span>
            <span className="forgot-password cursor-pointer hover:text-blue-600 text-[16px]">
              <Link href="/login">Sign In</Link>
            </span>
          </div>
        </form>
      </div>
      <EmailConfirmationModal showEmailConfirmationModal={emailComfirmationModalVisible} setShowEmailConfirmationModal={setEmailConfirmationModalVisible} />
    
    </div>
  )
}

export default Register
