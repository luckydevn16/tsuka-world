"use client";

interface Props {
  Btntitle: string;
  textSize?: string;
  padding?: string;
  onClick?: () => void;
}

const PrimaryButton: React.FC<Props> = ({ Btntitle, textSize, padding, onClick }) => {
  const scrollToTable = () => {
    const table = document.getElementById("projects");
    table && table.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <button onClick={onClick ?? scrollToTable} className={`px-8 ${padding ?? "py-6"} bg-[url('/buttonImg.png')] bg-textyellow rounded-[10px] anFormMiddle:rounded-[5px] shadow-[0_10px_0px_0px_#654302] font-hylia ${textSize ?? "text-[28px]"} text-hover anFormMiddle:text-[14px] anFormMiddle:leading-[14.4px] anFormMiddle:py-[11px] anFormMiddle:px-[21px] flex align-center justify-center`}>
        {Btntitle}
      </button>
    </>
  );
};

export default PrimaryButton;
