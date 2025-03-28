import React, { FC, useState, useRef } from "react";
import { Tab } from "@/components/app/ground/TabNav";  // Adjust the path for ground station tabs
import MotionWrapper from "../MotionWrapper";
import TabNav from "@/components/app/ground/TabNav";  // Adjust path for Ground Station TabNav
import HeaderSection from "@/components/app/ground/HeaderSection";  // Adjust path for Ground Station header
import FormManager from "./Form/FormManager";
import TabContent from "./TabContent";
import GroundGeneral from "@/components/app/ground/GroundGeneral";  // Modify for GroundGeneral component

const GroundContainer: FC = () => {
    const [tabs, setTabs] = useState<Tab[]>([
        {
            id: "overview",
            name: "Overview",
            content: <GroundGeneral />,  // Replace with Ground Station general content
            isPinned: true,
        },
    ]);
    const [activeTabId, setActiveTabId] = useState("overview");
    const tabCounter = useRef(0);

    const addNewTab = () => {
        tabCounter.current += 1;
        const newTabId = `ground-station-form-${tabCounter.current}`;
        const newTab: Tab = {
            id: newTabId,
            name: `Form ${tabCounter.current}`,
            content: <FormManager key={newTabId}/>,
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

    return (
        <MotionWrapper className="w-full h-full flex flex-col bg-gray-50 p-6">
            <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col h-full overflow-hidden">
                <HeaderSection />  {/* Header for Ground Station */}
                <TabNav
                    tabs={tabs}
                    activeTabId={activeTabId}
                    setActiveTabId={setActiveTabId}
                    addNewTab={addNewTab}
                    closeTab={closeTab}
                />
                <TabContent tabs={tabs} activeTabId={activeTabId} />
            </div>
        </MotionWrapper>
    );
};

export default GroundContainer;
