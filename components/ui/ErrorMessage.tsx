import { Text, Callout } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Callout.Root color="red" className="w-full">
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
};

export default ErrorMessage;
