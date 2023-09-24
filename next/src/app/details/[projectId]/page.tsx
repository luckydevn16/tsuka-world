import { notFound } from "next/navigation";

import Header from "@/components/Header";

import getProjectContentById from "@/actions/getProjectContentById";
import getProjectDataById from "@/actions/getProjectDataById";
import getProjectImages from "@/actions/getProjectImages";
import getProjectScore from "@/actions/getProjectScore";

import { Params } from "@/types";
import ProjectContent from "@/components/project-details/project-content";
import getReportCategories from "@/lib/server/getReportCategories";
import { getProjectVotes } from "@/actions/getProjectVotes";
import { getConnectedAddress } from "@/lib/client/wallet";

export default async function Page({ params }: { params: Params }) {
  const projectData = await getProjectDataById(params);
  const projectContent = await getProjectContentById(params);
  const projectImages = await getProjectImages(params);
  const projectScore = await getProjectScore(params);
  const reportCategories = await getReportCategories();
  //const walletAddress = await getConnectedAddress();

  const tableHeaders = [
    { name: "name", viewName: "Name", type: "name" },
    { name: "marketCap", viewName: "Market Cap", type: "currency" },
    { name: "price", viewName: "Price", type: "currency" },
    { name: "liquidity", viewName: "Liquidity", type: "normal" },
    { name: "category", viewName: "Category", type: "normal" },
    { name: "deployerFunds", viewName: "Deployer Funds", type: "normal" },
    { name: "pricecha", viewName: "24hr % change", type: "price2" },
    { name: "rating", viewName: "Rating", type: "rating" },
    { name: "holders", viewName: "Holders", type: "normal" },
  ];

  if (!projectContent) {
    return notFound();
  }

  return (
    <div className="relative pt-[64px]">
      <img
        src="/images/eye.png"
        className="absolute right-0 top-[800px] opacity-40"
        alt="eye"
      />
      <Header />
      {/* Main Component */}
      <div className="min-h-screen min-w-full bg-main bg-[url('/images/detailback.png')] bg-cover bg-no-repeat p-4 ">
        <h1 className="mt-[80px] text-center font-hylia text-[72px] text-button descriptionmobile:hidden">
          {projectContent.title || ""}
        </h1>
        <h1 className="text-center font-hylia text-[34px] text-button descriptionpc:hidden">
          Our Ecosystem
        </h1>
        <p className="mb-[54px] text-center font-optimus text-[30px] text-white descriptionmobile:mb-[20px] descriptionmobile:px-[20px] descriptionmobile:text-[14px]">
          View one of the projects within our thriving ecosystem
        </p>

        <ProjectContent
          tableHeaders={tableHeaders}
          projectData={projectData?.data ?? null}
          projectContent={projectContent}
          projectImages={projectImages ?? []}
          projectScore={projectScore?.data ?? null}
          reportCategories={reportCategories}
        />
      </div>
    </div>
  );
}
