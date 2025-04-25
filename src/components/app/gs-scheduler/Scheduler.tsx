import React, { FC } from "react";
import RequestList from "./RequestList";
import CalendarContainer from "../calendar/CalendarContainer";

const Scheduler: FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <CalendarContainer />
            <RequestList />
        </div>
    );
};

export default Scheduler;
