import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[80vh]">
      <div className="flex flex-col items-center justify-center gap-8 ">
        <h1 className="text-primary md:text-8xl text-4xl font-bold">DocGhor</h1>
        <p className="font-medium md:text-3xl text-sm ">
          Welcome To Doctor Ghor Admin Panel
        </p>
      </div>
    </div>
  );
};

export default Home;
