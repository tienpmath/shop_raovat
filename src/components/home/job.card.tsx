"use client";
import { callFetchJob } from "@/config/api";
import { LOCATION_LIST, convertSlug, getLocationName } from "@/config/utils";
import { IJob } from "@/types/backendT";
import { EnvironmentOutlined, ThunderboltOutlined } from "@ant-design/icons";
import { Card, Col, Empty, Pagination, Row, Spin } from "antd";
import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
//import { Link, useNavigate } from "react-router-dom";
import styles from "@/styles/client.module.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
//import { useRouter } from "next/router";
dayjs.extend(relativeTime);
import type { PaginationProps } from "antd";
import Image from "next/image";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

interface IProps {
  showPagination?: boolean;
}

interface IPropss {
  datas: any;
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
}
const JobCard = (props: IPropss) => {
  const { datas, meta } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  //const { replace } = useRouter();
  // console.log(datas);
  const router = useRouter();
  //const { showPagination = false } = props;

  const [displayJob, setDisplayJob] = useState<IJob[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");
  //const navigate = useNavigate();

  const [dataT, setDataT] = useState([]);
  useEffect(() => {
    // fetchJob();
    // if (dataT.length == 0) {
    //   setDataT(datas);
    // }
    //console.log(dataT);
  }, [current, pageSize, filter, sortQuery]);

  const fetchJob = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await sendRequest<IBackendRes<any>>({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`,
      method: "GET",
      queryParams: {
        current,
        pageSize,
      },
      nextOption: {
        next: { tags: ["list-products"] },
      },
    });
    console.log(res.data);

    //const res = await callFetchJob(query);
    if (res && res.data.results) {
      setDataT(res.data.results);
      setDisplayJob(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  // const handleOnchangePage = (pagination: {
  //   current: number;
  //   pageSize: number;
  // }) => {
  //   if (pagination && pagination.current !== current) {
  //     setCurrent(pagination.current);
  //   }
  //   if (pagination && pagination.pageSize !== pageSize) {
  //     setPageSize(pagination.pageSize);
  //     setCurrent(1);
  //   }
  // };

  const handleViewDetailJob = (item: IJob) => {
    const slug = convertSlug(item.name);
    //navigate(`/job/${slug}?id=${item._id}`);
  };
  //const [current, setCurrent] = useState(3);

  const onChange: PaginationProps["onChange"] = (page) => {
    //console.log(page);
    setCurrent(page);
    console.log(page);
    router.push(`?current=${page}`);
  };

  return (
    <div className={`${styles["card-job-section"]}`}>
      <div className={`${styles["job-content"]}`}>
        <Spin spinning={isLoading} tip="Loading...">
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <div
                className={
                  isMobile ? styles["dflex-mobile"] : styles["dflex-pc"]
                }
              >
                <Col className={styles["title"]}>
                  <h2>Tin mới đăng</h2>
                </Col>
                {/* {!showPagination && <Link href="job">Xem tất cả</Link>} */}
              </div>
            </Col>

            {datas?.map((item: any) => {
              return (
                <Col span={24} md={12} key={item._id}>
                  <Link href={item.slug}>
                    <Card
                      size="small"
                      title={null}
                      hoverable
                      onClick={() => handleViewDetailJob(item)}
                    >
                      <div className={styles["card-job-content"]}>
                        <div>
                          <Image
                            src={`https://file.raovatlamdong.vn/images/${
                              item?.image
                                ? item.image
                                : "d35a27ba-cc2e-4689-966b-e302402bfefe.jpg"
                            }`}
                            alt="alt"
                            width={0}
                            height={0}
                            sizes="100vw"
                            style={{ width: 120, height: "auto" }} // optional
                          />
                        </div>
                        <div className={styles["card-job-right"]}>
                          <div className={styles["job-title"]}>{item.name}</div>
                          <div className={styles["job-location"]}>
                            <EnvironmentOutlined style={{ color: "#58aaab" }} />
                            {item.location == "1" ? " Đà Lạt" : " All"} - &nbsp;
                            {"0" + item.phone}
                          </div>
                          <div>
                            <ThunderboltOutlined style={{ color: "orange" }} />
                            &nbsp;
                            {(item.price + "")?.replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}{" "}
                            đ
                          </div>
                          <div className={styles["job-updatedAt"]}>
                            {dayjs(item.updatedAt).fromNow()}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </Col>
              );
            })}

            {(!displayJob || (displayJob && displayJob.length === 0)) &&
              !isLoading && (
                <div className={styles["empty"]}>
                  <Empty description="Không có dữ liệu" />
                </div>
              )}
          </Row>
          {
            <>
              <div style={{ marginTop: 30 }}></div>
              {/* <Row style={{ display: "flex", justifyContent: "center" }}>
                <Pagination
                  current={meta.current}
                  total={meta.total}
                  pageSize={2}
                  responsive
                  onChange={(p: number, s: number) =>
                    handleOnchangePage({ current: p, pageSize: s })
                  }
                />
              </Row> */}
              <Pagination
                align="center"
                current={current}
                onChange={onChange}
                total={50}
              />
            </>
          }
        </Spin>
      </div>
    </div>
  );
};

export default JobCard;
