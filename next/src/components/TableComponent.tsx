"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineDown,
  AiOutlineUp,
} from "react-icons/ai";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { VscChromeClose } from "react-icons/vsc";

import { ProjectType } from "@/actions/getAllProjectData";

import Dropdown from "./Dropdown";
import { IconButton } from "@mui/material";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import { commafyOrHtmlTag } from "@/lib/client/number-helpers";

interface Props {
  tableHeaders: { name: string; viewName: string; type: string }[];
  data: ProjectType[] | undefined | null;
  size?: number;
}

/**
 * Rating props prtotype
 */
type RatingProps = {
  num: number | undefined;
};
/**
 *
 * @param param0 amount of stars
 * @returns rating stars
 */
const Rating = ({ num }: RatingProps) => {
  const dom = [];
  for (let i = 0; i < 5; i++) {
    dom.push(
      <span
        key={`star-${i}`}
        className={`text-lg ${Number(num) > i ? "text-gold" : "text-white"}`}
      >
        <AiFillStar />
      </span>
    );
  }
  return <>{dom}</>;
};
/**
 * The prototype of props used in component which shows in details on mobile design
 * Same as the props on the right, but props of the component visible in Mobile.
 */
type AccordionProps = {
  data: ProjectType | null;
  x: number;
};
/**
 *
 * @param num numbers which you want change
 * @param type normal is us number the other is USD
 * @returns string which changed to you want
 */
const convert = (num: number | null, type = "normal") => {
  if (num == null) {
    return "-";
  } else {
    if (type === "normal") {
      return num.toLocaleString("en-us");
    } else {
      return num.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });
    }
  }
};

/**
 *
 * @param x is key of each component which shows on details in mobile design
 * @returns component
 */
