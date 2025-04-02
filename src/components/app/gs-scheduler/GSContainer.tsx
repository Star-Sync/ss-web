import React, { FC, useState, useRef } from "react";
import { Tab } from "./TabNav";
import MotionWrapper from "../MotionWrapper";
import Scheduler from "@/components/app/gs-scheduler/Scheduler";
import RequestForm from "./RequestForm/RequestForm";
import TabNav from "@/components/ui/tab/TabNav";
import TabContent from "@/components/ui/tab/TabContent";
import HeaderSection from "./HeaderSection";

const GSContainer: FC = () => {
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
            content: () => <RequestForm key={newTabId}/>,
            content: () => <RequestForm key={newTabId}/>,
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
                <TabContent tabs={tabs} activeTabId={activeTabId} />
            </div>
        </MotionWrapper>
    );
};

export default GSContainer;
