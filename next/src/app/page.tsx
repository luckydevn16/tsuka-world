import Image from "next/image";

import Carousel from "@/components/HeroCarousel";
import PrimaryButton from "@/components/PrimaryButton";

import getAllProjectsData from "@/actions/getAllProjectData";
import getFeaturedProjects from "@/actions/getFeaturedProjects";

import Header from "../components/Header";
import LiquidityProviderTable from "../components/LiqudiityProviderTable";
import Table from "../components/TableComponent";
import getLiquidityProviders from "@/actions/getLiquidityProviders";
import Link from "next/link";
import ButtonYellow from "@/components/buttons/button-yellow";

export default async function Home() {
  const FeaturedProjects = await getFeaturedProjects();
  const ProjectsData = await getAllProjectsData();
  const liquidityProviders = await getLiquidityProviders();
  console.log(liquidityProviders);

  const tableHeaders = [
    { name: "name", viewName: "Name", type: "name" },
    { name: "marketCap", viewName: "Market Cap", type: "currency" },
    { name: "price", viewName: "Price", type: "currency" },
    { name: "category", viewName: "Category", type: "normal" },
    { name: "pricecha", viewName: "24hr % change", type: "price2" },
    { name: "rating", viewName: "Rating", type: "rating" },
    { name: "holders", viewName: "Holders", type: "normal" },
  ];

  const tableHeaders_providers = [
    { name: "rank", viewName: "Rank", type: "normal" },
    { name: "wallet_address", viewName: "Wallet Address", type: "normal" },
    { name: "amount_sent", viewName: "Amount sent", type: "normal" },
  ];

  return (
    <div className="pt-[64px]">
      <Header />
      <section className="flex flex-wrap bg-[url('/Landing.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute right-[302px] top-[87px] w-full mobile:hidden">
          <div className="h-[423px] w-[423px] bg-[#9A7837] blur-[159px]" />
        </div>
        <div className="mx-auto flex flex-col-reverse items-center justify-center lg:flex-row lg:justify-between 2xl:pb-[100px]">
          <div className="mx-auto my-10 flex w-full max-w-fit flex-col pt-2 text-center sm:pt-16 md:pt-24 lg:mx-[unset] lg:text-left xl:my-0 2xl:pt-[160px]">
            {/*
            <h1 className="text-center font-RussoOne text-xl font-normal leading-[20px] text-textyellow lg:text-left lg:text-[50px] lg:leading-[60px]">
              TSUKA WORLD
            </h1>
            */}

            <p className="w-[90vw] md:w-[50vw] pt-5 text-center font-semibold leading-7 text-textyellow lg:text-left text-md xl:text-lg anFormMiddle:leading-[18px]">
              Welcome to TsukaWORLD. Here are the products within our thriving Realm. Many of them were created by community members who put their hearts on their sleeves to contribute to Ryoshi&apos;s vision of saving DEFI.

              <br />
              <br />
              &quot;Do not be surprised at what levels we will achieve. Everyone
              keep doing your part. Whatever your talent or gift is use it to
              the utmost of your ability. We are all Ryoshi!&quot;
            </p>
            <div className="mt-20 hidden lg:mx-auto lg:block lg:justify-normal">
              <PrimaryButton Btntitle="Explore Projects" />
            </div>
            <div className="mx-auto mb-5 pt-[22px] text-center lg:hidden">
              <PrimaryButton Btntitle="Read More" />
            </div>
          </div>
        </div>
        <div className="h-[100px] w-full bg-gradient-to-b from-[#181818]/50 to-[#181818] "></div>
        <img
          src="/images/eye.png"
          className="absolute right-0 top-[800px] w-[200px] opacity-40 2xl:w-auto anFormMiddle:hidden"
        />
      </section>
      <div
        id="projects"
        className="min-h-screen min-w-full bg-main bg-[url('/Landing2.png')] bg-fixed bg-top p-4"
      >
        <div className="pt-[5px] text-center font-hylia text-[50px] font-normal leading-[60px] text-textyellow sm:pt-[85px] descriptionmobile:text-[34px]">
          Our Realm
        </div>
        <div className="pt-5 text-center font-optimus text-[30px] font-normal leading-[60px] text-textwhite descriptionmobile:pt-[0px] descriptionmobile:text-[14px]">
          View the projects within our thriving ecosystem
        </div>
        <Table
          size={10}
          tableHeaders={tableHeaders}
          data={ProjectsData?.data}
        />

        <div className="mb-10 text-center font-hylia text-[50px] font-normal text-textyellow sm:pt-[85px] descriptionmobile:text-[34px]">
        Top Liquidity Contributors
        </div>
        <div className="flex flex-col justify-between gap-10 px-0 xl:flex-row xl:px-10">
          <div className="flex flex-col">
            <LiquidityProviderTable
              tableHeaders={tableHeaders_providers}
              datas={liquidityProviders}
            />
          </div>
          <p className="xl:text-md text-lg text-white">
          Shortly after the launch of Dejitaru Tsuka, the POWER of the DRAGON was recognized throughout the DeFi landscape. Numerous inspired and synergistic tokens were introduced, riding on the wave of enthusiasm and momentum generated by $TSUKA to attract investors to their own projects. Here are the top 10 contributors of Ether to the $TSUKA deployer wallet since its inception.
          </p>
        </div>

        <div className="flex w-full flex-col justify-between px-0 xl:flex-row xl:px-10">
          <div className="mt-24 flex flex-col justify-center gap-5">
            <h3 className="pb-2 text-center font-RussoOne text-[30px] leading-9 text-normal">
            Apply to be Listed on TsukaWORLD
            </h3>
            <p className="xl:text-md text-lg text-white">
            If you're involved in a project that contributes to, or aligns with Tsuka, we invite you to become a part of TsukaWORLD - our vibrant decentralized community. By integrating with Tsuka's thriving Circular Economy, you'll position your venture in front of a highly engaged audience.
              <br />
              <br />
              You don't need to be a blockchain project to apply; we welcome all like-minded individuals keen on supporting each other's products and services. Once you apply, expect to hear from us shortly.
            </p>

            <div className="mx-auto w-44">
              <Link href="https://forms.gle/SALQs6f9WYJzuQbZA">
                <ButtonYellow text="Apply Now" />
              </Link>
            </div>
          </div>
          <div className="relative origin-right">
            <div className="absolute right-0 mt-[75px] hidden lg:right-[69px] lg:block  2xl:right-[70px]">
              <Image
                src="/icon-border.png"
                width={600}
                height={600}
                alt="icon"
              />
            </div>
            <Image
              src="/icon-border.png"
              width={265}
              height={265}
              alt="icon"
              className="absolute left-0 right-0 mx-auto mt-[40px] block w-[300px] sm:w-[500px] md:mt-[100px] md:w-[550px] lg:hidden lg:w-[800px]"
            />
            {FeaturedProjects?.data && (
              <Carousel data={FeaturedProjects?.data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
