export interface IUser {
    email: string | null;
    name: string | null;
    avatarURL: string | null;
    verify: boolean;
  }
  
  export interface IAuthState {
    user: IUser;
    token: string | null;
    isLoggedIn: boolean;
    isRefreshing: boolean;
    authError: string | null;
    isLoading: boolean;
    
  }