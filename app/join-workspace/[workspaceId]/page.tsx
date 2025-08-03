import { auth } from '@/auth';
import GlowCard from '@/components/detailType';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: { 'workspace-id': string } }) => {

     const { workspaceId } = params;


    const session = await auth();
    const memberFriendId = session?.user.id;

    if (!session) redirect("/login")

    return (
        <div className=' h-[100vh]'>
            <div className='flex flex-row gap-20 items-center
             justify-center pt-[150] flex-wrap'>

                <GlowCard>
                    <Link href={`${workspaceId}/${memberFriendId}/note`}>
                        <div className="text-white">
                            <h3 className="text-4xl font-bold mb-2">Ideas</h3>
                            <p className="text-gray-300">Tap to view all the Ideas and Plans.</p>
                        </div></Link>
                </GlowCard>

                <GlowCard>
                    <Link href={`${workspaceId}/${memberFriendId}/images`}>
                        <div className="text-white">
                            <h3 className="text-4xl font-bold mb-2">Images</h3>
                            <p className="text-gray-300">Tap to view all the Images.</p>
                        </div></Link>
                </GlowCard>

                {/* <GlowCard>
                    <Link href={`details/video`}>
                        <div className="text-white">
                            <h3 className="text-4xl font-bold mb-2">Videos</h3>
                            <p className="text-gray-300">Tap to view all the Videos</p>
                        </div></Link>
                </GlowCard> */}
            </div>
        </div>
    )
}

export default page