import { Box, Flex } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { MotionDiv } from "./MotionDiv";

const Intro = () => {
  return (
    <Box className="bg-blackColor">
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
          <Link href="/login">
            <Button className="bg-lightGreen text-blackColor hover:bg-Green font-semibold shadow-lg">
              Login
            </Button>
          </Link>
          <Link href="/Signup">
            <Button className="bg-white text-Green hover:bg-blackColor font-semibold shadow-lg">
              Get Free Account
            </Button>
          </Link>
        </Flex>
        <Flex className="relative w-full h-[70vh] rounded-2xl">
          <Image
            src="/intro.jpg"
            alt="app"
            fill
            className="object-cover rounded-2xl shadow-lg"
            quality={100}
          />
          <Box className="absolute w-full h-full bg-blackColor/30" />
        </Flex>
        <p className="text-gray-200">
          Start your planning now,{" "}
          <Link
            href="/login"
            className="underline underline-offset-8 text-lightGreen"
          >
            Get free account
          </Link>
        </p>
      </Flex>
    </Box>
  );
};

export default Intro;
