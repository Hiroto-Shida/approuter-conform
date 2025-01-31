import { NextPage } from "next";
import Image from "next/image";

const MyPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">my page</h1>
      <Image
        className="mt-10 animate-bounce"
        src="/moai.png"
        alt="Moai logo"
        width={180}
        height={180}
        priority
      />
    </div>
  );
};

export default MyPage;
