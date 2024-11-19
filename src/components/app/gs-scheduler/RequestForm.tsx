import React from "react";
import {locations} from "@/api/gs-locations";

const RequestForm: React.FC<{ location: typeof locations[0] }> = ({ location }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold">Contact Request Form</h2>
            <p className="text-sm text-gray-500">Location: {location.label}</p>
            {/* Additional form content */}
        </div>
    );
};
export default RequestForm;