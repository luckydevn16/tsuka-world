"use client";

import { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ImageButton } from "./ImageButton";
import { InfoSection } from "./project-info";
import { Web3Button } from "@web3modal/react";
import { AiOutlineEdit } from "react-icons/ai";
import ConfirmModal from "../modal/confirm-modal";
import DelModal from "../modal/delete-modal";
// import getProjectImages from "@/actions/getProjectImages";
import { ProjectImageType, ProjectContentType } from "@/types/return.types";
import UpdateModal from "../modal/update-modal";
import axios from "axios";
import { ApiResponse } from "@/types";
import { toast } from "react-toastify";
import CustomDropzone from "./custom_fileupload";
import { createServiceRoleClient } from "@/utils/supabase-server";
import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@/utils/supabase-browser";

interface ContentProps {
  projectId: string;
  projectContent: ProjectContentType;
  projectImages: ProjectImageType[];
  projectIsAudited: boolean;
}
const ProjectContent = ({projectId, projectContent, projectImages, projectIsAudited}:ContentProps) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const [projImages, setProjImages] = useState<ProjectImageType[]| null>(projectImages);
  const [isAudited, setIsAudited] = useState<boolean>(projectIsAudited);
  const [projContent, setProjContent] = useState<ProjectContentType | null>(projectContent);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imgToRemove, setImgToRemove] = useState<ProjectImageType>({});
  useEffect(()=>{
    console.log("inside useEffect:project content:  ", projContent);
  }, [projContent]);
  const onEditorStateChange = async (state: any) => {
    await setEditorState(state);

    const data = convertToRaw(editorState.getCurrentContent());
  };
  const updateContent = async (content:ProjectContentType)=>{
    const result = (await axios.post("/api/project-content", {content, isAudited})).data as ApiResponse
    if(result.success) {
      toast.success("Updated project data successfully");
      setShowUpdateModal(false);
    } else {
      toast.error("Failed to update data");
      setShowUpdateModal(false);
    }
  }
  const supabase = createBrowserClient();
  const handleDrop = async (files: File[]) => {
    setFilesToUpload(files);
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setShowReportModal(true);
  };
  const proceedUploads = async () => {
    console.log("files here::::::::::::", filesToUpload);
    for (const file of filesToUpload){
      const {data, error} = await supabase.storage.from("Project Images")
        .upload(`${file.name}`, file, {
          // .upload(`/images/${projectId}/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if(error){
        toast.error("Error while uploading file:");
        break;
      } else {
        console.log(data);

        const projId = Number(projectId);
        if(Number.isNaN(projId)){
          console.log(projId, projectId);
          break;
        }
        const { publicUrl } = await supabase
          .storage
          .from('Project Images')
          .getPublicUrl(data.path).data;
        // Insert to project_images table
        const {data:insertData, error: insertError} = await supabase
          .from('project_image')
          .insert([
            {project_id: projId, url: publicUrl, name:file.name}
          ]);
        
        if(insertError){
          console.error("Error while inserting data to project_image table", insertError);
        } else {
          console.log("Data inserted successfully:", insertData);
          // Fetch the inserted Data
          const {data: fetchedData, error: fetchError} = await supabase
            .from('project_image')
            .select()
            .eq('project_id', projId);

          if(fetchError){
            console.log("Error in fetching inserted Data from images table");
          } else {
            setProjImages(fetchedData);
          }
        }
      }
    }
  }
  const removeImage = async (r:ProjectImageType) => {
    const {data, error} = await supabase
      .storage
      .from("Project Images")
      // .remove([`images/${projectId}/${r.name}`]);
      .remove([`${r.name}`]);

    if(error){
      toast.error('Error while removing an image');
      setImgToRemove({});
    } else {
      const {data:DelImagesData, error:DelError} = await supabase
        .from('project_image')
        .delete()
        .eq('id', r.id)

      if(DelError){
        toast.error('Error while removing an image record');
        setImgToRemove({});
      } else {
        toast.success('Image removed successfully');
        // Fetch the inserted Data
        const {data: fetchedData, error: fetchError} = await supabase
          .from('project_image')
          .select()
          .eq('project_id', projectId);

        if(fetchError){
          console.log("Error in fetching inserted Data from images table");
        } else {
          setProjImages(fetchedData);
        }
      }
    }
  }
  return (
    <div className="w-full navPc:pl-16 pl-0 font-open-sans">
      <div className="p-4">
        <div className="flex h-[50px] w-full flex-row gap-1">
          <div className="my-auto ml-auto navMobile:hidden">
            <Web3Button />
          </div>
        </div>

        <div className="flex navPc:flex-row flex-col min-h-[80vh] gap-3">
          <div className="navPc:flex grow navPc:flex-row flex-col gap-6 rounded-[10px] bg-darkbg p-6 text-textlight">
            <div className="md:min-w-[250px] lg:min-w-[300px] xl:min-w-[490px]">
              <p className="px-2">Title</p>
              <input className="h-[46px] w-full rounded-[10px] border-[1px] border-borderlight bg-[#181818] text-normal outline-none px-2"  value={projContent?.title} onChange={(e)=>{setProjContent(prevContent=>({...prevContent, title:e.target.value}))}}/>
              <p className="mt-4 px-2">Upload Image</p>
              {/* <FileUpload setShowReportModal={setShowReportModal}/> */}
              <CustomDropzone onDrop={handleDrop}/>
              {/* <button onClick={()=>setShowReportModal(true)}>show</button> */}
              <div className="grid w-full navPc:grid-cols-2 grid-cols-1 mt-4">
                {projImages&&projImages.map(img=>{
                  if(!img.url || !img.name){
                    return null;
                  }
                  return (
                    <ImageButton key={img.id} id={img.id} url={img.url} text={img.name} onDeleteClick={()=>{
                      setImgToRemove(img);
                      setShowDeleteModal(true);
                    }}/>
                  )
                })}
              </div>
            </div>
            <div className="w-full grow">
              <div className="w-full flex justify-end">
                <button className="rounded-lg border-[1px] border-textlight px-2 py-2 text-textlight flex flex-row gap-5" onClick={()=>setShowUpdateModal(true)}>
                  <AiOutlineEdit className="w-[20px] h-[20px] my-1"/>
                  Save
                </button>
              </div>
              <p className="px-2">Description</p>
              <textarea className="w-full scrollable border-[1px] rounded-[10px] border-[#8D784D] py-4 px-2 h-100 max-w-[885px] h-36 outline-none bg-[#181818] " value={projContent?.description} onChange={(e)=> {setProjContent(prevContent=>({...prevContent, description:e.target.value}))}}/>
            </div>
          </div>
          <div className="rounded-[10px] bg-darkbg lg:min-w-[250px] xl:min-w-[356px]">
            <InfoSection projContent={projContent} setProjContent={setProjContent} isAudited={isAudited} setIsAudited={setIsAudited}/>
          </div>
        </div>
      </div>
      <UpdateModal 
        showUpdateModal={showUpdateModal} 
        setShowUpdateModal={setShowUpdateModal}
        onConfirm={()=>{
          if(projContent)
            updateContent(projContent)
        }}
        onCancel={()=>setShowUpdateModal(false)}
      />
      <ConfirmModal 
        showReportModal={showReportModal} 
        setShowReportModal={setShowReportModal}
        onConfirm={()=>{
          proceedUploads();
          setShowReportModal(false);
        }}
        onCancel={()=>{
          setShowReportModal(false);
        }}
        url={previewUrl}
      />
      <DelModal 
        showDeleteModal={showDeleteModal} 
        setShowDeleteModal={setShowDeleteModal} 
        onConfirm={()=>{
          removeImage(imgToRemove);
          setShowDeleteModal(false);
        }} 
        onCancel={()=>{
          setShowDeleteModal(false);
        }}/>

    </div>
  );
};

export default ProjectContent;
