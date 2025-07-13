import { ReactNode } from "react";

interface PageHeaderProps {
  children: ReactNode;
}

function PageHeader({ children }: PageHeaderProps) {
  return <div className="pageHeader">{children}</div>;
}

export default PageHeader;
