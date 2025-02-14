import React from "react";
import { Spin } from "antd";

const Loading: React.FC = () => {
  return (
    <>
      <div className="text-center mt-20">
        <Spin />
      </div>
    </>
  );
};

export default Loading;
