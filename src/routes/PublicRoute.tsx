// src/routes/PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
    children: React.ReactNode;
};

const PublicRoute: React.FC<Props> = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to="/" /> : <>{children}</>;
};

export default PublicRoute;
