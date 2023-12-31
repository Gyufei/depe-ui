import Image from "next/image";
import { forwardRef } from "react";

const RowOperateDot = forwardRef(
  (
    { isActive, ...rest }: { isActive: boolean; [key: string]: any },
    _ref: any,
  ) => {
    return (
      <div
        {...rest}
        data-state={isActive ? "open" : "closed"}
        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md outline-none hover:bg-yellow data-[state=open]:bg-yellow"
      >
        <Image
          width={20}
          height={20}
          src="/icons/operate-dot.svg"
          alt="operate"
        ></Image>
      </div>
    );
  },
);

RowOperateDot.displayName = "RowOperateDot";

export default RowOperateDot;
