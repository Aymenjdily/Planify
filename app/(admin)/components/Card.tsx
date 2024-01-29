"use client";

import { Button } from "@/components/ui/button";
import { Task } from "@prisma/client";
import { Badge, Card, Flex } from "@radix-ui/themes";
import React, { useState, useEffect } from "react";
import { Trash, Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import TaskForm from "./Form";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  const [isDeleting, setDeleting] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [isCompleted, setCompleted] = useState(task.isCompleted);
  const router = useRouter();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await axios.delete(`/api/task/${task.id}`);
      if (response.status === 201) {
        router.refresh();
        setDeleting(false);
      }
    } catch (error) {
      router.refresh();
    }
  };

  useEffect(() => {
    const updateTask = async () => {
      setUpdating(true);

      try {
        const response = await axios.patch(`/api/task/${task.id}`, {
          isCompleted,
        });

        if (response.status === 201) {
          router.refresh();
          setUpdating(false);
        }
      } catch (error) {
        console.error("Error updating task:", error);
        router.refresh();
      }
    };

    // Check if isCompleted has changed and trigger the update
    if (isCompleted !== task.isCompleted) {
      updateTask();
    }
  }, [isCompleted, task.id, task.isCompleted, router]);

  const handleUpdate = async () => {
    // Update the state and wait for it to be updated
    setCompleted((prev) => !prev);
  };

  return (
    <Card style={{ background: "#092635" }}>
      <Flex
        direction={"column"}
        gap="6"
        justify={"between"}
        p="3"
        className="h-full"
      >
        <Flex direction={"column"} gap="2">
          <h1 className="text-white font-bold text-lg">{task.title}</h1>
          <p className="text-gray-400 text-sm">{task.description}</p>
          {task.isImportant && (
            <Flex>
              <Badge style={{ background: "#1B4242" }}>
                <Flex p="2" align={"center"} gap="2">
                  <p className="text-lightGreen">Important</p>
                </Flex>
              </Badge>
            </Flex>
          )}
        </Flex>
        <Flex align={"end"} justify={"between"} gap="3" wrap={"wrap"}>
          <Flex direction={"column"} gap="2">
            <p className="text-gray-300">{task.createdAt.toDateString()}</p>
            <Button
              className={`${
                task.isCompleted
                  ? "bg-Green hover:bg-Green"
                  : "bg-red-500 hover:bg-red-500"
              }`}
              onClick={() => handleUpdate()}
            >
              <Flex align={"center"} gap="3">
                {isUpdating && (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                )}
                {task.isCompleted ? "Completed" : "Incomplete"}
              </Flex>
            </Button>
          </Flex>
          <Flex align={"center"}>
            <TaskForm isEdit task={task} />
            <Button
              className="bg-transparent hover:bg-transparent text-gray-300 hover:text-red-500 transition-colors"
              onClick={() => handleDelete()}
            >
              {isDeleting ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Trash />
              )}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TaskCard;
