import Header from "@/components/Header";
import { SideBar } from "@/components/project-management/sidebar";
import { Web3Button } from "@web3modal/react";

export default async function Page() {
  return (
    <div className="bg-[#181818] min-h-screen">
      <SideBar />
      <div className="navPc:hidden"><Header/></div> 
        <div className="w-full navPc:pl-16 pl-0 font-open-sans">
            <div className="p-4">
                <div className="flex navPc:flex-row flex-col min-h-[80vh] gap-3">
                <div className="navPc:flex grow navPc:flex-row flex-col gap-6 rounded-[10px] bg-darkbg p-6 text-textlight">
                    <div className="mx-auto my-auto text-center flex flex-col gap-2">
                        <p className="text-[#FFCE31]">Apply to be listed on our platform:</p>
                        <div className="bg-[#755F42] max-w-full xl:max-w-[30vw] h-fit rounded-lg p-2">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <br/>
    </div>
  );
}
