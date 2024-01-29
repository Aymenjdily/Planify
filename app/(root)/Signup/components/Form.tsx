"use client";

import { Input } from "@/components/ui/input";
import { Callout, Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useForm } from "react-hook-form";
import z from "zod";
import { UserSchema } from "@/app/validations";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface CloudinaryResult {
  secure_url: string;
}

type UserForm = z.infer<typeof UserSchema>;

const SignupForm = () => {
  const [image, setImage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [passwordConf, setpasswordConf] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(UserSchema),
  });

  const handleCreate = handleSubmit(async (data) => {
    const { password } = data;

    setIsCreating(true);

    if (passwordConf !== password) {
      setError("Password not matched");
      setIsCreating(false);
      return null;
    }

    try {
      const response = await axios.post("/api/auth", {
        ...data,
        image: image,
      });

      if (response.status === 201) {
        setSuccess(true);
        // toast({
        //   title: "Succes",
        //   description: "Account is Created Successfully !",
        // });
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      setIsCreating(false);
      setError("Something wrong, try again");
    }
  });

  return (
    <form onSubmit={handleCreate}>
      <Flex direction={"column"} align={"center"} gap="5">
        <h1 className="text-lightGreen font-bold text-xl text-center">
          Sign Up
        </h1>
        <Link href="/">
          <Flex className="relative w-32 h-32">
            <Image
              src={image || "/upload.png"}
              alt="image"
              fill
              quality={100}
              className="rounded-full object-cover"
            />
          </Flex>
        </Link>
        <CldUploadWidget
          uploadPreset="recruiters"
          onUpload={(Result, widget) => {
            if (Result.event !== "success") return;
            const url = Result.info as CloudinaryResult;
            setImage(url.secure_url);
          }}
        >
          {({ open }) => (
            <Button
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
              className="bg-Green text-md text-white hover:bg-darkGreen"
            >
              Upload Image{" "}
            </Button>
          )}
        </CldUploadWidget>
        <Input
          placeholder="Full Name"
          className="sm:w-80 bg-blackColor text-gray-100"
          {...register("name")}
        />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <Input
          placeholder="Email"
          type="email"
          className="sm:w-80 bg-blackColor text-gray-100"
          {...register("email")}
        />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <Input
          placeholder="Password"
          type="password"
          className="sm:w-80 bg-blackColor text-gray-100"
          {...register("password")}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <Input
          placeholder="Confirmation Password"
          type="password"
          className="sm:w-80 bg-blackColor text-gray-100"
          onChange={(e) => setpasswordConf(e.target.value)}
        />
        <ErrorMessage>{error}</ErrorMessage>
        <Button
          type="submit"
          className="bg-Green hover:bg-darkGreen flex items-center gap-3"
        >
          Sign Up{" "}
          {isCreating && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        </Button>
        {success && (
          <Callout.Root color="green" className="w-full">
            <Callout.Text>Account Successfully Created !</Callout.Text>
          </Callout.Root>
        )}
        <p className="text-gray-400">
          Do you an Account,{" "}
          <Link
            href="/login"
            className="underline underline-offset-8 text-lightGreen"
          >
            Login
          </Link>
        </p>
      </Flex>
    </form>
  );
};

export default SignupForm;
