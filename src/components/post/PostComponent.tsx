"use client";
//import { useQueryClient } from '@tanstack/react-query'
//import { useForm } from 'react-hook-form'
//import { useToast } from "../ui/use-toast";
import CreatePostComponent from "./create";

export const PostComponent = (user: any) => {
  const u1 = user;
  // console.log(prop);
  //const { data, isLoading, isError } = useProfile()
  //const { handleSubmit, register } = useForm()
  //const { toast } = useToast()
  //const queryClient = useQueryClient()

  // const onSubmit = async (data: UpdateProfileDto) => {
  //   try {
  //     // await profileUpdate({ requestBody: data })
  //     toast({
  //       title: 'Success',
  //       description: 'Profile has been updated successfully.',
  //       variant: 'default',
  //     })
  //     queryClient.invalidateQueries({ queryKey: [QueryNames.GetProfile] })
  //   } catch (err: unknown) {
  //     if (err instanceof Error) {
  //       toast({
  //         title: 'Failed',
  //         description: "Profile update wasn't successful.",
  //         variant: 'destructive',
  //       })
  //     }
  //   }
  // }

  // if (isLoading) return <Loader />
  // if (isError) return <Error />

  return (
    <section className="mt-0 bg-white-100">
      <CreatePostComponent info={u1} />
    </section>
  );
};
