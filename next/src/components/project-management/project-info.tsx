import { ProjectContentType } from "@/types/return.types";
import { Dispatch, SetStateAction, useState } from "react";
import CustomSelect from "./custom_select";
import InputLink from "./inputLink";
import PrimaryButton from "../PrimaryButton";
import { toast } from "react-toastify";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

export const InfoSection = ({projContent, setProjContent, isAudited, setIsAudited}: {projContent: ProjectContentType | null, setProjContent:Dispatch<SetStateAction<ProjectContentType | null>>, isAudited: boolean, setIsAudited: Dispatch<SetStateAction<boolean>>}) => {
  const [newPassword, setNewPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const supabase = createBrowserSupabaseClient();
  
  async function updatePassword() {
    if(newPassword != confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    console.log(supabase)
    const { data, error } = await supabase.auth.updateUser({password: newPassword})

    if(!error) {
      toast.success("Password updated")
    } else {
      toast.error("Error updating password: " + JSON.stringify(error))
    }
  }

  return (
    <div className="flex flex-col gap-2 px-3 py-5 text-white w-full">
      <p className="px-3">Site Link</p>
      <input className="h-[46px] w-full rounded-[10px] border-[1px] border-borderlight bg-[#2F271C] px-4 py-3 text-[#9B8355] outline-none placeholder:text-[#9B835548]" placeholder="www.dragon.com" value={projContent?.site_link} onChange={(e)=> {setProjContent(prevContent=>({...prevContent, site_link:e.target.value}))}}/>
      <div className="flex w-full flex-row gap-3">
        <p className="h-[46px] w-full rounded-[10px] border-2 border-[#9B8355] text-[#9B8355] px-4 py-2">
          Audit
        </p>   
        <CustomSelect select={isAudited??false} setSelect={(v)=>{setIsAudited(v)}}/>
      </div>

      <InputLink
        color="#2F271C"
        text={projContent?.youtube_link || ""}
        icon="youtube"
        setProjContent={setProjContent}
      />
      <InputLink
        color="#2F271C"
        text={projContent?.instagram_link || ""}
        icon="instagram"
        setProjContent={setProjContent}
      />
      <InputLink
        color="#2F271C"
        text={projContent?.telegram_link || ""}
        icon="telegram"
        setProjContent={setProjContent}
      />
      <InputLink
        color="#2F271C"
        text={projContent?.twitter_link || ""}
        icon="twitter"
        setProjContent={setProjContent}
      />
      <InputLink
        color="#2F271C"
        text={projContent?.discord_link || ""}
        icon="discord"
        setProjContent={setProjContent}
      />

      
      <p>Change Password</p>
      <input
        style={{borderColor: '#9B8355',borderWidth:'1px',borderLeftStyle:'none', color:'#9B8355'}}
        className="h-full w-full overflow-clip rounded-r-[5px] pl-[15px] py-1 outline-none bg-[#2F271C]"
        placeholder = {"New Password"}
        type="password"
        id="password-input"
        onChange={(e)=>{setNewPassword(e.target.value)}}
      />
      <input
        style={{borderColor: '#9B8355',borderWidth:'1px',borderLeftStyle:'none', color:'#9B8355'}}
        className="h-full w-full overflow-clip rounded-r-[5px] pl-[15px] py-1 outline-none bg-[#2F271C]"
        placeholder = {"Confirm Password"}
        type="password"
        id="password-confirm"
        onChange={(e)=>{setConfirmPassword(e.target.value)}}
      />
      <PrimaryButton 
        Btntitle="Update Password" 
        padding="py-2"
        textSize="text-[25px]"
        onClick={updatePassword}
      />
    </div>
  );
};
