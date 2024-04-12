import React from "react";
import { StyledLayout } from "./containers.styled";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: React.FC<{
  children: React.ReactElement | React.ReactNode;
}> = ({ children }) => {
  return (
    <div>
      <Header />
      <StyledLayout>{children}</StyledLayout>
      <Footer />
    </div>
  );
};
