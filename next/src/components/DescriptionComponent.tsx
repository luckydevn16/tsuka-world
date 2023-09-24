"use client";

import { useState } from "react";

interface Props {
  description: string;
}
const Description: React.FC<Props> = ({ description }) => {
  const [less, setLess] = useState(true);
  return (
    <>
      <div className="descriptionmobile:hidden">
        {less ? (
          <p
            style={{ whiteSpace: "pre-line" }}
            className="text-justify text-[16px] leading-loose text-white opacity-50 descriptionmobile:text-[12px]"
          >
            {description}
          </p>
        ) : (
          <p
            style={{ whiteSpace: "pre-line" }}
            className="text-justify text-[16px] leading-loose text-white opacity-50 descriptionmobile:text-[12px]"
          >
            {description && description.slice(0, 150)} ...
          </p>
        )}
        {less ? (
          <button
            className="text-[16px] text-gold hover:underline"
            onClick={() => setLess(false)}
          >
            less
          </button>
        ) : (
          <button
            className="text-[16px] text-gold hover:underline"
            onClick={() => setLess(true)}
          >
            show
          </button>
        )}
      </div>

      <div className="descriptionpc:hidden">
        {!less ? (
          <p
            style={{ whiteSpace: "pre-line" }}
            className="text-justify text-[16px] leading-loose text-white opacity-50 descriptionmobile:text-[12px]"
          >
            {description}
          </p>
        ) : (
          <p
            style={{ whiteSpace: "pre-line" }}
            className="text-justify text-[16px] leading-loose text-white opacity-50 descriptionmobile:text-[12px]"
          >
            {description && description.slice(0, 150)} ...
          </p>
        )}
        {less ? (
          <button
            className="text-[16px] text-gold hover:underline"
            onClick={() => setLess(false)}
          >
            show
          </button>
        ) : (
          <button
            className="text-[16px] text-gold hover:underline"
            onClick={() => setLess(true)}
          >
            less
          </button>
        )}
      </div>
    </>
  );
};

export default Description;
