
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
import { ProjectContentType, ProjectImageType } from "@/types/return.types";

export default async function Page() {
  const _projectId = await getProjectId();
  let projectId;
  if(_projectId){
    projectId = _projectId.toLocaleString();
    console.log(projectId)
  } else {
    projectId=''
  }
  const projectContent = await getProjectContentById({projectId}) as ProjectContentType;
  let projectIsAudited = (await getProjectDataById({projectId}))?.data?.is_audited;
  if(typeof projectIsAudited === "undefined"){
    projectIsAudited = false;
  }
  const projectImages = await getProjectImages({projectId}) as ProjectImageType[];
  return (
    <div className="bg-[#181818] min-h-screen">
      <SideBar />
      <div className="navPc:hidden"><Header/></div> 
      <ProjectContent projectId= {projectId} projectContent={projectContent} projectImages={projectImages} projectIsAudited={projectIsAudited}/>
      <br/>
    </div>
  );
}
