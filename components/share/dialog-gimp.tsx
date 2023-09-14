export default function DialogGimp() {
  return (
    <div className="absolute -left-[2px] flex h-full flex-col justify-between pt-[26px] pb-10">
      <div>
        <div className="h-[16px] w-[8px] rounded-r-sm border-2 border-l-0 border-black bg-white"></div>
        <div className="mt-[5px] h-[16px] w-[8px] rounded-r-sm border-2 border-l-0 border-black bg-white"></div>
      </div>
      <div className="relative -left-[4px]">
        <div className="h-[3px] w-[6px] rounded-[30px] bg-black"></div>
        <div className="mt-2 h-[3px] w-[6px] rounded-[30px] bg-black"></div>
      </div>
    </div>
  );
}
