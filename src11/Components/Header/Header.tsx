import { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <header className="header" aria-label="Header">
      {children}
    </header>
  );
}

export default Header;
