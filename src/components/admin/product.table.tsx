"use client";
import { handleDeleteProductAction } from "@/utils/actions";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import ProductCreate from "./product/create";
import ProductUpdate from "./product/update";
interface IProps {
  blogs: any;
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  user: any;
}
const ProductsTable = (props: IProps) => {
  const { blogs, meta, user } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<any>(null);

  const columns = [
    {
      title: "STT",
      render: (_: any, record: any, index: any) => {
        return <>{index + 1 + (meta.current - 1) * meta.pageSize}</>;
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (t: any, r: any) => (
        <Image
          src={`https://file.raovatlamdong.vn/images/${
            r.image ? r.image : "d35a27ba-cc2e-4689-966b-e302402bfefe.jpg"
          }`}
          alt="alt"
          width={60}
          height={50}
        />
      ),
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "Actions",

      render: (text: any, record: any, index: any) => {
        return (
          <>
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer", margin: "0 20px" }}
              onClick={() => {
                setIsUpdateModalOpen(true);
                setDataUpdate(record);
              }}
            />

            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa Sản phẩm"}
              description={"Bạn có chắc chắn muốn xóa Sản phẩm này ?"}
              onConfirm={async () =>
                await handleDeleteProductAction(record?._id)
              }
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer" }}>
                <DeleteTwoTone twoToneColor="#ff4d4f" />
              </span>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("current", pagination.current);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <span>Quản lý sản phẩm / Dịch vụ</span>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Post</Button>
      </div>
      <Table
        bordered
        dataSource={blogs}
        columns={columns}
        rowKey={"_id"}
        pagination={{
          current: meta.current,
          pageSize: meta.pageSize,
          showSizeChanger: true,
          total: meta.total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />
      <ProductCreate
        user={user}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
      {/* <BlogPostCreate
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />
*/}
      <ProductUpdate
        user={user}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default ProductsTable;
