import Wrapper from "@/layouts/Wrapper/Wrapper";
import React from "react";

interface ICmsLayoutProps {
  children: React.ReactNode;
}

const CmsLayout = ({ children }: ICmsLayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default CmsLayout;
