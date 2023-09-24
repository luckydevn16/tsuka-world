import { notFound } from "next/navigation";

import Header from "@/components/Header";

import getProjectContentById from "@/actions/getProjectContentById";
import getProjectDataById from "@/actions/getProjectDataById";
import getProjectImages from "@/actions/getProjectImages";
import getProjectScore from "@/actions/getProjectScore";

import { Params } from "@/types";
import ProjectContent from "@/components/project-management/project-content";
import getReportCategories from "@/lib/server/getReportCategories";
import { SideBar } from "@/components/project-management/sidebar";
import getProjectId from "@/actions/getProjectId";

export default async function Page({ params }: { params: Params }) {
  const projectData = await getProjectDataById(params);
  const projectContent = await getProjectContentById(params);
  const projectImages = await getProjectImages(params);
  const projectScore = await getProjectScore(params);
  const reportCategories = await getReportCategories();
  const project_ID_fromemil = await getProjectId();
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

  // if (!projectContent?.data) {
  //   return notFound();
  // }

  return (
    <div className="bg-[#181818] min-h-screen">
      <SideBar />
      <div className="navPc:hidden"><Header/></div> 
      {/* <ProjectContent projectId={params.projectId as string || ""} /> */}
      <br/>
    </div>
  );
}
