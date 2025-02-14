"use client";
import React from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  notification,
  Row,
  Select,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";
const { Option } = Select;
const Register = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { name, email, password, phone, gender, address } = values;
    //const { email, password, name } = values;
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`,
      method: "POST",
      body: {
        name,
        email,
        password,
        phone,
        gender,
        address,
      },
    });
    console.log(res?.data);
    if (res?.data) {
      router.push(`/verify/${res?.data?._id}`);
    } else {
      notification.error({
        message: "Register error",
        description: res?.message,
      });
    }
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Đăng Ký Tài Khoản</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Họ tên"
              name="name"
              rules={[
                { required: true, message: "Họ tên không được để trống!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email không được để trống!" },
              ]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Mật khẩu không được để trống!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }} //whole column
              name="gender"
              label="Giới tính"
              rules={[
                { required: true, message: "Giới tính không được để trống!" },
              ]}
            >
              <Select
                // placeholder="Select a option and change input text above"
                // onChange={onGenderChange}
                allowClear
              >
                <Option value="male">Nam</Option>
                <Option value="female">Nữ</Option>
                <Option value="other">Khác</Option>
              </Select>
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Địa chỉ"
              name="address"
              rules={[
                { required: true, message: "Địa chỉ không được để trống!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Link href={"/"}>
            <ArrowLeftOutlined /> Quay lại trang chủ
          </Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Đã có tài khoản? <Link href={"/auth/login"}>Đăng nhập</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default Register;
