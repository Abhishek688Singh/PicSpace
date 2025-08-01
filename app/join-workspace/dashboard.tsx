"use client"
import { JoinWorkspace } from "@/components/joinSinup"
import { useSession } from "next-auth/react"

export default function Dashboard() {
    const { data: session } = useSession()
    // console.log(session);
    if (session) {
        return (<>
            <JoinWorkspace sessionDetail={session} />

        </>)
    }

    return <p>You are not authorized to view this page! Plese login to view this page</p>
}