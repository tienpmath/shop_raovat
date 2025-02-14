import { auth } from "@/auth";
import BlogPostTable from "@/components/admin/blog-post.table";

import { sendRequest } from "@/utils/api";

// interface IProps {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }
const BlogPostPage = async (props: any) => {
  // const id = props.params.id;
  const current = props?.searchParams?.current ?? 1;
  const pageSize = props?.searchParams?.pageSize ?? 10;
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog-posts`,
    method: "GET",
    queryParams: {
      current,
      pageSize,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-blog-posts"] },
    },
  });
  //console.log(res?.data?.results);

  return (
    <div>
      <BlogPostTable blogs={res?.data?.results ?? []} meta={res?.data?.meta} />
    </div>
  );
};

export default BlogPostPage;
