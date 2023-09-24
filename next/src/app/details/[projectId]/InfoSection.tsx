"use client";

import * as React from "react";
import { AiOutlineFileText } from "react-icons/ai";

import {
  project_content,
  project_score,
} from "@/lib/database.types";

import Audit from "@/components/AuditComponent";
import IconButton from "@/components/IconButton";
import LinkTo from "@/components/LinkComponent";
import VotePair from "@/components/vote/VotePair";
import { ProjectVotes } from "@/types";

type Props = {
  data: project_content | null;
  projectScore: project_score | null;
  projectVotes: ProjectVotes;
  isAudited: boolean | undefined;
  setShowReportModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ShareSection({
  data,
  projectScore,
  projectVotes,
  isAudited = false,
  setShowReportModal,
}: Props) {
  return (
    <div className="flex w-[300px] flex-col descriptionmobile:w-full descriptionpc:mx-[16px]">
      <VotePair 
        projectVotes={projectVotes}
        projectId={data?.project_id ?? -1}
      />
      {data?.site_link && <LinkTo url={data?.site_link} />}
      {/* Link to Report Page */}
      <button
        onClick={() => {
          setShowReportModal(true);
        }}
        className="mb-[15px] flex h-[45px] flex-row gap-[15px] rounded-[5px] bg-hover p-[10px] font-open-sans font-bold text-gold"
      >
        <AiOutlineFileText className="my-auto" />
        Report Project
      </button>
      {/* Audit */}
      <Audit isAudited={isAudited} />
      <hr className="my-[20px] border-line" />
      {/* Link to other pages */}
      {data?.youtube_link && (
        <IconButton
          color="#FF3000"
          text={data?.youtube_link || ""}
          icon="youtube"
        />
      )}
      {/*
      <IconButton color="#337FFF" text="" icon="facebook" />
      */}
      {data?.instagram_link && (
        <IconButton
          color="#E44285"
          text={data?.instagram_link || ""}
          icon="instagram"
        />
      )}
      {data?.telegram_link && (
        <IconButton
          color="#34AADF"
          text={data?.telegram_link || ""}
          icon="telegram"
        />
      )}
      {/*
      <IconButton color="#00D95F" text="" icon="whatsapp" />
      */}
      {data?.twitter_link && (
        <IconButton
          color="#33CCFF"
          text={data?.twitter_link || ""}
          icon="twitter"
        />
      )}
      {data?.discord_link && (
        <IconButton
          color="#5865F2"
          text={data?.discord_link || ""}
          icon="discord"
        />
      )}
      {/*
      <IconButton color="#5865F2" text="" icon="discord" />
      <IconButton color="#006699" text="" icon="linkedin" />
      */}
    </div>
  );
}
