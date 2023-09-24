"use client";
import { useRef, useState } from "react";
import { AiFillStar, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

import { project_data } from "@/lib/database.types";
import { TableHeader } from "@/types/projectdetails.types";
import { commafyOrHtmlTag } from "@/lib/client/number-helpers";

interface Props {
  tableHeaders: Array<TableHeader>;
  data: project_data | null;
  name: string;
  icon: string;
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
  data: project_data | null;
  name: string;
  icon: string;
};
/**
 *
 * @param num numbers which you want change
 * @param type normal is us number the other is USD
 * @returns string which changed to you want
 */
const convert = (num: number | undefined, type = "normal") =>
  type === "normal"
    ? num?.toLocaleString("en-us")
    : num?.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });

/**
 *
 * @param x is key of each component which shows on details in mobile design
 * @returns component
 */
const Accordion = ({ data, name, icon }: AccordionProps) => {
  const contentElement = useRef(null);

  return (
    <div className=" border-b border-gray-600">
      <div className="flex justify-between px-2 pt-3 text-white">
        <div className="flex items-center justify-normal">
          {icon && <img className="mr-2 w-6" src={icon} alt="icon" />}
          {name}
        </div>
        <div className="flex flex-col items-center">
          <span>{convert(data?.market_cap)}</span>
          {Number(data?.percent_change) > 0 ? (
            <span className="flex items-center justify-normal text-up">
              {data?.price || "-"} % &nbsp;
              <BsArrowUp />
            </span>
          ) : (
            <span className="flex items-center justify-normal text-down">
              {data?.price || "-"} % &nbsp;
              <BsArrowDown />
            </span>
          )}
        </div>
      </div>
      <div
        ref={contentElement}
        className="my-2 overflow-hidden rounded-md bg-[#2B2212] transition-all duration-200"
      >
        <div className="m-2 flex flex-col">
          <div className="flex items-center justify-between border-b border-[#9B8355]  p-2 text-[#9B8355]">
            <span>Liquidity</span>
            <span>{convert(data?.liquidity_usd)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#9B8355]  p-2 text-[#9B8355]">
            <span>Category</span>
            <span>{data?.category}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#9B8355]  p-2 text-[#9B8355]">
            <span>Deployer Funds</span>
            <span>{convert(data?.deployer_funds)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[#9B8355]  p-2 text-[#9B8355]">
            <span>Price Change</span>
            {Number(data?.percent_change) > 0 ? (
              <span className="flex items-center justify-normal text-up">
                {data?.price || "-"} % &nbsp;
                <AiOutlineUp />
              </span>
            ) : (
              <span className="flex items-center justify-normal text-down">
                {data?.price || "-"} % &nbsp;
                <AiOutlineDown />
              </span>
            )}
          </div>
          <div className="flex items-center justify-between border-b border-[#9B8355] p-2 text-[#9B8355]">
            <span>Ratings</span>
            <span className="flex justify-normal">
              <Rating num={data?.rating} />
            </span>
          </div>
          <div className="flex items-center justify-between p-2  text-[#9B8355]">
            <span>Holders</span>
            <span>{convert(data?.holders)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Details: React.FC<Props> = ({ tableHeaders, data, name, icon }) => {
  const [dts, setDts] = useState(data); // Filtered Data
  const [up, setUp] = useState(0); // Status variable to re-render

  const [search, setSearch] = useState("");
  const [mbsearch, setMbsearch] = useState("");

  /**
   * function that search using category and search name
   */
  const totalSearch = () => {
    const val = new RegExp(search, "i");
    // const tempdata = datas.filter((data) => data.name.search(val) !== -1);
  };

  console.log(data);
  console.log("header_data", tableHeaders);
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

  return (
    <>
      {/**
       * The component which shows on PC
       */}
      <div className="gold-table overflow-hidden p-4 px-[35px] py-1  pb-4 descriptionmobile:hidden">
        <table className="gold-table table-auto m-auto border-collapse text-base ">
          <thead className="text-gray-500">
            <tr className="">
              {tableHeaders.map((head, i) => 
                head.type !== "detail" && head.name === "name" ? (
                  <th
                    className="p-6 text-center text-gold"
                    key={`headfield-${i}`}
                  >
                    {head.viewName}
                  </th>
                ) 
                : 
                head.type !== "detail" && head.name === "marketCap" && data && data.market_cap ? (
                  <th
                    className="p-6 text-center text-gold"
                    key={`headfield-${i}`}
                  >
                    {head.viewName}
                  </th>
                ) 
                :
                head.type !== "detail" && head.name === "price" && data && data.price ? (
                  <th
                    className="p-6 text-center text-gold"
                    key={`headfield-${i}`}
                  >
                    {head.viewName}
                  </th>
                ) 
                :
                head.type !== "detail" && head.name === "liquidity" && data && data.liquidity_usd ? (
                  <th
                    className="p-6 text-center text-gold"
                    key={`headfield-${i}`}
                  >
                    {head.viewName}
                  </th>
                ) 
                :
                head.type !== "detail" && head.name === "category" && data && data.category ? (
                  <th
                    className="p-6 text-center text-gold"
                    key={`headfield-${i}`}
                  >
                    {head.viewName}
                  </th>
                ) 
                :
                head.type !== "detail" && head.name === "deployerFunds" && data && data.deployer_funds ? (
                  <th
                    className="p-6 text-center text-gold"
                    key={`headfield-${i}`}
                  >
                    {head.viewName}
                  </th>
                ) 
                :
                head.type !== "detail" && head.name === "pricecha" && data && data.percent_change
                ? (
                  <th
                    className="p-6 text-center text-gold"
                    key={`headfield-${i}`}
                  >
                    {head.viewName}
                  </th>
                ) 
                :
                head.type !== "detail" && head.name === "rating" && data && data.rating ? (
                  <th
                    className="p-6 text-center text-gold"
                    key={`headfield-${i}`}
                  >
                    {head.viewName}
                  </th>
                ) 
                :
                head.type !== "detail" && head.name === "holders" && data && data.holders ? (
                  <th
                    className="p-6 text-center text-gold"
                    key={`headfield-${i}`}
                  >
                    {head.viewName}
                  </th>
                ) 
                :
                (
                  ""
                )
              )}
            </tr>
            <tr className="absolute border-b border-gray-600 top-30 left-0 w-full"></tr>
          </thead>
          <tbody key="tbody-">
            {data ? (
              <tr className="relative">
                {tableHeaders.map((head, k) =>
                  head.name === "name" ? (
                    <td
                      className="flex justify-center gap-2 py-5 text-left text-base text-white"
                      key={`body-${k}`}
                    >
                      {icon && (
                        <img
                          className="h-6 w-6 rounded-full"
                          src={icon}
                          alt="icon"
                        />
                      )}

                      <span>{name}</span>
                    </td>
                  ) : head.name === "marketCap" && data.market_cap ? (
                    <td
                      className="py-5 text-center text-base text-white"
                      key={`body-${k}`}
                    >
                      {commafyOrHtmlTag(data.market_cap ?? 0, true) || "-"}
                    </td>
                  ) : head.name === "price" && data.price ? (
                    <td
                      className="py-5 text-center text-base text-white"
                      key={`body-${k}`}
                    >
                      <span className="flex items-center justify-center text-white">
                        {commafyOrHtmlTag(data.price ?? 0, true) || "-"}
                      </span>
                    </td>
                  ) : head.name === "category" && data.category ? (
                    <td
                      className="py-5 text-center text-base text-white"
                      key={`body-${k}`}
                    >
                      <span className="flex items-center justify-center text-white">
                        {data.category || "-"}
                      </span>
                    </td>
                  ) : head.name === "pricecha" && data.percent_change ? (
                    <td
                      className="py-5 text-center text-base text-white"
                      key={`body-${k}`}
                    >
                      {data.percent_change ? (
                        Number(data.percent_change) > 0 ? (
                          <span className="flex items-center justify-center text-up">
                            {data.percent_change.toLocaleString("en-us") || "-"}%&nbsp;
                            <AiOutlineUp />
                          </span>
                        ) : (
                          <span className="flex items-center justify-center text-down">
                            {data.percent_change.toLocaleString("en-us") || "-"}%&nbsp;
                            <AiOutlineDown />
                          </span>
                        )
                      ) : (
                        <span className="flex items-center justify-center text-white">
                          -
                        </span>
                      )}
                    </td>
                  ) : head.name === "rating" && data.rating ? (
                    <td
                      className="flex-normal flex py-5 justify-center text-base text-white"
                      key={`body-${k}`}
                    >
                      <Rating num={data.rating} />
                    </td>
                  ) : head.name === "holders" && data.holders ? (
                    <td
                      className="py-5 text-center text-base text-white"
                      key={`body-${k}`}
                    >
                      {convert(data.holders) || "-"}
                    </td>
                  ) : null
                )}
              </tr>
            ) : (
              <tr>
                <td colSpan={tableHeaders.length} className="text-center">
                  Empty Data
                </td>
              </tr>
            )}
            <tr className="absolute border-b border-gray-600 top-47 left-0 w-full"></tr>
          </tbody>
        </table>
      </div>
      {/**
       * The component which shows on Mobile
       */}
      <div className="gold-table w-full overflow-x-auto rounded-lg p-4 py-1 descriptionpc:hidden">
        <div className="mt-[5px] justify-end  gap-4 text-right text-white">
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
        </div>
        <div className="gold-table flex  w-full flex-col py-4 text-base">
          {dts ? (
            <Accordion data={data} icon={icon} name={name} />
          ) : (
            <span>Empty Data</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Details;
