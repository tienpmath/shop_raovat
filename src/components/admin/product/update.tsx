import { handleUpdateProductAction } from "@/utils/actions";
import { Modal, Input, Form, Row, Col, message, notification } from "antd";
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
  isUpdateModalOpen: boolean;
  setIsUpdateModalOpen: (v: boolean) => void;
  dataUpdate: any;
  setDataUpdate: any;
  user: any;
}

const ProductUpdate = (props: IProps) => {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  const {
    isUpdateModalOpen,
    setIsUpdateModalOpen,
    dataUpdate,
    setDataUpdate,
    user,
  } = props;

  const [form] = Form.useForm();

  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsUpdateModalOpen(false);
  };
  const onFinish = async (values: any) => {
    values.detail = content;
    values.images = images;
    values.image = image;
    values.user = user.user.name;
    values.email = user.user.email;
    values.status = 0;
    values.active = 0;
    //const userInfo = JSON.parse(values.images);
    // console.log(values.images);
    //   console.log(values);
    //values.images = JSON.parse(values.images);
    //.console.log(values);
    //  console.log(editorRef.current.getContent());
    // console.log(values);
    const res = await handleUpdateProductAction(values);
    console.log(res);
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
    //console.log("Edited content:", content);
  };

  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
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
    if (dataUpdate) {
      //code
      form.setFieldsValue({
        name: dataUpdate.name,
        email: dataUpdate.email,
        phone: dataUpdate.phone,
        address: dataUpdate.address,
        description: dataUpdate.description,
        detail: dataUpdate.detail,
        price: dataUpdate.price,
        user: dataUpdate.user,
        image: dataUpdate.image,
        images: dataUpdate.images,
        _id: dataUpdate._id,
      });
      setImages(dataUpdate.images);
      setContent(content);
    }
  }, [dataUpdate]);

  return (
    <Modal
      title="Thêm mới sản phẩm / Dịch vụ"
      open={isUpdateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          {" "}
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
          <Form.Item
            name="_id"
            rules={[{ required: true, message: "Please input your images!" }]}
          >
            <Input type="hidden" />
          </Form.Item>
          <Col span={24}>
            <Form.Item
              label="name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="description"
              name="description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="price" name="price">
              <Input type="number" />
            </Form.Item>
          </Col>{" "}
          <Col span={24}>
            <Form.Item
              label="phone"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input type="text" defaultValue={user.phone} />
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
            <Input type="hidden" defaultValue={user.name} />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: false, message: "Please input your images!" }]}
          >
            <Input type="hidden" defaultValue={user.email} />
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
            initialValue={dataUpdate?.detail}
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

export default ProductUpdate;
