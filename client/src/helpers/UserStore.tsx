import React, { createContext, useEffect, useState } from "react";
import Api from "../api";
import { User } from "../api/types/user";
import { toast } from "react-toastify";

interface IUserContext {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setUserId: (id: string | null) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  isLoading: true,
  setUser: (): void => {
    throw new Error("setUser function must be overridden");
  },
  setUserId: (): void => {
    throw new Error("setUserId function must be overridden");
  },
});

export const UserContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("user")
  );

  const fetchUser = async (userId: string) => {
    try {
      await Api.user.fetchUser(userId).then((response) => {
        setUser(response.data);
        localStorage.setItem("user", response.data.id);
        setLoading(false);
      });
    } catch (e) {
      toast.error("An unexpected error occured!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    if (userId === null) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchUser(userId);
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        isLoading: isLoading,
        user: user,
        setUser: setUser,
        setUserId: setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
