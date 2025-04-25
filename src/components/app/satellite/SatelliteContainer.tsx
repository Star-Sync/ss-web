// SatelliteContainer.tsx
import React, { FC, useState, useRef } from "react";
import TabNav, { Tab } from "@/components/ui/tab/TabNav";
import MotionWrapper from "../MotionWrapper";
import HeaderSection from "@/components/app/satellite/HeaderSection";
import FormManager from "./Form/FormManager";
import TabContent from "@/components/ui/tab/TabContent";
import SatelliteGeneral from "@/components/app/satellite/SatelliteGeneral";

const SatelliteContainer: FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: "overview",
      name: "Overview",
      content: () => <SatelliteGeneral />,
      isPinned: true,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState("overview");
  const tabCounter = useRef(0);

  const addNewTab = () => {
    tabCounter.current += 1;
    const newTabId = `satellite-form-${tabCounter.current}`;
    const newTab: Tab = {
      id: newTabId,
      name: `Form ${tabCounter.current}`,
      content: () => <FormManager closeTab={closeTab} tabId={newTabId} />,
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTabId(newTabId);
  };

  const closeTab = (tabId: string) => {
    const tabToClose = tabs.find((tab) => tab.id === tabId);
    if (tabToClose?.isPinned) return;

    setActiveTabId(tabs[0].id);
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
    setTabs(updatedTabs);
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

export default SatelliteContainer;
