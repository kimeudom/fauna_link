import { useNavigate } from 'react-router-dom';
import animal_background from '../assets/elephants.jpg'; 
import { FaSignal, FaBatteryHalf, FaExclamationTriangle, FaCheckCircle, FaCircle } from 'react-icons/fa';

export default function Help(): JSX.Element {
    const navigate = useNavigate();

    // Function to handle back action
    const handleBack = () => {
        navigate("/ramani"); // Navigate back to the main page
    };

    return (
        <div
            className="w-full h-screen flex justify-center items-center"
            style={{
                backgroundImage: `url(${animal_background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="bg-white/90 p-10 rounded-lg shadow-lg w-[600px] relative"> 
                {/* Back Button */}
                <button 
                    onClick={handleBack} 
                    className="absolute top-3 right-3 text-2xl font-bold text-black"
                >
                    &times; {/* X symbol */}
                </button>
                
                <h3 className="text-2xl font-semibold mb-5 text-center text-black">Marker Color Meanings</h3> 

                <div className="flex flex-col text-black">
                    <div className="flex items-center mb-2">
                        <FaSignal className="text-purple-500 mr-2" />
                        <span>Purple Border: Signal strength is low.</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaBatteryHalf className="text-orange-500 mr-2" />
                        <span>Orange Glyph: Battery level is low.</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaExclamationTriangle className="text-red-500 mr-2" />
                        <span>Red Background: Marker is outside the designated area.</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaCircle className="text-white mr-2" style={{ border: '2px solid #000' }} />
                        <span>White Border: Marker has okay signal strength.</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <FaCircle className="text-white mr-2" 
                                  style={{ 
                                    border: '2px solid gray', 
                                    borderRadius: '50%', 
                                    padding: '2px' 
                                 }} 
                        />
                        <span>White Glyph: Marker has okay battery level.</span>
                    </div>
                    <div className="flex items-center">
                        <FaCircle className="text-green-500 mr-2" />
                        <span>Green Background: Marker is within the designated area.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
