"use client";

import { Box, Flex, Grid } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminLinks } from "@/constants";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <Box className="md:hidden flex w-full mb-5">
      <Flex direction={"column"} gap="5" className="w-full">
        <Flex
          direction={"column"}
          gap="6"
          p="5"
          className="bg-black/20 rounded-2xl w-full"
        >
          <Flex align={"center"} justify={"between"}>
            <Flex align={"center"} gap="2">
              <Flex className="relative w-12 h-12" align={"center"} gap="2">
                <Image
                  src={session?.user?.image!}
                  alt={session?.user?.name!}
                  fill
                  className="rounded-full object-cover"
                />
              </Flex>
              <Flex>
                <h1 className="text-white w-16 font-semibold">
                  {session?.user?.name}
                </h1>
              </Flex>
            </Flex>
            <Button
              className="bg-transparent hover:bg-transparent"
              onClick={() => signOut()}
            >
              <LogOut />
            </Button>
          </Flex>
        </Flex>
        <Grid
          columns={"2"}
          gap="5"
          p="5"
          className="bg-black/20 rounded-2xl w-full"
        >
          {AdminLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="w-full flex items-center justify-center"
            >
              <Flex
                align={"center"}
                gap="3"
                py="2"
                px="2"
                className={classnames({
                  "text-gray-400 text-sm w-full": true,
                  "bg-gray-600 border-b-4 border-lightGreen font-semibold":
                    link.href === pathname,
                })}
              >
                <link.icon className="" />
                {link.label}
              </Flex>
            </Link>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
};

export default Navbar;
