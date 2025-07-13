export interface AuthContextProps {
  refreshUser: boolean;
  setRefreshUser: (type: boolean) => void;
}

export const defaultAuthProps: AuthContextProps = {
  refreshUser: false,
  setRefreshUser: () => {},
};
