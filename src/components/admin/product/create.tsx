"use client";
import { handleCreateProductAction } from "@/utils/actions";
import {
  Modal,
  Input,
  Form,
  Row,
  Col,
  message,
  notification,
  Select,
} from "antd";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];
interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
  user: any;
}

const ProductCreate = (props: IProps) => {
  const [content, setContent] = useState("1");
  const [category, setCategory] = useState("nha-dat");
  const [location, setLocation] = useState("da-lat");
  const editorRef = useRef(null);

  const { isCreateModalOpen, setIsCreateModalOpen, user } = props;
  //console.log("1", user);
  const [form] = Form.useForm();
  const [phone, setPhone] = useState();
  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };
  const onFinish = async (values: any) => {
    // console.log(values);
    values.category = category;
    values.location = location;

    values.detail = content;
    values.images = images;
    values.image = image;
    values.user = user.user.name;
    values.email = user.user.email;
    values.phone = user.user.phone;
    values.status = 0;
    values.active = 0;
    //const userInfo = JSON.parse(values.images);
    // console.log(values.images);
    //   console.log(values);
    //values.images = JSON.parse(values.images);
    //.console.log(values);
    //  console.log(editorRef.current.getContent());
    console.log(values);
    const res = await handleCreateProductAction(values);
    if (res?.data) {
      handleCloseCreateModal();
      message.success("Create succeed!");
    } else {
      notification.error({
        message: "Create User error",
        description: res?.message,
      });
    }
  };
  const handleEditorChange = (content: any) => {
    setContent(content);
    console.log("Edited content:", content);
  };
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  const handleChangeCategory = (value: string) => {
    setCategory(value);
  };

  const handleChangeLocation = (value: string) => {
    setLocation(value);
  };

  const handleChange = async (file: any) => {
    setFile(file);
    const formData = new FormData();
    var i = 0;
    for (const uploadedFile of file) {
      //make a bew FormData for every file.
      formData.append("ImageFile", file[i]);
      i++;
      if (i == 5) break;
    }
    //console.log(formData)
    try {
      const res = await axios.post(
        "https://file.raovatlamdong.vn/addImages",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      setImages(res.data);
      setImage(res.data[0]);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    setPhone(user.user.phone);
  });
  return (
    <Modal
      title="Thêm mới sản phẩm / Dịch vụ"
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <FileUploader
              label="Upload hình ảnh ! Tối đa 5 hình"
              active="true"
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              multiple={true}
              onSizeError="false"
              onTypeError="false"
              error={fileTypes ? fileTypes : undefined}
            />
            <h2>
              {images?.map((item, index) => (
                <Image
                  key={index}
                  src={"https://file.raovatlamdong.vn/images/" + item}
                  alt="alt"
                  width={100}
                  height={100}
                />
              ))}
            </h2>
            <hr />
          </Col>
          <Col span={24}>
            Khu vực
            <Select
              defaultValue="da-lat"
              style={{ width: 150 }}
              onChange={handleChangeLocation}
              options={[
                { value: "da-lat", label: "Đà Lạt" },
                { value: "bao-loc", label: "Bảo Lộc" },
                { value: "duc-trong", label: "Đức Trọng" },
                { value: "di-linh", label: "Di Linh" },
                { value: "lam-ha", label: "Lâm Hà" },
                { value: "don-duong", label: "Đơn Dương" },
                { value: "lac-duong", label: "Lạc Dương" },
                { value: "dam-rong", label: "Đam Rông" },
                { value: "bao-lam", label: "Bảo Lâm" },
                { value: "Da-huoai", label: "Đạ Huoai" },
              ]}
            />
            Danh mục
            <Select
              defaultValue="nha-dat"
              style={{ width: 150 }}
              onChange={handleChangeCategory}
              options={[
                { value: "nha-dat", label: "Nhà đất" },
                { value: "oto-xe-may", label: "Ô tô - Xe máy" },
                { value: "tuyen-dung", label: "Tuyển dụng" },
                { value: "dich-vu", label: "Dịch vụ" },
                { value: "cho-tang", label: "Cho tặng" },
                { value: "dich-vu", label: "Khác" },
              ]}
            />
          </Col>
          <Col span={24}>
            <Form.Item
              label="name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Nhập tiêu đề từ 10 đến 100 ký tự!",
                  max: 100,
                  min: 10,
                },
              ]}
            >
              <Input type="text" minLength={10} maxLength={100} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="description"
              name="description"
              rules={[
                { required: true, message: "Nhập mô tả từ 10 đến 200 ký tự!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="price" name="price">
              <Input type="number" defaultValue={0} value={0} />
            </Form.Item>
          </Col>{" "}
          <Col span={24}>
            <Form.Item
              label="phone"
              name="phone"
              rules={[{ required: false, message: "Please input your phone!" }]}
            >
              {user.user.phone}
              <Input type="hidden" defaultValue={phone} />
            </Form.Item>
          </Col>
          <Form.Item name="detail">
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            name="image"
            rules={[{ required: false, message: "Please input your image!" }]}
          >
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            name="images"
            rules={[{ required: false, message: "Please input your images!" }]}
          >
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            name="user"
            rules={[{ required: false, message: "Please input your images!" }]}
          >
            <Input type="hidden" defaultValue={user.user.name} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: false, message: "Please input your images!" }]}
          >
            <Input type="hidden" defaultValue={user.user.email} />
          </Form.Item>
          <Form.Item
            name="status"
            rules={[{ required: false, message: "Please input your images!" }]}
          >
            <Input type="hidden" defaultValue={0} />
          </Form.Item>
          <Form.Item
            name="active"
            rules={[{ required: false, message: "Please input your images!" }]}
          >
            <Input type="hidden" defaultValue={0} />
          </Form.Item>
          <Editor
            apiKey="cqin9xjepke2xb6a9rtqbj4263c47xen8hwuw3viahfm05bi"
            initialValue="<p>Nhập nội dung...</p>"
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={handleEditorChange}
          />
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductCreate;
