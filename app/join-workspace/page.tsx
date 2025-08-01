

import HeroSection from '@/components/joinHero'
import React from 'react'
import { JoinWorkspace } from '@/components/joinSinup'
import { auth } from '@/auth'

const page = async () => {
    const session = await auth();

    return (
        <div>
            <HeroSection />

            {session ? (<>
                <JoinWorkspace sessionDetail={session} />
            </>
            ) : (<>
                <p>You are not authorized to view this page! Plese login to view this page</p>
            </>
            )}

        </div>
    )
}

export default page