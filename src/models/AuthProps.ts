export interface AuthProps {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}
