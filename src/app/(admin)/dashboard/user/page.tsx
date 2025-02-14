import { auth } from "@/auth";
import UserTable from "@/components/admin/user.table";
import { sendRequest } from "@/utils/api";

// interface IProps {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }
const ManageUserPage = async (props: any) => {
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;
  const session = await auth();
  const email = session?.user?.email;
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/admin`,
    method: "GET",
    queryParams: {
      email,
      current,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-users"] },
    },
  });
  //console.log(res?.data?.result);
  return (
    <div>
      <UserTable users={res?.data?.result ?? []} meta={res?.data?.meta} />
    </div>
  );
};

export default ManageUserPage;
