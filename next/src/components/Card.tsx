import Link from "next/link";
import ButtonYellow from "./buttons/button-yellow";

interface Props {
  image: string;
  title: string;
  description: string;
  className?: string;
  project_id: string;
}

const Card: React.FC<Props> = ({
  image,
  title,
  project_id,
  description,
  className,
}) => {
  return (
    <Link className="" href={`/details/${project_id}`}>
      <div
        className={`flex h-full flex-col rounded-lg bg-hover medium:w-[230px] small:grow ${
          className ? className : ""
        }`}
      >
        <div className="w-full p-[9px]">
          <img
            className="h-32 w-full rounded-[10px] object-cover medium:h-40"
            src={image}
            alt={`${title} image`}
          />
        </div>
        <div className="flex flex-col justify-between gap-2 pl-4 pr-5 pt-1">
          <h2 className="font-RussoOne text-[8px] leading-[10px] text-normal sm:text-[20px] sm:leading-[30px] md:text-[25px] md:leading-[40px] medium:text-2xl medium:leading-7">
            {title}
          </h2>
          <div className="font-Opensans text-[7px] font-semibold leading-[10px] text-normal sm:text-[10px] sm:leading-[20px] md:text-[15px] md:leading-[30px] medium:text-base medium:leading-6">
            {description && description.length > 45 ? (
              <p>{`${description.substring(0, 45)}...`}</p>
            ) : (
              <p>{description}</p>
            )}
          </div>
        </div>
        <ButtonYellow 
          text="Read More" 
          className="!text-sm mt-auto mx-2"
        />
      </div>
    </Link>
  );
};

export default Card;
