"use client";
import Image from "next/image";
import { useState } from "react";
import { HeaderBellButton } from "./BellButton";
import { HeaderMenuButton } from "./MenuButton";
import { HeaderLinkButton } from "./LinkButton";
import Link from "next/link";
import { Web3Button } from "@web3modal/react";
import ButtonYellow from "./buttons/button-yellow";

const Header = () => {
  const [bellCollapsed, setBellCollapsed] = useState(true);
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  // const router = useRouter();
  const navLinks = [
    {
      title: "Project Application",
      path: "/apply",
    },
    {
      title: "Project Signin",
      path: "/details",
    },
  ];

  return (
    <>
      <div className="fixed top-0 z-50 flex h-[64px] w-full flex-row items-center justify-between bg-[#1E1E1E] px-10 pl-[123px] navMedium:pl-[16px] navMobile:h-[64px] navMobile:pr-[15px]">
        <Link href="/">
          <div className="flex flex-wrap justify-between gap-3">
            <Image
              src="/images/logo.png"
              className=" my-auto "
              width={40}
              height={40}
              alt="nav-icon"
            />
            <img src="/logo.png" className="object-contain w-[40vw] xl:w-[10vw]" />
          </div>
        </Link>

        <div className="ml-auto hidden xl:block mr-5">
          <Link href="/login">
            <ButtonYellow
              text="Project Signin"
            />
          </Link>
        </div>
        <div className="hidden xl:block">
          <Web3Button icon="show" label="Connect Wallet" />
        </div>
        <div className="flex flex-row gap-[0px] pt-[0px]  text-[20px] text-header navPc:hidden">
          <HeaderBellButton
            menuCollapsed={bellCollapsed}
            callback={() => setBellCollapsed(!bellCollapsed)}
          />
          <HeaderMenuButton
            menuCollapsed={menuCollapsed}
            callback={() => setMenuCollapsed(!menuCollapsed)}
          />
        </div>
        {!menuCollapsed && (
          <div className="absolute right-0 top-14 z-20  w-full rounded-md bg-notification px-4 backdrop-blur-md md:w-[440px] md:px-0  navPc:hidden flex flex-col">
            {navLinks?.map(({ path, title }, idx) => (
              <div
                className={`flex justify-center${
                  idx > 0 ? " border-t-tsuka-400 border-t" : ""
                }`}
                key={idx}
              >
                <HeaderLinkButton
                  key={path}
                  path={path}
                  title={title}
                  active={path === "/"}
                />
              </div>
            ))}
            <div className="flex justify-center mb-2">
              <Web3Button icon="show" label="Connect Wallet"/>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
