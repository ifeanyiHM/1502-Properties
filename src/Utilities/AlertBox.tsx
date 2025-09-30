import { ReactNode } from "react";

interface AlertBoxProps {
  children: ReactNode;
}

function AlertBox({ children }: AlertBoxProps) {
  return <span className="alert">{children}</span>;
}

export default AlertBox;
