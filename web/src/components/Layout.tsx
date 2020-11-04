import React from "react";
import { Navbar } from "./Navbar";
import { Container, ContainerVariant } from "./Container";

interface LayoutProps {
  variant?: ContainerVariant;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <Navbar />
      <Container variant={variant}>{children}</Container>
    </>
  );
};
