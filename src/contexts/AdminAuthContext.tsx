import { createContext, useContext, useState } from "react";

export type AdminAuthContextType = {
  user: string | null;
  login: (username: string, password: string) => void;
};

const AdminAuthContext = createContext<AdminAuthContextType>(
  {} as AdminAuthContextType,
);

export function AdminAuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<string | null>(null);

  function login(username: string, password: string) {
    if (username === "admin" && password === "admin") {
      setUser(username);
      console.log(username);
    } else {
      alert("Usuário ou senha inválidos");
    }

    console.log({ user });
  }

  console.log({ user });

  return (
    <AdminAuthContext.Provider value={{ user, login }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
