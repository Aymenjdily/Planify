import { Flex } from '@radix-ui/themes'
import React from 'react'
import Image from "next/image";
import LoginForm from './components/Form';

const LoginPage = () => {
  return (
    <Flex
      className="min-h-screen bg-blackColor"
      px="5"
      justify={"center"}
      align={"center"}
      gap="6"
      py="9"
      direction={"column"}
    >
      <Image src="/logo/logo-green.svg" alt="planify" width={150} height={150} />
      <LoginForm />
    </Flex>
  )
}

export default LoginPage