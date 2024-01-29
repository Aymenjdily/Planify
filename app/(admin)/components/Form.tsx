"use client";

import React, { useState } from "react";
import { AlertDialog, Callout, Flex, Switch } from "@radix-ui/themes";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useForm } from "react-hook-form";
import { TaskSchema } from "@/app/validations";
import z from "zod";
import { useSession } from "next-auth/react";

type TaskForm = z.infer<typeof TaskSchema>;

const TaskForm = () => {
  const [isImportant, setImportant] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskForm>({
    resolver: zodResolver(TaskSchema),
  });

  const handleCreate = handleSubmit(async (data) => {
    try {
      setIsCreating(true);
      const response = await axios.post("/api/task", {
        ...data,
        isImportant,
        isCompleted,
        userId,
      });

      if (response.status === 201) {
        setSuccess(true);
        router.push("/dashboard");
        router.refresh();
        
      }
    } catch (error) {
      setIsCreating(false);
      setError("Something is wrong, try again !");
    } finally {
      router.push("/dashboard");
      router.refresh();
    }
  });

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button className="bg-transparent hover:bg-transparent">
          <Flex className="text-gray-300 bg-gray-600 rounded-full border" p="2">
            <Plus />
          </Flex>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content
        color="gray"
        style={{ maxWidth: 450, background: "#092635" }}
      >
        <AlertDialog.Title className="text-white">
          Create a Task
        </AlertDialog.Title>
        <form onSubmit={handleCreate}>
          <Flex direction={"column"} gap="3" my="6">
            <label className="text-gray-300 font-medium">Title</label>
            <Input
              className="w-full bg-slate-800 border-blackColor text-gray-100"
              placeholder="Title"
              {...register("title")}
            />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <label className="text-gray-300 font-medium">Description</label>
            <Textarea
              className="w-full bg-slate-800 border-blackColor text-gray-100"
              placeholder="Description"
              {...register("description")}
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Flex align={"center"} justify={"between"}>
              <label className="text-gray-300 font-medium">
                Is Important ?
              </label>
              <Switch
                radius="small"
                color="green"
                onCheckedChange={setImportant}
                checked={isImportant}
              />
            </Flex>
            <Flex align={"center"} justify={"between"}>
              <label className="text-gray-300 font-medium">
                Is Completed ?
              </label>
              <Switch
                radius="small"
                color="green"
                onCheckedChange={setCompleted}
                checked={isCompleted}
              />
            </Flex>
            <ErrorMessage>{error}</ErrorMessage>
            {success && (
              <Callout.Root color="green">
                <Callout.Text>Task Created Successfully !</Callout.Text>
              </Callout.Root>
            )}
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button className="bg-gray-600">Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button type="submit" className="bg-Green hover:bg-Green">
                <Flex align={"center"} gap="3">
                  <Plus />
                  Create Task{" "}
                  {isCreating && (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  )}
                </Flex>
              </Button>
            </AlertDialog.Action>
          </Flex>
        </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default TaskForm;
