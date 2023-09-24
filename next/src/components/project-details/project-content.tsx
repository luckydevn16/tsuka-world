"use client";

import InfoSection from "@/app/details/[projectId]/InfoSection";
import ReportModal from "../modal/report-modal";
import ProjectSection from "@/app/details/[projectId]/ProjectSection";
import Details from "../DetailsComponent";
import React, { useEffect, useState } from "react";
import { TableHeader } from "@/types/projectdetails.types";
import {
  project_content,
  project_data,
  project_image,
  project_score,
} from "@/lib/database.types";
import { getProjectVotes } from "@/lib/client/votes";
import { ProjectVotes, Vote } from "@/types";
import { useAccount } from "wagmi";

interface Props {
  tableHeaders: Array<TableHeader>;
  projectData: project_data | null;
  projectContent: project_content | null;
  projectImages: Array<project_image> | null;
  projectScore: project_score | null;
  reportCategories: Array<string>;
}

const ProjectContent: React.FC<Props> = ({
  tableHeaders,
  projectData,
  projectContent,
  projectImages,
  projectScore,
  reportCategories,
}) => {
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [projectVotes, setProjectVotes] = useState<ProjectVotes>({
    upvotes: 0,
    downvotes: 0,
    rating: 5,
    user_status: Vote.NO_VOTE,
  });
  const [tableData, setTableData] = useState<project_data>(projectData as project_data)
  const account = useAccount()

  useEffect(() => {
    void (async () => {
      const walletAddress = account?.address ?? ""
      console.log("Getting votes for project " + projectData?.project_id)
      const response = await getProjectVotes(projectData?.project_id ?? 0, walletAddress);
      console.log(response)
      setProjectVotes(response);
    })();

    if(projectData && projectScore) {
      projectData.rating = projectScore.score ?? 0;
      setTableData(projectData)
    }
    
  }, []);
  

  return (
    <>
      <div className="mx-auto w-[70%] rounded-lg bg-back backdrop-blur-md descriptionfull:w-full">
        <Details
          tableHeaders={tableHeaders}
          data={tableData}
          name={projectContent?.title || ""}
          icon={projectContent?.icon || ""}
        />

        <div className="px-[100px] pb-[65px] descriptionmobile:px-[16px] descriptionpc:flex descriptionpc:flex-row ">
          <ProjectSection
            projectContent={projectContent}
            images={projectImages || []}
          />
          <InfoSection
            data={projectContent}
            projectScore={projectScore || null}
            projectVotes={projectVotes}
            isAudited={projectData?.is_audited}
            setShowReportModal={setShowReportModal}
          />
        </div>
      </div>
      <ReportModal
        showReportModal={showReportModal}
        setShowReportModal={setShowReportModal}
        projectId={projectData?.project_id ?? 0}
        reportCategories={reportCategories}
      />
    </>
  );
};

export default ProjectContent;
