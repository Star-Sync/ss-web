import React, { useState } from "react";
import Combobox from "@/components/ui/combobox";
import { MapPin, Plus } from "lucide-react";
import { locations } from "@/api/gs-locations";
import MotionWrapper from "../MotionWrapper";
import RequestForm from "./RequestForm";
import Scheduler from "@/components/app/gs-scheduler/Scheduler";

interface Tab {
    id: string;
    name: string;
    content: React.ReactNode;
    isPinned?: boolean;
}

const GSHeader: React.FC = () => {
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);
    const [tabs, setTabs] = useState<Tab[]>([
        {
            id: "scheduler",
            name: "Scheduler",
            content: <Scheduler></Scheduler>,
            isPinned: true,
        },
    ]);
    const [activeTabId, setActiveTabId] = useState("scheduler");

    const renderLocationPin = () => <MapPin className="h-4 w-4 text-gray-500" />;
    const augmentedLocations = locations.map(location => ({
        ...location,
        icon: renderLocationPin(),
    }));

    const addNewTab = () => {
        const newTabId = `contact-req-${tabs.length}`;
        const newTab: Tab = {
            id: newTabId,
            name: `Contact Req. ${tabs.length}`,
            content: <RequestForm location={selectedLocation} />,
        };
        setTabs([...tabs, newTab]);
        setActiveTabId(newTabId);
    };

    const closeTab = (tabId: string) => {
        if (tabs.find(tab => tab.id === tabId)?.isPinned) return;
        const updatedTabs = tabs.filter(tab => tab.id !== tabId);
        setTabs(updatedTabs);
        if (activeTabId === tabId) {
            setActiveTabId(updatedTabs[0]?.id || "");
        }
    };

    const handleLocationChange = (newLocation: typeof locations[0]) => {
        setSelectedLocation(newLocation);
        // Update all tabs with the new location
        setTabs(tabs.map(tab => ({
            ...tab,
            content:
                tab.id === "scheduler"
                    ? tab.content // Scheduler content remains unchanged
                    : <RequestForm location={newLocation} />,
        })));
    };

    return (
        <MotionWrapper className="w-full h-full flex flex-col bg-gray-50 p-6">
            {/* Unified White Box */}
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col h-full">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-4">
                    {/* Left Section: Title and Location */}
                    <div>
                        <h1 className="text-xl font-semibold text-black">
                            Ground-Station Scheduling
                        </h1>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                            <Combobox
                                items={augmentedLocations}
                                value={selectedLocation.value} // Pass the `value` field as the selected value
                                onChange={(value: string) => {
                                    const newLocation = locations.find(loc => loc.value === value); // Find the location by value
                                    if (newLocation) {
                                        handleLocationChange(newLocation); // Update with the full location object
                                    }
                                }}
                                placeholder="Select a location"
                                className="w-56"
                            />
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center space-x-4 border-b border-gray-200 mb-4">
                    {tabs.map(tab => (
                        <div
                            key={tab.id}
                            className={`px-4 py-2 cursor-pointer ${
                                tab.id === activeTabId
                                    ? "border-b-2 border-blue-500 text-blue-500"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                            onClick={() => setActiveTabId(tab.id)}
                        >
                            {tab.name}
                            {!tab.isPinned && (
                                <button
                                    onClick={e => {
                                        e.stopPropagation();
                                        closeTab(tab.id);
                                    }}
                                    className="ml-2 text-gray-400 hover:text-red-500"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    ))}
                    {/* New Tab Button */}
                    <button
                        onClick={addNewTab}
                        className="flex items-center px-4 py-2 text-gray-500 hover:text-blue-500 border-b-2 border-transparent"
                    >
                        <Plus className="h-4 w-4 mr-1" /> New Request
                    </button>
                </div>

                {/* Content Section */}
                <div className="flex-grow">
                    {tabs.find(tab => tab.id === activeTabId)?.content || <div>No content available</div>}
                </div>
            </div>
        </MotionWrapper>
    );
};

export default GSHeader;
