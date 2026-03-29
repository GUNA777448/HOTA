import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { ROUTES } from "@/routes";

type Props = {
  children: ReactNode;
};

export default function AdminProtectedRoute({ children }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(Boolean(user));
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-bg-primary">
        <p className="text-text-secondary">Checking admin session...</p>
      </section>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.ADMIN_LOGIN} replace />;
  }

  return <>{children}</>;
}
