import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import FormBtn from "../common/form-btn";

function RowContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[68px] justify-between border-b border-lightgray last:border-0">
      {children}
    </div>
  );
}

function FieldContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col space-y-2 py-3", className)}>
      {children}
    </div>
  );
}

function TitleText({ children }: { children: ReactNode }) {
  return (
    <div className="font-title text-sm leading-[17px] text-gray">
      {children}
    </div>
  );
}

function FieldText({ children }: { children: ReactNode }) {
  return <div className="text-xl leading-[19px] text-black">{children}</div>;
}

export default function FarmingDialogContent() {
  return (
    <div className="flex flex-col items-stretch gap-y-6">
      <div>
        <RowContainer>
          <FieldContainer>
            <TitleText>Pool</TitleText>
            <FieldText>#100</FieldText>
          </FieldContainer>
          <FieldContainer className="items-end">
            <TitleText>Leverage</TitleText>
            <FieldText>1~10x</FieldText>
          </FieldContainer>
        </RowContainer>

        <RowContainer>
          <FieldContainer>
            <TitleText>Current Farming</TitleText>
            <FieldText>1000 USDT</FieldText>
          </FieldContainer>
          <FieldContainer className="items-end">
            <TitleText>Profit</TitleText>
            <FieldText>+300 USDT</FieldText>
          </FieldContainer>
        </RowContainer>
      </div>

      <FormBtn>Confirm</FormBtn>
    </div>
  );
}
