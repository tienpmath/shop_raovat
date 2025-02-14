"user client";
import { addQuery } from "@/app/actions/AddQuery";

import axios from "axios";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];
const CreatePostComponent = (prop: any) => {
  //console.log(prop);
  const [data, setData] = useState();
  const receivedDataHandler = (data: any) => {
    setData(data);
  };
  const [file, setFile] = useState(null);
  const [urlImage, setUrlImages] = useState("");

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
      setUrlImages(res.data);

      //props.sendDataToParent(res)
    } catch (ex) {
      console.log(ex);
    }
  };
  //const [dataUser, setDataUser] = useState<ApplicationConfigurationDto>()
  useEffect(() => {
    (async () => {
      // const appConfig = await abpApplicationConfigurationGet();
      // setDataUser(appConfig);
    })();
  }, []);
  // console.log(useCurrentUser)

  return (
    <>
      {1 ? (
        <div className="container">
          <div className="mb-5">
            <pre>{JSON.stringify(prop.info.user, null, 2)}</pre>
          </div>
          <hr />
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
          <h2>Các file Ảnh đã Upload: {urlImage}</h2>
          <hr />
          <form className="space-y-8" action={addQuery} method="POST">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                Chọn Danh Mục
                <select
                  name="categoryId"
                  id="categoryId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={1} selected>
                    Đà Lạt
                  </option>
                  <option value={2}>Đức Trọng</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
              <div>
                <label
                  id="locationId"
                  htmlFor="locationId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Chọn Danh Mục
                </label>
                <select
                  name="locationId"
                  id="locationId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={1} selected>
                    Bất động sản
                  </option>
                  <option value={2}>Việc làm</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <label>Nhập tiêu đề *</label>
              <Input
                id="name"
                name="name"
                type="text"
                defaultValue=""
                required
                placeholder="Tiêu đề"
              />
            </div>{" "}
            <div className="grid w-full items-center gap-1.5">
              {" "}
              <label>Nhập mô tả chi tiết * </label>
              <Input
                id="description"
                name="description"
                defaultValue=""
                required
                placeholder="Mô tả"
              />{" "}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <label>Nhập giá * | Nhập 0 là thương lượng giá</label>
              <Input
                id="price"
                type="number"
                name="price"
                defaultValue="0"
                required
                placeholder="giá"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <label>Nhập số điện thoại * </label>
              <Input
                id="phone"
                type="number"
                name="phone"
                defaultValue={0}
                required
                placeholder="Số điện thoại"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <label>Nhập địa chỉ liên hệ * </label>
              <Input
                id="address"
                type="text"
                defaultValue=""
                required
                name="address"
                placeholder="Địa chỉ liên hệ * "
              />{" "}
            </div>
            <Input
              id="seller"
              name="seller"
              value={prop.info.user.name}
              required
              readOnly
              placeholder="Người bán"
            />
            <Input
              id="Email"
              name="Email"
              value={prop.info.user.email}
              required
              readOnly
              placeholder="Email"
            />
            <Input id="image" name="image" type="hidden" value={urlImage} />
            <Button type="primary">Đăng bài ngay - Miễn phí !</Button>
          </form>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              label={null}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <h2>Bạn chưa đăng nhập ? vui lòng đăng nhập nhé</h2>
      )}
    </>
  );
};

export default CreatePostComponent;
