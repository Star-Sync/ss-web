import React, { FC } from "react";
import Combobox from "@/components/ui/combobox";
import { Location } from "@/api/gs-locations";

interface HeaderSectionProps {
    selectedLocation: Location;
    handleLocationChange: (value: string) => void;
    locations: Location[];
}

const HeaderSection: FC<HeaderSectionProps> = ({
                                                   selectedLocation,
                                                   handleLocationChange,
                                                   locations,
                                               }) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="text-xl font-semibold text-black">Ground-Station Scheduling</h1>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                    <Combobox
                        items={locations.map((location) => ({
                            value: location.station_id,
                            label: location.label,
                        }))}
                        value={selectedLocation.station_id}
                        onChange={handleLocationChange}
                        placeholder="Select a location"
                        className="w-56"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeaderSection;
