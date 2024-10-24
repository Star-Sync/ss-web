import React from 'react';

const Dashboard: React.FC = () => {
    return (
            <div className="p-6 bg-gray-700 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Scheduled Tasks</h3>
                        <p>Number of tasks scheduled today: 10</p>
                    </div>
                    <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Active Satellites</h3>

                        <p>Satellites in operation: 5</p>
                    </div>
                    <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold">Pending Requests</h3>
                        <p>Number of pending requests: 3</p>
                    </div>
                </div>
            </div>
    );
};

export default Dashboard;
