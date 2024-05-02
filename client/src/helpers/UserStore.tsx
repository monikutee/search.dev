import React, { createContext, useEffect, useState } from "react";
import Api from "../api";
import { UserI } from "../api/types/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IUserContext {
  user: UserI | null;
  userId: string | null;
  isLoading: boolean;
  setUser: (user: UserI | null) => void;
  setUserId: (id: string | null) => void;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  userId: null,
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
  const [user, setUser] = useState<UserI | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("user")
  );
  const navigate = useNavigate();

  const fetchUser = async (userId: string) => {
    Api.user
      .fetchUser(userId)
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("user", response.data.id);
        setLoading(false);
      })
      .catch((e) => {
        setUserId(null);
        localStorage.removeItem("user");
        navigate("/");
        toast.error("An unexpected error occurred! You were logged out", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  useEffect(() => {
    if (userId === null) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchUser(userId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        isLoading: isLoading,
        user: user,
        userId: userId,
        setUser: setUser,
        setUserId: setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
