import React, { useEffect } from "react";
import {locations} from "@/api/gs-locations";

interface ContactRequestFormProps {
    location: typeof locations[0];
}

const ContactRequestForm: React.FC<ContactRequestFormProps> = ({ location }) => {
    useEffect(() => {
        console.log("ContactRequestForm: Location updated to", location.label);
    }, [location]);

    return (
        <form>
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    placeholder="Enter name"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Message</label>
                <textarea
                    className="mt-1 block w-full border-gray-300 rounded-md"
                    rows={4}
                    placeholder="Enter your message"
                ></textarea>
            </div>
            <div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Submit Contact Request
                </button>
            </div>
        </form>
    );
};

export default ContactRequestForm;
