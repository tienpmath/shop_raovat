import { auth } from "@/auth";
import HomePage from "@/components/layout/homepage";
import Link from "next/link";

import { Divider } from "antd";
import JobCard from "@/components/home/job.card";
import { sendRequest } from "@/utils/api";
import Header from "@/components/home/header.client";

interface IProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    current: string;
    [key: string]: string | string[] | undefined;
  }>;
}
const Home = async (props: IProps) => {
  //console.log(props);
  const current = (await props?.searchParams).current ?? 1;
  const pageSize = 30; //props?.searchParams?.pageSize ?? 10;
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products`,
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-products"] },
    },
  });
  //console.log(res?.data?.results);
  return (
    <div>
      <Header user={session?.user} />
      <div className="search-content" style={{ marginTop: 20 }}>
        {/* <SearchClient /> */}
      </div>
      <Divider />
      {/* <CompanyCard /> */}
      <div style={{ margin: 50 }}></div>
      <Divider />
      <JobCard datas={res?.data?.results ?? []} meta={res?.data?.meta} />
    </div>
  );
};

export default Home;
