import { ComponentProps } from "react";

export function Logo(props: ComponentProps<"svg">) {
  return (
    <svg
      width="52"
      height="46"
      viewBox="0 0 52 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M26.1968 45.1354C33.4569 32.8216 27.7556 22.6594 13.4627 22.4375L4.9813 36.8227C2.23025 41.4887 4.39062 45.3395 9.80664 45.4235L25.8798 45.6731L26.1968 45.1354Z"
        fill="url(#paint0_linear_704_240)"
      />
      <path
        d="M10.3832 0.11778C4.96693 0.0527319 2.70238 3.84197 5.3252 8.58129L25.8606 45.6879L34.7836 30.7977C37.6624 25.9939 37.106 19.4079 33.2391 12.5144L32.7694 11.677C29.2411 5.38704 20.5914 0.240378 13.4036 0.154054L10.3832 0.11778Z"
        fill="url(#paint1_linear_704_240)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_704_240"
          x1="6.43843"
          y1="41.3684"
          x2="19.0968"
          y2="33.587"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#C7D2FE" />
          <stop offset="1" stop-color="#C7D2FE" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_704_240"
          x1="6.68812"
          y1="5.8437"
          x2="36.9512"
          y2="7.9681"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#4338CA" />
          <stop offset="1" stop-color="#C7D2FE" />
        </linearGradient>
      </defs>
    </svg>
  );
}
