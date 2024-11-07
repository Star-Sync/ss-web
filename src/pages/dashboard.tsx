import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <section className="w-full h-full bg-gray-50 p-4 space-y-4">
            <div className={`bg-white rounded-xl p-6 shadow-md ${isLoaded ? 'fade-in' : ''}`}>
                <h2 className="text-2xl font-bold text-black">Overview</h2>
                <h2 className="text-md text-gray-500 mb-4">Manage your plan and billing history here.</h2>
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
        </section>
    );
};

export default Dashboard;
