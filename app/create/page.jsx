import { auth } from '@/auth'
import { redirect } from 'next/navigation';


const Page = async() => {
  const session = await auth();

  if(!session) redirect("/")

  return (
    <div>
      <form action="">
        <label htmlFor="">Title</label>
        <input type="text" name="title" id="" />

        <label htmlFor="">Description</label>
        <input type="text" name='description' />

        <label htmlFor="">Category</label>
        <input type="text" name='Category' />
      </form>
    </div>
  )
}

export default Page