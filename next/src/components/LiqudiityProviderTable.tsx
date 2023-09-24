"use client";

import { useState } from "react";


interface Props {
  tableHeaders: { name: string; viewName: string; type: string }[];
  datas: rowProp[];
}
export type rowProp = {
  id: number; // Id
  rank: number | null; // rank
  wallet_address: string; // Wallet Address
  amount_sent: number | null; // Amount sent on eth
  [key: string]: any;
}

/**
 * The prototype of props used in component which shows in details on mobile design
 * Same as the props on the right, but props of the component visible in Mobile.
 */
type AccordionProps = {
  x: number;
  data: rowProp;
};
/**
 *
 * @param num numbers which you want change
 * @param type normal is us number the other is USD
 * @returns string which changed to you want
 */
const convert = (num: number, type = "normal") =>
  type === "normal"
    ? num.toLocaleString("en-us")
    : num.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });

/**
 *
 * @param x is key of each component which shows on details in mobile design
 * @returns component
 */
const Accordion = ({ x, data }: AccordionProps) => {
  return (
    <div key={`accordion-${x}`} className=" border-b border-gray-600">
      <div className="flex justify-between px-2 pt-3 text-white">
        <div className="flex items-center justify-normal">
          {data.rank}
        </div>
        <div className="flex flex-col items-center">
          <span>{data.addr}</span>
        </div>
        <div className="flex w-[60px] justify-end text-right text-[#9B8355]">
          {data.amount}
        </div>
      </div>
    </div>
  );
};

const Table: React.FC<Props> = ({ tableHeaders, datas }) => {
  const [dts, setDts] = useState(datas);

  return (
    <>
      {/**
       * The component which shows on PC
       */}

      <div className="gold-table mx-auto w-full xl:w-[50vw] xl:block hidden overflow-x-auto rounded-lg bg-back p-4 py-1 pb-4">
          <table className="gold-table w-full table-auto border-collapse text-sm backdrop-blur-sm">
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
                    ""
                  )
                )}
              </tr>
            </thead>
            <tbody onClick={()=>{window.open("https://dune.com/queries/2361021")}} key="tbody-" className="cursor-pointer">
              {dts.length ? (
                dts.map((data, j) => (
                  <tr
                    key={`body-row-${j}`}
                    className="border-b border-gray-600"
                  >
                    <td
                      className="text-small py-3 text-left text-white"
                      key={`body-${j}-${1}`}
                    >
                      {convert(data.rank ?? 0)}
                    </td><td
                      className="text-small py-3 text-left text-white"
                      key={`body-${j}-${2}`}
                    >
                      {data.wallet_address}
                    </td><td
                      className="text-small py-3 text-left text-white"
                      key={`body-${j}-${3}`}
                    >
                      {convert(data.amount_sent ?? 0)} ETH
                    </td>
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
      </div>
      {/**
       * The component which shows on Mobile
       */}
      <div className="gold-table mx-auto w-full xl:w-[70vw] block xl:hidden overflow-x-auto rounded-lg bg-back p-4 py-1 pb-4">
        <table className="gold-table w-full table-auto border-collapse text-sm backdrop-blur-sm">
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
                  ""
                )
              )}
            </tr>
          </thead>
          <tbody onClick={()=>{window.open("https://dune.com/queries/2361021")}} key="tbody-" className="cursor-pointer">
            {dts.length ? (
              dts.map((data, j) => (
                <tr
                  key={`body-row-${j}`}
                  className="border-b border-gray-600"
                >
                  <td
                    className="text-small py-3 text-left text-white"
                    key={`body-${j}-${1}`}
                  >
                    {convert(data.rank ?? 0)}
                  </td><td
                    className="text-small py-3 text-left text-white"
                    key={`body-${j}-${2}`}
                  >
                    {data.wallet_address.slice(0,3) + "..." + data.wallet_address.slice(-4)}
                  </td><td
                    className="text-small py-3 text-left text-white"
                    key={`body-${j}-${3}`}
                  >
                    {convert(data.amount_sent ?? 0)} ETH
                  </td>
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
      </div>
    </>
  );
};

export default Table;
