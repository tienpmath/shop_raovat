import Verify from "@/components/auth/verify";

const VerifyPage = async (props: any) => {
  // const { id } = params;
  const slug = (await props.params).slug;
  //const slug = params.slug;

  //const t = await params;
  // console.log(slug);
  //console.log(params);
  return (
    <>
      <Verify id={slug} />
    </>
  );
};

export default VerifyPage;
