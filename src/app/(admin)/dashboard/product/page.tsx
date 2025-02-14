import { auth } from "@/auth";
import ProductsTable from "@/components/admin/product.table";
import { sendRequest } from "@/utils/api";

interface IProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
const ManageProductPage = async (props: IProps) => {
  //console.log(props);
  const current = 1; //props?.searchParams?.current ?? 1;
  const pageSize = 20; //props?.searchParams?.pageSize ?? 10;
  const session = await auth();
  const email = session?.user?.email;

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products/admin`,
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
      next: { tags: ["list-products"] },
    },
  });

  return (
    <div>
      <ProductsTable
        blogs={res?.data?.results ?? []}
        meta={res?.data?.meta}
        user={session}
      />
    </div>
  );
};

export default ManageProductPage;
