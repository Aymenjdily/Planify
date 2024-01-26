import { Flex } from "@radix-ui/themes";
import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <Flex py="9" px="5" className="mx-auto max-w-7xl" align={"center"} direction={{ md:"row", initial: "column" }} gap="9">
      <Flex direction={"column"} gap="5">
        <h1 className="font-bold text-4xl">Manage and make your task <br /> management</h1>
        <p className="max-w-xl text-gray-500">
          Welcome to Planify, where efficiency meets simplicity in task
          management. Our user-friendly to-do app empowers you to effortlessly
          organize your responsibilities, set priorities, and track progress
          towards your goals. With an intuitive interface and customizable
          features, Planify ensures a seamless planning experience, whether
          you're tackling work projects or managing personal tasks. Prioritize
          your productivity and conquer your to-do list with Planify by your
          side. 
            <br />
          At Planify, we believe in more than just task management – we're
          your reliable support system. Enjoy free access to our app and
          experience responsive service and seamless communication. Connect
          effortlessly, conquer your goals, and let Planify transform the way
          you approach productivity.
        </p>
      </Flex>
      <Image src="/about.png" alt="about" width={500} height={500} quality={100} />
    </Flex>
  );
};

export default About;
