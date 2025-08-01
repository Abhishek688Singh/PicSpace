"use client"

import HeroSection from '@/components/joinHero'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Dashboard from './dashboard'

const page = () => {
    return (
        <div>
            <HeroSection />
            <SessionProvider>
                <Dashboard />
            </SessionProvider>
        </div>
    )
}

export default page