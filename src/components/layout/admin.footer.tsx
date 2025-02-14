"use client";
import { Layout } from "antd";

const AdminFooter = () => {
  const { Footer } = Layout;

  return (
    <>
      <Footer style={{ textAlign: "center" }}>
        ICT ĐÀ LẠT ©{new Date().getFullYear()} Created by @tiendev
      </Footer>
    </>
  );
};

export default AdminFooter;
