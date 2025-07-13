import { ReactNode } from "react";

interface NavProps {
  children: ReactNode;
}

function PageNav({ children }: NavProps) {
  return (
    <nav className="nav" aria-label="Navigation List">
      {children}
    </nav>
  );
}

export default PageNav;
