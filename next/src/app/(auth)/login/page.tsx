'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/lib/supabase-provider'
import Image from 'next/image'
import Link from 'next/link'
import show from '@/assets/images/M_show.png'
import hide from '@/assets/images/M_hide.png'
import BarLoader from 'react-spinners/BarLoader'
import EmailConfirmationResendModal from '@/components/modal/email-confirm-resend-modal'
import '../index.css'
import { toast } from 'react-toastify'

const Login = () => {
  const router = useRouter()
  const { supabase } = useSupabase() || {}

  const [loading, setLoading] = useState<boolean>(false)
  const [err, setErr] = useState<string>('')
  const [passwordType, setPasswordType] = useState<string>('password')
  const [showResendModal, setShowResendModal] = useState<boolean>(false);
  const [resendEmail, setResendEmail] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);

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

  const onSubmit = async (values: any) => {
    const { email, password } = values
    setLoading(true)
    setErr('')
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log("Data: " + data)
    console.log("Error: " + error)
    //console.log("response arrived: data and error", data, error);
    if(error) {
      toast.error("Invalid email or password")
    } 
    setLoading(false)
    if (error){
      if(error.message === "Email not confirmed"){
        // alert('Email not confirmed');
        setShowResendModal(true);
        setResendEmail(email);
        return setErr(error.message)
      }
      return setErr(error.message) 
    }
    router.push('/manage')
  }

  const onResend = async () => {
    setSending(true);
    if(resendEmail === ''){
      return;
    }
    const {error:resendError} = await supabase.auth.resend({
      type: 'signup',
      email: resendEmail
    });
    if(resendError){
      toast.error('Email resend failed');
      setSending(false)
      return;
    } else {
      toast.success("Email verification resent successfully");
      setSending(false);
      setResendEmail('');
      setShowResendModal(false);
    }
  }

  return (
    <div className="flex flex-col justify-center sm:justify-start">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="project-sign-in-text text-[36px] xl:text-[42px]">
          Project Sign In
        </h1>
        <input
          type="text"
          placeholder="Enter email"
          className="mt-[68px] p-[20px] h-[63px] w-[30vw] min-w-[250px] border-[#B58529] focus-within:border-blue-600 border-[2px] bg-transparent via-transparent  rounded-[10px] outline-none input-text"
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
            className="p-[20px] pr-[50px] bg-[#242425] h-[63px] w-[30vw] min-w-[250px] box-border outline-none border-[2px] rounded-[10px] border-[#242425] focus-within:border-blue-600 input-text"
            placeholder="Password"
            {...register('password', {
              required: 'Required'
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
        {/* <span className="flex justify-end text-red-400 text-sm">{err}</span> */}
        <span className="flex justify-end right-0 mt-[17px] forgot-password cursor-pointer hover:text-blue-600">
          <Link href="/forgot">Forgot Password?</Link>
        </span>

        <button
          type="submit"
          className="flex flex-col w-[30vw] min-w-[250px] h-[62px] mt-[64px] bg-[#B58529] shadow-[0px_10px_0px_#654302] rounded-xl justify-center cursor-pointer"
        >
          <span className="self-center project-sign-in-btn">
            Project Sign In
          </span>
          <BarLoader
            className="mt-1 self-center"
            color="#1e1e1e"
            width="20vw"
            loading={loading}
          />
        </button>

        <div className="flex  flex-col xl:flex-row mt-[47px] items-center justify-center">
          <span className="forgot-password-white lg:text-[16px] text-[12px]">
            If you don&lsquo;t have an account you can&nbsp;
          </span>
          <span className="forgot-password cursor-pointer hover:text-blue-600 lg:text-[16px] text-[12px]">
            <Link href="/register">Register Here!</Link>
          </span>
        </div>
      </form>
      <EmailConfirmationResendModal showEmailConfirmationResendModal={showResendModal} setShowEmailConfirmationResendModal={setShowResendModal} onConfirm={onResend} isSending={sending} />
    </div>
  )
}

export default Login
