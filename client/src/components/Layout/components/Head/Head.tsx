import NextHead from "next/head";
import React, { FC } from "react";

export interface HeadProps {
  title: string;
  description?: string;
  image?: string;
}

export const Head: FC<HeadProps> = ({
  title,
  description,
  image = "/site-card.png",
}) => {
  return (
    <NextHead>
      <title>PAYPAY - {title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:image" content={image} />
    </NextHead>
  );
};
