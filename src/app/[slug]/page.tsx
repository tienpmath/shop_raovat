//import { useLocation, useNavigate } from "react-router-dom";
//import { useState, useEffect } from "react";
//import { IJob } from "@/types/backend";
import { callFetchJobById } from "@/config/api";
import styles from "@/styles/client.module.scss";
import parse from "html-react-parser";
import { Col, Divider, Row, Skeleton, Tag } from "antd";
import {
  DollarOutlined,
  EnvironmentOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { getLocationName } from "@/config/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//import ApplyModal from "@/components/client/modal/apply.modal";
dayjs.extend(relativeTime);
import Image from "next/image";
import Link from "next/link";
const DetailPage = async (props: any) => {
  const sl = await props.params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/detail/${sl.slug}`,
    {
      method: "GET",
      next: { revalidate: 10000 },
    }
  );
  const data1 = await res.json();

  const data = data1.data;

  //console.log(sl.slug);
  //console.log(data);
  //const [jobDetail, setJobDetail] = useState<IJob | null>(null);
  //const [isLoading, setIsLoading] = useState<boolean>(false);

  //const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //let location = useLocation();
  //let params = new URLSearchParams(location.search);
  // const id = params?.get("id"); // job id

  //   useEffect(() => {
  //     const init = async () => {
  //       if (id) {
  //         setIsLoading(true);
  //        // const res = await callFetchJobById(id);
  //       //  if (res?.data) {
  //          // setJobDetail(res.data);
  //         //}
  //         setIsLoading(false);
  //       }
  //     };
  //     init();
  //   }, [id]);

  return (
    <div className={`${styles["container"]} ${styles["detail-job-section"]}`}>
      {/* {isLoading ? (
        <Skeleton />
      ) : ( */}
      <Row gutter={[20, 20]}>
        {data && data._id && (
          <>
            <Col span={24} md={16}>
              <div className={styles["header"]}>{data.name}</div>
              <Image
                src={`https://file.raovatlamdong.vn/images/${
                  data?.image
                    ? data.image
                    : "d35a27ba-cc2e-4689-966b-e302402bfefe.jpg"
                }`}
                alt="alt"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: 400, height: "auto" }} // optional
              />
              <div></div>
              <Divider />
              {/* <div className={styles["skills"]}>
                {jobDetail?.skills?.map((item, index) => {
                  return (
                    <Tag key={`${index}-key`} color="gold">
                      {item}
                    </Tag>
                  );
                })}
              </div> */}
              <div className={styles["salary"]}>
                <DollarOutlined />
                <span>
                  &nbsp;
                  {(data.price + "")?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
                </span>
              </div>
              <div className={styles["location"]}>
                <EnvironmentOutlined style={{ color: "#58aaab" }} />
                &nbsp;{data.location == "1" ? " Đà Lạt" : " All"}
              </div>
              <div>
                <HistoryOutlined /> {dayjs(data.updatedAt).fromNow()}
              </div>
              <Divider />
              {parse(data.detail)}
            </Col>

            <Col span={24} md={8}>
              <br />
              <div>Người đăng {data?.user}</div>
              <div className={styles["company"]}>
                <div>
                  {/* <img
                      alt="example"
                      src={`${
                        import.meta.env.VITE_BACKEND_URL
                      }/images/company/${jobDetail.company?.logo}`}
                    /> */}
                </div>
                <Link href={"tel:0a2sxrctvybuk mn A" + data.phone}>
                  <button
                    //onClick={() => setIsModalOpen(true)}
                    className={styles["btn-apply"]}
                  >
                    Phone: {"0" + data.phone}
                  </button>
                </Link>
              </div>
            </Col>
          </>
        )}
      </Row>
      {/* )} */}
      {/* <ApplyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        jobDetail={jobDetail}
      /> */}
    </div>
  );
};

export default DetailPage;
