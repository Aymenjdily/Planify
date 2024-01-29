"use client";

import { AdminLinks } from "@/constants";
import { Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { LogOut } from 'lucide-react'
import { Button } from "./ui/button";

const SideBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <Flex
      direction={"column"}
      justify={"between"}
      gap="6"
      className="bg-black/20 rounded-2xl border border-blackColor"
    >
      <Flex align={"center"} gap="3" p="5">
        <Flex className="relative w-16 h-16">
          <Image
            src={session?.user?.image!}
            alt={session?.user?.name!}
            fill
            className="rounded-full object-cover"
          />
        </Flex>
        <h1 className="text-lg text-white w-20 font-semibold">
          {session?.user?.name}
        </h1>
      </Flex>
      <Flex direction={"column"} gap="2">
        {AdminLinks.map((link) => (
          <Link key={link.label} href={link.href} className="w-full flex items-center justify-center">
            <Flex
              align={"center"}
              gap="3"
              py="2"
              px="6"
              className={classnames({
                "text-gray-400 text-sm w-full": true,
                "bg-gray-600 border-r-4 border-lightGreen font-semibold": link.href === pathname,
              })}
            >
              <link.icon className="" />
              {link.label}
            </Flex>
          </Link>
        ))}
      </Flex>
      <Flex p="5" className="w-full">
        <Button className="w-full bg-transparent hover:bg-transparent text-gray-300 text-sm">
          <Flex align={"center"} gap="3">
            <LogOut />
            Log Out
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};

export default SideBar;
