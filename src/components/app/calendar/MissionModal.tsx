// @ts-ignore
import Modal from "react-modal";
import {TimelineItem} from "@/components/app/calendar/CalendarItems";
import moment from "moment";

export const MissionModal = ({ mission, isOpen, onClose }: {
    mission: TimelineItem | null,
    isOpen: boolean,
    onClose: () => void
}) => {
    if (!mission) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
        >
            <h2 className="text-xl font-bold mb-4">{mission.title}</h2>
            <p>
                <strong>Start:</strong> {moment(mission.start_time).format("LLLL")}
            </p>
            <p>
                <strong>End:</strong> {moment(mission.end_time).format("LLLL")}
            </p>
            <p className="mt-4">{mission.description || "No additional details."}</p>
            <button
                onClick={onClose}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
                Close
            </button>
        </Modal>
    );
};
