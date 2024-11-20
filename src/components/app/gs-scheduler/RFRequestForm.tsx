import React, { useEffect } from "react";
import {locations} from "@/api/gs-locations";

interface RFRequestFormProps {
    location: typeof locations[0];
}

const RFRequestForm: React.FC<RFRequestFormProps> = ({ location }) => {
    useEffect(() => {
        console.log("RFRequestForm: Location updated to", location.label);
    }, [location]);

    return (
        <form>
            <div className="mb-4">
                <label className="block text-gray-700">Frequency</label>
                <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    placeholder="Enter frequency"
                />
            {/*    Display location label*/}
                <p className="text-gray-500">Location: {location.label}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Bandwidth</label>
                <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    placeholder="Enter bandwidth"
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Submit RF Request
                </button>
            </div>
        </form>
    );
};

export default RFRequestForm;
