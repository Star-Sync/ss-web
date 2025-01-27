// src/components/layouts/AuthLayout.tsx
import React from 'react';
import { Toaster } from "@/components/ui/toaster";

type LayoutProps = {
    children: React.ReactNode;
};

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <main className="min-h-screen bg-gray-50">
            <Toaster />
            {children}
        </main>
    );
};

export default AuthLayout;
