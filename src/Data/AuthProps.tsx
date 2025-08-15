export interface AuthContextProps {
  refreshUser: boolean;
  setRefreshUser: (type: boolean) => void;
  isAuthenticated: boolean;
}

export const defaultAuthProps: AuthContextProps = {
  refreshUser: false,
  setRefreshUser: () => {},
  isAuthenticated: false,
};
