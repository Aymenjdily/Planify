import { Flex } from '@radix-ui/themes'
import React from 'react'
import { Button } from '@/components/ui/button'
import TaskForm from '../components/Form'

const DashboardPage = () => {
  return (
    <Flex className="bg-black/20 rounded-2xl border border-blackColor min-h-screen w-full" direction={"column"} p="5">
      <Flex align={"center"} justify={"between"}>
        <Flex direction={"column"} gap="2">
          <h1 className='font-bold text-white text-2xl'>
            All Tasks
          </h1>
          <div className=' w-12 h-[2px] bg-lightGreen' />
        </Flex>
        <TaskForm />
      </Flex>
    </Flex>
  )
}

export default DashboardPage