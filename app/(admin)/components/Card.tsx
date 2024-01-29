import { Button } from "@/components/ui/button";
import { Task } from "@prisma/client";
import { Badge, Card, Flex } from "@radix-ui/themes";
import React from "react";
import { AlertCircle, FilePenLine, Trash } from "lucide-react";

interface Props {
  task: Task;
}

const TaskCard = ({ task }: Props) => {
  return (
    <Card style={{ background: "#092635"}}>
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
        <Flex align={"end"} justify={"between"}>
          <Flex direction={"column"} gap="2">
            <p className="text-gray-300">{task.createdAt.toDateString()}</p>
            <Button
              className={`${
                task.isCompleted
                  ? "bg-Green hover:bg-Green"
                  : "bg-red-500 hover:bg-red-500"
              }`}
            >
              {task.isCompleted ? "Completed" : "Incomplete"}
            </Button>
          </Flex>
          <Flex align={"center"} gap="3">
            {/* <Button>
                <FilePenLine />
            </Button> */}
            <Button className="bg-transparent hover:bg-transparent text-gray-300 hover:text-red-500 transition-colors">
                <Trash />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TaskCard;
