import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { UserDataLoader } from "@/auth/userdataloader";

const SettingsUser: React.FC = () => {
  const { keycloak } = useKeycloak();

  return (
    <UserDataLoader keycloak={keycloak}>
      {(userData) => (
        <div className="p-4 space-y-6">
          <h3 className="text-xl font-semibold">User Settings</h3>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-lg font-medium mb-4">Profile Information</h4>
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Full Name
                  </label>
                  <p className="mt-1">{userData.fullName}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Username
                  </label>
                  <p className="mt-1">{userData.username}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="mt-1">{userData.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-lg font-medium mb-4">Roles & Permissions</h4>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Assigned Roles
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {userData.roles.map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

           {/* Development info */}
            {process.env.NODE_ENV === "development" && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-4">Debug Information</h4>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(userData.getAllUserInfo(), null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </UserDataLoader>
  );
};

export default SettingsUser;
