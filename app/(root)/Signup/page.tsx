import React from "react";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import SignupForm from "./components/Form";

const SignupPage = () => {
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
      <SignupForm />
    </Flex>
  );
};

export default SignupPage;
