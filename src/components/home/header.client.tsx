"use client";
import { useState, useEffect } from "react";
import {
  CodeOutlined,
  ContactsOutlined,
  DashOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  RiseOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Avatar, Drawer, Dropdown, MenuProps, Space, message } from "antd";
import { Menu, ConfigProvider } from "antd";
import styles from "@/styles/client.module.scss";
import { isMobile } from "react-device-detect";
import { FaReact } from "react-icons/fa";
//import { setLogoutAction } from "@/app/redux/slice/accountSlide";
//import { callLogout } from "@/config/api";
//import { current } from "@reduxjs/toolkit";
import Link from "next/link";
//import { useLocation, useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';
//import { useAppDispatch, useAppSelector } from '@/redux/hooks';
//import { callLogout } from '@/config/api';
//import { setLogoutAction } from '@/redux/slice/accountSlide';
//import ManageAccount from './modal/manage.account';

import { signOut } from "next-auth/react";
interface IProps {
  user: any;
}
const Header = (props: IProps) => {
  const { user } = props;
  //  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  // const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
  //  const user = useAppSelector(state => state.account.user);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

  //  const [current, setCurrent] = useState('home');
  // const location = useLocation();

  const [openMangeAccount, setOpenManageAccount] = useState<boolean>(false);

  //   useEffect(() => {
  //     // setCurrent(location.pathname);
  //   }, [location]);

  const items: MenuProps["items"] = [
    {
      label: <Link href={"/"}>Trang Chủ</Link>,
      key: "/",
      icon: <TwitterOutlined />,
    },
    {
      label: <Link href={"/viec-lam"}>Việc Làm</Link>,
      key: "/job",
      icon: <CodeOutlined />,
    },
    {
      label: <Link href={"/nha-dat"}>Nhà đất</Link>,
      key: "/Nhà đất",
      icon: <RiseOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    //   setCurrent(e.key);
  };

  // const handleLogout = async () => {
  //   //const res = await callLogout();
  //   // if (res && res.data) {
  //   //   // dispatch(setLogoutAction({}));
  //   //   message.success("Đăng xuất thành công");
  //   //   // navigate('/')
  //   // }
  // };

  const itemsDropdown = [
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => setOpenManageAccount(true)}
        >
          Quản lý tài khoản
        </label>
      ),
      key: "manage-account",
      icon: <ContactsOutlined />,
    },
    {
      label: <Link href={"/dashboard"}>Trang Quản Trị</Link>,
      key: "admin",
      icon: <DashOutlined />,
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => signOut()}>
          Đăng xuất
        </label>
      ),
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  const itemsMobiles = [...items, ...itemsDropdown];

  return (
    <>
      <div className={styles["header-section"]}>
        <div className={styles["container"]}>
          {!isMobile ? (
            <div style={{ display: "flex", gap: 30 }}>
              <div className={styles["brand"]}>
                <FaReact title="Hỏi Dân IT" />
              </div>
              <div className={styles["top-menu"]}>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#fff",
                      colorBgContainer: "#222831",
                      colorText: "#a7a7a7",
                    },
                  }}
                >
                  <Menu
                    // onClick={onClick}
                    selectedKeys={[]}
                    mode="horizontal"
                    items={items}
                  />
                </ConfigProvider>
                <div className={styles["extra"]}>
                  {!user ? (
                    <Link href={"/auth/login"}>Đăng Nhập</Link>
                  ) : (
                    <Dropdown
                      menu={{ items: itemsDropdown }}
                      trigger={["click"]}
                    >
                      <Space style={{ cursor: "pointer" }}>
                        <span>Welcome {user?.email}</span>
                        <Avatar>
                          {" "}
                          {user?.email?.substring(0, 2)?.toUpperCase()}{" "}
                        </Avatar>
                      </Space>
                    </Dropdown>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles["header-mobile"]}>
              <span>Your APP</span>
              <MenuFoldOutlined onClick={() => setOpenMobileMenu(true)} />
            </div>
          )}
        </div>
      </div>
      <Drawer
        title="Chức năng"
        placement="right"
        onClose={() => setOpenMobileMenu(false)}
        open={openMobileMenu}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[]}
          mode="vertical"
          items={itemsMobiles}
        />
      </Drawer>
      {/* <ManageAccount
                open={openMangeAccount}
                onClose={setOpenManageAccount}
            /> */}
    </>
  );
};

export default Header;
