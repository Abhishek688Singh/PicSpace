

// import S2ignUpForm from '@/components/2signup-form-demo' //com.txt component
import { auth } from '@/auth';
import NewWorkspace from '@/components/new-workspace'
import { redirect } from 'next/navigation';
import React from 'react'

const LoginPage = async () => {
  const session = await auth()
    // console.log(session);
  
    if (!session?.user) {
      redirect("/login");
    }
  return (
    <>
    <NewWorkspace />
    </>
  )
}

export default LoginPage