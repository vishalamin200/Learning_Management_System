import { FaTimesCircle } from 'react-icons/fa';

const DeniedIcon = () => {
    return (
        <div className="m-12 flex items-center justify-center">
            <FaTimesCircle className="text-red-600" size={130} />
        </div>
    );
};

export default DeniedIcon;
