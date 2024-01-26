"use client";

import { NavLinks } from "@/constants";
import { Box, Flex, AlertDialog } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <Flex
      className="mx-auto max-w-7xl"
      p="5"
      justify={"between"}
      align={"center"}
    >
      <Flex className="relative w-32 h-16">
        <Image src="/logo/logo-black.svg" alt="Planify" fill quality={100} />
      </Flex>
      <Box className="md:flex hidden">
        <Flex align={"center"} gap="5">
          {NavLinks.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className={classnames({
                "font-medium capitalize hover:text-Green transition-colors":
                  true,
                "text-Green font-semibold": link.href === pathname,
                "text-gray-500": link.href !== pathname,
              })}
            >
              {link.label}
            </Link>
          ))}
        </Flex>
      </Box>
      <Box className="md:flex hidden">
        <Flex>
          {session?.user ? (
            <></>
          ) : (
            <Button className="bg-darkGreen hover:bg-blackColor">Login</Button>
          )}
        </Flex>
      </Box>
      <Box className="md:hidden flex">
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button className="bg-transparent text-blackColor hover:bg-transparent">
              <Menu />
            </Button>
          </AlertDialog.Trigger>
          <AlertDialog.Content style={{ maxWidth: 450 }}>
            <AlertDialog.Cancel>
              <Flex align={"center"} justify={"between"}>
                <Image
                  src="/logo/logo-green.svg"
                  alt="Planify"
                  width={100}
                  height={100}
                  quality={100}
                />
                <Button className="bg-tranparent hover:bg-transparent text-black text-lg">
                  <X />
                </Button>
              </Flex>
            </AlertDialog.Cancel>
            <Flex direction={"column"} mt="5" gap="5" pl="5">
              {NavLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.label}
                  className={classnames({
                    "font-medium capitalize hover:text-Green transition-colors":
                      true,
                    "text-Green font-semibold": link.href === pathname,
                    "text-gray-500": link.href !== pathname,
                  })}
                >
                  {link.label}
                </Link>
              ))}
              <Flex>
                {session?.user ? (
                  <></>
                ) : (
                  <Button className="bg-darkGreen hover:bg-blackColor">
                    Login
                  </Button>
                )}
              </Flex>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Box>
    </Flex>
  );
};

export default Navbar;
