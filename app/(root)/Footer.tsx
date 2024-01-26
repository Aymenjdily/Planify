import { Flex } from '@radix-ui/themes'
import React from 'react'
import Image from "next/image";
import Link from 'next/link';

const Footer = () => {
  return (
    <Flex px="5" className='mx-auto max-w-7xl' align={"center"} justify={"between"} py="6" gap="5">
        <Flex className="relative w-32 h-16">
            <Image src="/logo/logo-green.svg" alt="Planify" fill quality={100} />
        </Flex>
        <p>
            &copy; 2024 All Right Reserved. <Link href="https://www.aymenjdily.com" className='underline underline-offset-8 text-Green'>Aymenjdily.com</Link>
        </p>
    </Flex>
  )
}

export default Footer