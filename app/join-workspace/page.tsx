

import HeroSection from '@/components/joinHero'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Dashboard from './dashboard'
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