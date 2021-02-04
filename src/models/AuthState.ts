export interface AuthState {
  loading: boolean;
  errorStatus: string;
  token: string | null;
  isLoggedIn: boolean;
  loginError: boolean;
}
