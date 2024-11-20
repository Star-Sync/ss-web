import React, { FC, useState, useRef } from "react";
import { motion } from "framer-motion";
import Combobox from "@/components/ui/combobox";
import { MapPin, Plus } from "lucide-react";
import { locations } from "@/api/gs-locations";
import { Location } from "@/api/gs-locations";
import MotionWrapper from "../MotionWrapper";
import RequestForm from "./RequestForm";
import Scheduler from "@/components/app/gs-scheduler/Scheduler";


interface Tab {
    id: string;
    name: string;
    content: (location: Location) => React.ReactElement;
    isPinned?: boolean;
}

interface ComboboxItem {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

const GSHeader: FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);

    const [tabs, setTabs] = useState<Tab[]>([
        {
            id: "scheduler",
            name: "Scheduler",
            content: (location) => <Scheduler location={location} />,
            isPinned: true,
        },
    ]);
    const [activeTabId, setActiveTabId] = useState("scheduler");

    const tabCounter = useRef(0);

    const renderLocationPin = () => (
        <MapPin className="h-4 w-4 text-gray-500" />
    );

    const augmentedLocations: ComboboxItem[] = locations.map((location) => ({
        value: location.station_id,
        label: location.label,
        icon: renderLocationPin(),
    }));

    const addNewTab = () => {
        tabCounter.current += 1;
        const newTabId = `contact-req-${tabCounter.current}`;
        const newTab: Tab = {
            id: newTabId,
            name: `Contact Req. ${tabCounter.current}`,
            content: (location) => <RequestForm key={newTabId} location={location} />,
        };
        setTabs((prevTabs) => [...prevTabs, newTab]);
        setActiveTabId(newTabId);
    };

    const closeTab = (tabId: string) => {
        const tabToClose = tabs.find((tab) => tab.id === tabId);
        if (tabToClose?.isPinned) return;

        const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
        setTabs(updatedTabs);

        if (activeTabId === tabId) {
            setActiveTabId(updatedTabs[0]?.id || "");
        }
    };

    const handleLocationChange = (value: string) => {
        const newLocation = locations.find((loc) => loc.station_id === value);
        if (newLocation) {
            setSelectedLocation(newLocation);
        }
    };

    return (
        <MotionWrapper className="w-full h-full flex flex-col bg-gray-50 p-6">
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col h-full overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-xl font-semibold text-black">
                            Ground-Station Scheduling
                        </h1>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                            <Combobox
                                items={augmentedLocations}
                                value={selectedLocation.station_id}
                                onChange={handleLocationChange}
                                placeholder="Select a location"
                                className="w-56"
                            />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-center space-x-4 border-b border-gray-200 mb-4">
                    {tabs.map((tab) => (
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
                                    onClick={(e) => {
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
                    <button
                        onClick={addNewTab}
                        className="flex items-center px-4 py-2 text-gray-500 hover:text-blue-500 border-b-2 border-transparent"
                    >
                        <Plus className="h-4 w-4 mr-1" /> New Request
                    </button>
                </div>

                {/* Tab Content with Framer Motion Transitions */}
                <div className="flex-grow relative">
                    {tabs.map((tab) => (
                        <motion.div
                            key={tab.id}
                            initial={false}
                            animate={tab.id === activeTabId ? "active" : "inactive"}
                            variants={{
                                active: { opacity: 1, x: 0, position: "relative" },
                                inactive: { opacity: 0, x: -20, position: "absolute" },
                            }}
                            transition={{ duration: 0.3 }}
                            style={{ width: "100%", height: "100%" }}
                        >
                            {tab.content(selectedLocation)}
                        </motion.div>
                    ))}
                </div>
            </div>
        </MotionWrapper>
    );
};

export default GSHeader;
