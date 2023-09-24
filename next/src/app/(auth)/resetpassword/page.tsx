"use client";

import React, { useState } from "react";

import { useSupabase } from "@/lib/supabase-provider";

const ResetPassword = () => {
  const [err, setErr] = useState("");
  const [email, setEmail] = useState("");

  const { supabase } = useSupabase() || {};

  const onClickReset = async () => {
    if (!email) return;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) return setErr(error.message);
    if (data) {
      // eslint-disable-next-line no-console
      console.log(data);
    }
    // if (error) return setErr(error.message);
    //router.push("/home");
  };

  return (
    <div className="relative flex h-full w-full justify-stretch bg-main">
      <div className="backdrop: flex-start absolute right-20 top-12 z-50 flex items-center formMobile:right-10">
        <img
          className="mr-4 h-14 w-14 formFinal:h-8 formFinal:w-8"
          src="/images/logo.png"
          alt=""
        />
        <img className="h-6 formFinal:h-4" src="/images/title.png" alt="" />
      </div>
      <img
        className="h-[100vh] w-[50vw] object-cover anFormMiddle:w-[100vw]"
        src="/images/back.png"
        alt=""
      />
      <div className="h-full bg-main"></div>
      <div className="absolute top-[calc(50%-240px)] z-30 mx-auto my-auto flex h-[480px] w-[600px] flex-col gap-12 rounded-md p-8 formMiddle:right-[250px] anFormMiddle:right-[calc(50%-300px)] anFormMiddle:bg-back formMobile:right-6  formMobile:w-[calc(100%-48px)] formFinal:top-[calc(50%-300px)] formFinal:h-[600px]">
        <img
          className="mb-4 mt-8 !h-[50px] max-w-[400px] object-contain"
          src="/images/Password Recovery.png"
          alt=""
        />
        <h4 className="text-lg text-white">
          Enter your email to recover your password.
        </h4>
        <input
          className="!focus:border-0 rounded-md bg-[#242425] p-4 text-lg text-white outline-none placeholder:text-white"
          style={{ border: "none" }}
          placeholder="Enter Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <button
          className="rounded-md bg-button p-4 shadow-buttonShadow"
          onClick={onClickReset}
        >
          <img className="mx-auto" src="/images/Reset Password.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
