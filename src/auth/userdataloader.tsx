// components/UserDataLoader.tsx
import React, { useEffect, useState } from "react";
import type Keycloak from "keycloak-js";
import { UserData } from "@/auth/userdata";

interface UserDataLoaderProps {
  keycloak: Keycloak;
  children: (userData: UserData) => React.ReactNode;
}

export const UserDataLoader: React.FC<UserDataLoaderProps> = ({
  keycloak,
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const initializeUserData = async () => {
      try {
        setIsLoading(true);
        const userDataInstance = new UserData(keycloak);
        await userDataInstance.loadProfile();
        setUserData(userDataInstance);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    if (keycloak.authenticated) {
      initializeUserData();
    } else {
      setIsLoading(false);
    }
  }, [keycloak]);

  if (isLoading) {
    return (
      <div className="p-4">
        <h3 className="text-xl font-semibold">User Settings</h3>
        <p>Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h3 className="text-xl font-semibold">User Settings</h3>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="p-4">
        <h3 className="text-xl font-semibold">User Settings</h3>
        <p>No user data available</p>
      </div>
    );
  }

  return <>{children(userData)}</>;
};
