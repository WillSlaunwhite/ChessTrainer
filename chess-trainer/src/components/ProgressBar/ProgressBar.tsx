interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const percentage = (current / total) * 100;

    return (
        <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
                <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercaese rounded-full text-teal-600 bg-teal-200">
                        Task Progress
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-teal-600">
                        {percentage}
                    </span>
                </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"></div>
            </div>
        </div>
    );
};
{/* <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div> */}