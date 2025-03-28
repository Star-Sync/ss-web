import React, { FC } from "react";

const HeaderSection: FC = ({}) => {
    return (
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="text-xl font-semibold text-black">Exclusion Cones Management</h1>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                </div>
            </div>
        </div>
    );
};

export default HeaderSection;
