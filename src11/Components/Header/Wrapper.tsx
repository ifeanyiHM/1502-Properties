import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  return <div className="header-presentation">{children}</div>;
}

export default Wrapper;
