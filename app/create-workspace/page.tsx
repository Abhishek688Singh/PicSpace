
import { auth } from "@/auth"
import { CanvasRevealEffectDemo } from "@/components/canvas";
import { redirect } from "next/navigation";


export default async function UserAvatar() {
  const session = await auth()
  // console.log(session);

  if (!session?.user) {
    redirect("/login");
  }
  return (
    <>

      <CanvasRevealEffectDemo />
    </>
  )
}