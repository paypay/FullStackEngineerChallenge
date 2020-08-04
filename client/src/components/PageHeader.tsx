import React, { FC, ReactNode } from "react";

import { Container } from ".";

export interface PageHeaderTypes {
  title: string;
  help?: ReactNode;
  flexible?: boolean;
}
export const PageHeader: FC<PageHeaderTypes> = ({
  title,
  flexible,
  help,
  children,
}) => {
  return (
    <div className="bg-gray-200 h-48 relative border-b border-gray-400">
      <Container
        flexible={flexible}
        className="absolute bottom-0 left-0 right-0"
      >
        <h1 className="mb-12 text-4xl text-left font-bold md:mb-6 w-full">
          {title}
        </h1>
        {help}
      </Container>
      {children}
    </div>
  );
};
