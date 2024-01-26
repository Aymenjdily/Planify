import React from 'react'
import { Flex } from '@radix-ui/themes'
import Image from 'next/image'
import { Button } from './ui/button'

const Banner = () => {
  return (
    <Flex px="5" mx={{ md:"auto", initial: "5" }} py={{ md:"0", initial:"5" }} className="mx-auto max-w-7xl bg-banner rounded-2xl" gap="5" justify={"between"} align={"center"} direction={{ md:"row", initial:"column" }}>
        <Flex direction={"column"} align={"start"} gap="3" pl="5">
            <h1 className='font-bold text-white text-6xl'>
                Get your free Account
            </h1>
            <Button>
                Login Now
            </Button>
            <ul>
                <li className='text-gray-200 text-lg'>No Paymen Process needed.</li>
                <li className='text-gray-200 text-lg'>All Features are free.</li>
            </ul>
        </Flex>
        <Image src="/banner.png" alt="banner" quality={100} width={500} height={500} />
    </Flex>
  )
}

export default Banner