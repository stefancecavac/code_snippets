import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { getCurrentUser, loginUserApi, logoutUserApi, registerUserApi } from "../api/AuthApi";
import { loginData, registerData, userData } from "../types";

type AuthContextType = {
  user: userData;
  userLoading: boolean;
  registerUser: (data: registerData) => void;
  loginUser: (data: loginData) => void;
  logoutUser: () => void;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: getCurrentUser,
    retry: false,
  });

  const { mutate: registerUser } = useMutation({
    mutationKey: ["auth"],
    mutationFn: registerUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const { mutate: loginUser } = useMutation({
    mutationKey: ["auth"],
    mutationFn: loginUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const { mutate: logoutUser } = useMutation({
    mutationKey: ["auth"],
    mutationFn: logoutUserApi,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth"] });
    },
  });

  console.log(user);

  return <AuthContext.Provider value={{ user, userLoading, registerUser, loginUser, logoutUser }}>{children}</AuthContext.Provider>;
};

export const UseAuthContext = () => {
  const context = useContext(AuthContext);
  return context as AuthContextType;
};
