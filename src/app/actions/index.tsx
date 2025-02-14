import { revalidateTag } from 'next/cache'
//chay o server
export const PostData = async (formData: FormData) => {

    const fullname = formData.get('fullname');
    const email = formData.get('email');

    console.log(fullname); console.log(email);

    const res = await fetch(`http://localhost:5051/api/ContactQuery`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    revalidateTag("list-users");
    const result = await res.json();
    console.log(result);

}