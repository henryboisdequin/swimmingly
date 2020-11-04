import React from "react";
import { Container, ContainerVariant } from "./Container";
import { Navbar } from "./Navbar";

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
