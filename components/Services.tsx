import { ServicesContent } from '@/constants'
import { Flex, Grid, Card } from '@radix-ui/themes'
import React from 'react'

const Services = () => {
  return (
    <Flex py="9" px="5" className='mx-auto max-w-7xl' direction={"column"} gap="6" id="services">
        <h1 className='font-semibold text-center text-4xl'>
            Our focus
        </h1>
        <Grid columns={{ lg: "3", md:"2", initial:"1" }} gap="8" mt="7">
            {
                ServicesContent.map((service) => (
                    <Card key={service.label} className='p-5'>
                        <Flex direction={"column"} gap="3">
                            <Flex className='text-[50px] rounded-full'>
                                <service.icon />
                            </Flex>
                            <h1 className='font-bold text-xl'>
                                {service.label}
                            </h1>
                            <p className='text-gray-500'>
                                {service.description}
                            </p>
                        </Flex>
                    </Card>
                ))
            }
        </Grid>
    </Flex>
  )
}

export default Services