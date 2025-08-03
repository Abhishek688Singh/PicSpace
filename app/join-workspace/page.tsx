

import HeroSection from '@/components/joinHero'
import React from 'react'
import { JoinWorkspace } from '@/components/joinSinup'
import { auth } from '@/auth'

const page = async () => {
    const session = await auth();

    return (
        <div>
            <HeroSection />
            <hr />
            {session ? (<>
                <JoinWorkspace sessionDetail={session} />
            </>
            ) : (<>
                <p className='text-amber-50 text-2xl text-center py-4'>Plese login to join a Pic-Space</p>
            </>
            )}

        </div>
    )
}

export default page