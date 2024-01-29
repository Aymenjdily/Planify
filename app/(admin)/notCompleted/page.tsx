import { Flex } from "@radix-ui/themes";
import React from "react";
import TaskForm from "../components/Form";
import prisma from "@/prisma/client";
import CardsContainer from "../components/CardsContainer";

const NotCompletedPage = async () => {
  const tasks = await prisma.task.findMany({
    include: {
      user: true,
    },
    where: {
      isCompleted: false,
    },
  });
  return (
    <Flex
      className="bg-black/20 rounded-2xl border border-blackColor min-h-screen w-full"
      direction={"column"}
      p="5"
      gap="5"
    >
      <Flex align={"center"} justify={"between"}>
        <Flex direction={"column"} gap="2">
          <h1 className="font-bold text-white text-2xl">InComplete Tasks</h1>
          <div className=" w-12 h-[2px] bg-lightGreen" />
        </Flex>
        <TaskForm />
      </Flex>
      <CardsContainer tasks={tasks!} />
    </Flex>
  );
};

export default NotCompletedPage;
