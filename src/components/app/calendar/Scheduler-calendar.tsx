

// File: src/components/app/calendar/GSScheduler.tsx

// import GSContainer from "@/components/app/gs-scheduler/GSContainer";

import React from 'react';
import Timeline from 'react-calendar-timeline';
import moment from 'moment';

const CalendarPage = () => {
    const groups = [{ id: 1, title: 'Group 1' }];
    const items = [
        { id: 1, group: 1, title: 'Item 1', start_time: moment(), end_time: moment().add(1, 'hour') },
    ];

    return (
        <div>
            <h1>Calendar</h1>
            <Timeline
                groups={groups}
                items={items}
                defaultTimeStart={moment().add(-12, 'hour')}
                defaultTimeEnd={moment().add(12, 'hour')}
            />
        </div>
    );
};

export default CalendarPage;
