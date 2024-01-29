"use client";

import { Flex, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useForm } from "react-hook-form";
import z from 'zod'
import { LoginSchema } from "@/app/validations";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

type LoginForm = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = handleSubmit(async (data) => {
    try {
      setIsLogin(true);
      await signIn("credentials", {
        ...data,
        redirect: false,
      });
      setSuccess(true);
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError("Something wrong, try again");
      setIsLogin(false);
    }
  });

  return (
    <form onSubmit={handleLogin}>
      <Flex direction={"column"} align={"center"} gap="5">
        <h1 className="text-lightGreen font-bold text-xl text-center">Login</h1>
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
        <Button
          type="submit"
          className="bg-Green hover:bg-darkGreen flex items-center gap-3"
        >
          Sign Up{" "}
          {isLogin && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        </Button>
        <ErrorMessage>{error}</ErrorMessage>
        {success && (
          <Callout.Root color="green" className="w-full">
            <Callout.Text>Account Successfully Created !</Callout.Text>
          </Callout.Root>
        )}
        <p className="text-gray-400">
          Don't you an Account,{" "}
          <Link
            href="/login"
            className="underline underline-offset-8 text-lightGreen"
          >
            Sign up
          </Link>
        </p>
      </Flex>
    </form>
  );
};

export default LoginForm;
