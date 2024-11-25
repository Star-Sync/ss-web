import React, { FC, useState, useRef } from "react";
import { locations, Location } from "@/api/gs-locations";
import { Tab } from "./TabNav";
import MotionWrapper from "../MotionWrapper";
import Scheduler from "@/components/app/gs-scheduler/Scheduler";
import RequestForm from "./RequestForm/RequestForm";
import TabNav from "./TabNav";
import TabContent from "./TabContent";
import HeaderSection from "./HeaderSection";

const GSContainer: FC = () => {
    const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]);
    const [tabs, setTabs] = useState<Tab[]>([
        {
            id: "scheduler",
            name: "Scheduler",
            content: () => <Scheduler />,
            isPinned: true,
        },
    ]);
    const [activeTabId, setActiveTabId] = useState("scheduler");
    const tabCounter = useRef(0);

    const addNewTab = () => {
        tabCounter.current += 1;
        const newTabId = `contact-req-${tabCounter.current}`;
        const newTab: Tab = {
            id: newTabId,
            name: `Request Form. ${tabCounter.current}`,
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
                <HeaderSection
                    selectedLocation={selectedLocation}
                    handleLocationChange={handleLocationChange}
                    locations={locations}
                />
                <TabNav
                    tabs={tabs}
                    activeTabId={activeTabId}
                    setActiveTabId={setActiveTabId}
                    addNewTab={addNewTab}
                    closeTab={closeTab}
                />
                <TabContent tabs={tabs} activeTabId={activeTabId} selectedLocation={selectedLocation} />
            </div>
        </MotionWrapper>
    );
};

export default GSContainer;
