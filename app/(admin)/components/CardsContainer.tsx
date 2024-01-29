"use client";

import { Grid } from "@radix-ui/themes";
import React from "react";
import TaskCard from "./Card";
import { useSession } from "next-auth/react";
import { Task } from "@prisma/client";
import TaskForm from "./Form";

interface Props {
  tasks: Task[];
}

const CardsContainer = ({ tasks }: Props) => {
  const { data: session } = useSession();

  // @ts-ignore
  const userId = session?.user?.id;

  const filteredTasks = tasks.filter((task) => {
    return task.userId === userId;
  });

  return (
    <Grid columns={{ lg: "4", md: "3" }} gap="6">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task!} />
      ))}
      <TaskForm isCard />
    </Grid>
  );
};

export default CardsContainer;
