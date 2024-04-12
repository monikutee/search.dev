import React, { createContext, useEffect, useState } from "react";
import Api from "../api";
import User from "../api/services/user";

interface IUserContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: (): void => {
    throw new Error("setUser function must be overridden");
  },
});

export const UserContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const userId = localStorage.getItem("user");

  const fetchUser = async (userId: string) => {
    try {
      await Api.user.fetchUser(userId).then((response) => {
        setUser(response.data);
      });
    } catch (e) {
      return;
    }
  };

  useEffect(() => {
    console.log(userId);
    if (userId === null || userId === undefined) {
      return;
    }

    fetchUser(userId);
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
