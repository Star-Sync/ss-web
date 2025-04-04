import React, { FC, useState, useRef } from "react";
import { Tab } from "@/components/ui/tab/TabNav";
import MotionWrapper from "../MotionWrapper";
import TabNav from "@/components/ui/tab/TabNav";
import HeaderSection from "@/components/app/ground/HeaderSection";
import FormManager from "./Form/FormManager";
import TabContent from "@/components/ui/tab/TabContent";
import GroundGeneral from "@/components/app/ground/GroundGeneral";

const GroundContainer: FC = () => {
    const [tabs, setTabs] = useState<Tab[]>([
        {
            id: "overview",
            name: "Overview",
            content: () => <GroundGeneral />,
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
            content: () => <FormManager key={newTabId}/>,
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
        <MotionWrapper className="flex flex-col p-6">
            <div className="rounded-xl p-6 shadow-lg bg-white">
                <HeaderSection />
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
