import { Box, Flex } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Intro = () => {
  return (
    <Box className="bg-intro">
      <Flex
        className="mx-auto max-w-7xl "
        justify={"center"}
        align={"center"}
        px="5"
        py="9"
        direction={"column"}
        gap="5"
      >
        <Image
          src="/logo/logo-green.svg"
          alt="Planify"
          width={200}
          height={100}
          quality={100}
        />
        <h1 className="text-center flex items-center flex-col gap-5 lg:text-7xl text-5xl font-bold text-white">
          The first <br /> Task Management <br />{" "}
        </h1>
        <p className="text-gray-300 text-xl text-center">
          Planify: Your sleek and simple to-do app. Effortlessly organize tasks,
          <br />
          set priorities, and boost productivity. Stay on top of your
          commitments with ease.
        </p>
        <Flex align={"center"} gap="3">
            <Button className="bg-blackColor font-semibold">
                Request demo
            </Button>
            <Button className="bg-white text-Green hover:bg-blackColor font-semibold">
                Give us a feedback
            </Button>
        </Flex>
        <Flex className="relative w-full h-[40vh] rounded-2xl">
            <Image src="/app.png" alt="app" fill className=" object-cover rounded-2xl" quality={100} />
        </Flex>
        <p className="text-gray-800">
            Start your planning now, <Link href="/login" className="underline underline-offset-8">Get free account</Link>
        </p>
      </Flex>
    </Box>
  );
};

export default Intro;
