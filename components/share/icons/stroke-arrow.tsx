import { SVGProps, memo } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={14} height={8} fill="current" {...props}>
    <path
      fill="currentColor"
      d="M1.707.293q-.14-.14-.324-.217Q1.199 0 1 0T.617.076Q.434.152.293.293q-.14.14-.217.324Q0 .801 0 1t.076.383q.076.183.217.324l6 6q.14.14.324.217Q6.801 8 7 8t.383-.076q.183-.076.324-.217l6-6q.14-.14.217-.324Q14 1.199 14 1t-.076-.383q-.076-.183-.217-.324-.14-.14-.324-.217Q13.199 0 13 0t-.383.076q-.184.076-.324.217L7 5.586 1.707.293Z"
    />
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
