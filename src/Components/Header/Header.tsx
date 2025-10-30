import { ReactNode } from "react";
import { SliderProvider } from "../../context/SliderContext";

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <SliderProvider>
      <header className="header" aria-label="Header">
        <h2 className="title">Top Portfolio</h2>
        {children}
      </header>
    </SliderProvider>
  );
}

export default Header;