const Accordion = ({ data, x }: AccordionProps) => {
  // useEffect(() => {
  //   console.log('Hello, console!', data);
  // }, []);
  const [isOpened, setOpened] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("0px");
  const contentElement = useRef<HTMLDivElement>(null);
  const router = useRouter()

  const HandleOpening = () => {
    setOpened(!isOpened);
    setHeight(
      isOpened || !contentElement.current
        ? "0px"
        : `${contentElement.current.scrollHeight}px`
    );
  };
  return (
    <div key={`accordion-${x}`} className=" border-b border-gray-600">
      <div className="flex justify-between px-2 pt-3 text-white">
        <div onClick={(e)=>{e.stopPropagation(); router.push(`/details/${data?.project_id}`)}} className="flex items-center justify-normal">
          {data?.project_content?.icon && (
            <Image
              className="mr-2"
              src={data?.project_content?.icon || ""}
              alt=""
              width={24}
              height={24}
            />
          )}

          {data?.project_content?.title}
        </div>
        <div className="flex flex-col items-center">
          <span>{commafyOrHtmlTag(data?.price ?? 0, true)}</span>
          {Number(data?.percent_change) > 0 ? (
            <span className="flex items-center justify-normal text-up">
              {data?.percent_change?.toLocaleString("en-us")} % &nbsp;
              <BsArrowUp />
            </span>
          ) : data?.percent_change && data?.percent_change < 0 ? (
            <span className="flex items-center justify-normal text-down">
              {data?.percent_change?.toLocaleString("en-us")} % &nbsp;
              <BsArrowDown />
            </span>
          ) : (
            <span className="flex items-center justify-normal text-white">
              {""}
            </span>
          )}
        </div>
        <div
          className="flex w-[60px] justify-end text-right text-[#9B8355]"
          onClick={HandleOpening}
        >
          {!isOpened ? (
            <button>Details</button>
          ) : (
            <button className="self-center">
              <VscChromeClose />
            </button>
          )}
        </div>
      </div>
      <div
        ref={contentElement}
        style={{ height: height }}
        className="my-2 overflow-hidden rounded-md bg-[#2B2212] transition-all duration-200"
      >
        <div className="m-2 flex flex-col">
          <div className="flex items-center justify-between border-b border-[#9B8355]  p-2 text-[#9B8355]">
            <span>Category</span>
            <span>{data?.category}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#9B8355]  p-2 text-[#9B8355]">
            <span>Market Cap</span>
            <span>{commafyOrHtmlTag(data?.market_cap ?? 0, true)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#9B8355] p-2 text-[#9B8355]">
            <span>Ratings</span>
            <span className="flex justify-normal">
              <Rating num={data?.rating} />
            </span>
          </div>
          <div className="flex items-center justify-between p-2  text-[#9B8355]">
            <span>Holders</span>
            <span>{convert(data?.holders ?? null)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Table: React.FC<Props> = ({ tableHeaders, data, size = 10 }) => {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [token, setToken] = useState<boolean>(false); // if Token filter pressed, true: pressed
  const [app, setApp] = useState<boolean>(false); // if Application filter pressed, true: pressed
  const [util, setUtil] = useState<boolean>(false); // if Utility filter pressed, true: pressed
  const [nft, setNft] = useState<boolean>(false); // if NFT filter pressed, true: pressed

  const [cates, setCates] = useState(data?.map(() => false));

  const [dts, setDts] = useState(data); // Filtered Data
  const [up, setUp] = useState(0); // Status variable to re-render

  const [search, setSearch] = useState("");
  const [mbsearch, setMbsearch] = useState("");

  useEffect(() => {
    const temp: string[] = [];
    for (const item of data || []) {
      if (!temp.includes(item.category as string)) {
        temp.push(item.category as string);
      }
    }
    setCategories(temp);
  }, [data]);

  /**
   * function that search using category and search name
   */
  const totalSearch = useCallback(() => {
    const val = new RegExp(search, "i");
    const tempdata = data?.filter(
      (data) => data.project_content?.title.search(val) !== -1
    );
    if (cates?.every((cate) => cate) || cates?.every((cate) => !cate)) {
      setDts(tempdata);
    } else {
      setDts(
        tempdata?.filter((data) =>
          categories
            .filter((cate, i) => cates && cates[i])
            .some((item) => item === data.category)
        )
      );
    }
  }, [cates, data, categories, search, setDts]);

  /**
   * search when category button pressed
   */
  useEffect(() => {
    if (up !== 0) totalSearch();
  }, [cates, up, totalSearch]);

  /**
   *
   * @param e event
   * the function that filter the data when press enter in search box
   */
  const searchFn = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      totalSearch();
    }
  };

  /**
   *
   * @param arr array
   * @param id number
   * the function to make a new array with changing a value of special id
   */
  const makeState = (arr: boolean[], id: number) => {
    arr[id] = !arr[id];
    return arr;
  };

  /**
   *
   * @param id number
   * the function when the client click a category button
   */
  const selectCate = (id: number) => {
    setCates(makeState(cates || [], id));
    setUp(up + 1);
  };

  return (
    <>
      {/**
       * The component which shows on PC
       */}
      <div className="gold-table mx-auto w-full overflow-x-auto rounded-lg bg-back p-4 py-1 pb-4 xl:w-[70vw] navMobile:hidden">
        <div className="my-2 flex flex-wrap justify-end gap-2 text-right text-white">
          {categories.map((category, idx) => (
            <button
              key={`category-${idx}-${up}`}
              className={`font-sans rounded-lg p-4 py-1 text-base capitalize ${
                cates && cates[idx]
                  ? "bg-hover text-normal"
                  : "bg-normal text-hover"
              }`}
              onClick={() => selectCate(idx)}
            >
              {category}
            </button>
          ))}
        </div>

        <table className="gold-table w-full min-w-table table-auto border-collapse text-sm backdrop-blur-sm">
          <thead className="text-gray-500">
            <tr className="border-b border-gray-600">
              {tableHeaders.map((head, i) =>
                head.type !== "detail" ? (
                  <th
                    className="py-6 text-left text-gold"
                    key={`headfield-${i}`}
                  >
                    {head.viewName}
                  </th>
                ) : (
                  <tr key={i}>
                    <td colSpan={tableHeaders.length} className="text-center">
                      Empty Data
                    </td>
                  </tr>
                )
              )}
            </tr>
          </thead>
          <tbody key="tbody-">
            {dts?.length ? (
              dts
                ?.slice(pageIndex * size, (pageIndex + 1) * size)
                .map((data, j) => (
                  <tr
                    onClick={() => router.push(`/details/${data.project_id}`)}
                    key={`body-row-${j}`}
                    className="cursor-pointer border-b border-gray-600"
                  >
                    {tableHeaders.map((head, k) =>
                      head.name === "name" ? (
                        <td
                          className="flex justify-normal gap-2 py-5 text-left text-base text-white"
                          key={`body-${k}`}
                        >
                          {data.project_content.icon && (
                            <img
                              className="h-6 w-6 rounded-full"
                              src={data.project_content.icon}
                              alt="icon"
                            />
                          )}

                          <span>{data.project_content.title}</span>
                        </td>
                      ) : head.name === "marketCap" ? (
                        <td
                          className="py-5 text-left text-base text-white"
                          key={`body-${k}`}
                        >
                          {convert(data.market_cap ?? null, "usd")}
                        </td>
                      ) : head.name === "price" ? (
                        <td
                          className="py-5 text-left text-base text-white"
                          key={`body-${k}`}
                        >
                          <span className="flex items-center justify-normal text-white">
                            {commafyOrHtmlTag(data?.price ?? 0, true)}
                          </span>
                        </td>
                      ) : head.name === "liquidity" ? (
                        <td
                          className="py-5 text-left text-base text-white"
                          key={`body-${k}`}
                        >
                          <span className="flex items-center justify-normal text-white">
                            {convert(data.liquidity_usd ?? null)}
                          </span>
                        </td>
                      ) : head.name === "category" ? (
                        <td
                          className="py-5 text-left text-base text-white"
                          key={`body-${k}`}
                        >
                          <span className="flex items-center justify-normal text-white">
                            {data.category}
                          </span>
                        </td>
                      ) : head.name === "deployerFunds" ? (
                        <td
                          className="py-5 text-left text-base text-white"
                          key={`body-${k}`}
                        >
                          <span className="flex items-center justify-normal text-white">
                            {convert(data?.deployer_funds ?? null)}
                          </span>
                        </td>
                      ) : head.name === "pricecha" ? (
                        <td
                          className="py-5 text-left text-base text-white"
                          key={`body-${k}`}
                        >
                          {data.percent_change ? (
                            Number(data.percent_change) > 0 ? (
                              <span className="flex items-center justify-normal text-up">
                                {data.percent_change.toLocaleString("en-us")}%&nbsp;
                                <AiOutlineUp />
                              </span>
                            ) : (
                              <span className="flex items-center justify-normal text-down">
                                {data.percent_change.toLocaleString("en-us")}%&nbsp;
                                <AiOutlineDown />
                              </span>
                            )
                          ) : (
                            <span className="flex items-center justify-normal text-white">
                              -
                            </span>
                          )}
                        </td>
                      ) : head.name === "rating" ? (
                        <td
                          className="flex-normal flex py-5 text-left text-base text-white"
                          key={`body-${k}`}
                        >
                          <Rating num={data.rating} />
                        </td>
                      ) : head.name === "holders" ? (
                        <td
                          className="py-5 text-left text-base text-white"
                          key={`body-${k}`}
                        >
                          {convert(data.holders ?? null)}
                        </td>
                      ) : null
                    )}
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className="text-center">
                  Empty Data
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="mx-auto flex w-1/2 min-w-[200px] justify-around">
          <IconButton
            sx={{
              color: "white",
              "&.Mui-disabled": {
                color: "darkgray",
              },
            }}
            onClick={() => {
              setPageIndex(0);
            }}
            disabled={!pageIndex}
          >
            <FirstPageIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
              "&.Mui-disabled": {
                color: "darkgray",
              },
            }}
            onClick={() => {
              if (pageIndex) {
                setPageIndex(pageIndex - 1);
              }
            }}
            disabled={!pageIndex}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
              "&.Mui-disabled": {
                color: "darkgray",
              },
            }}
            onClick={() => {
              if (dts?.length && dts.length > (pageIndex + 1) * size) {
                setPageIndex(pageIndex + 1);
              }
            }}
            disabled={
              Math.floor(dts?.length ? Math.floor(dts?.length / size) : 0) ===
              pageIndex
            }
          >
            <ChevronRightIcon />
          </IconButton>
          <IconButton
            sx={{
              color: "white",
              "&.Mui-disabled": {
                color: "darkgray",
              },
            }}
            onClick={() => {
              if (dts?.length) {
                setPageIndex(Math.floor(dts.length / size));
              }
            }}
            disabled={
              Math.floor(dts?.length ? Math.floor(dts?.length / size) : 0) ===
              pageIndex
            }
          >
            <LastPageIcon />
          </IconButton>
        </div>
      </div>
      {/**
       *
       * The component which shows on Mobile
       *
       */}
      <div className="gold-table w-full overflow-x-auto rounded-lg bg-back p-4 py-1 navPc:hidden">
        <div className="my-2 grid grid-cols-2 justify-end gap-4 text-right text-white">
          <div className="relative !w-full">
            <input
              value={mbsearch}
              onChange={(e) => {
                setSearch(e.target.value);
                setMbsearch(e.target.value);
              }}
              onKeyDown={(e) => searchFn(e)}
              type="text"
              placeholder="Search..."
              className="w-full !rounded-md !bg-[#211B1B] py-1 pl-7 text-gold outline-none placeholder:text-gold"
            ></input>
            <span className="absolute left-2 top-[7px] text-gold">
              <FiSearch />
            </span>
          </div>
          <div>
            <Dropdown
              title="Category"
              items={categories}
              state={cates ? cates : []}
              setState={selectCate}
            />
          </div>
        </div>
        <div className="gold-table flex w-full flex-col py-4 text-base backdrop-blur-sm">
          {dts?.length ? (
            dts?.map((data, x: number) => (
              <Accordion key={x} x={x} data={data} />
            ))
          ) : (
            <span>Empty Data</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Table;
