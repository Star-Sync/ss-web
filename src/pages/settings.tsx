import React from 'react';

const Settings: React.FC = () => {
    return (
            <div className="p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-black">Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">User Profile</h3>
                        <p>Update your profile details</p>
                    </div>
                    <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Account Settings</h3>

                        <p>Update your account settings</p>
                    </div>
                    <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Notification Preferences</h3>
                        <p>Update your notification preferences</p>
                    </div>
                </div>
            </div>
    );
};

export default Settings;
