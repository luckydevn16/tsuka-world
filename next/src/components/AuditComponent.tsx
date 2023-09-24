"use client";

interface Props {
  isAudited: boolean; //isAudited ; true: Yes and false: No
}
const Audit: React.FC<Props> = ({ isAudited }) => {
  // Returns Audit Component
  return (
    <div
      className={` rounded-[5px] border-[1px] ${
        isAudited ? "border-up" : "border-auditno"
      } grid grid-cols-2 `}
    >
      <div
        className={`${
          isAudited ? "bg-up" : "bg-auditno"
        }  py-[11px] text-center font-open-sans text-[16px] font-bold`}
      >
        Audit
      </div>
      {isAudited ? (
        <div className="  py-[11px] text-center font-open-sans text-[16px] font-bold text-up">
          Yes
        </div>
      ) : (
        <div className="  py-[11px] text-center font-open-sans text-[16px] font-bold text-down">
          No
        </div>
      )}
    </div>
  );
};

export default Audit;
