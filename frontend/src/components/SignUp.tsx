import { useNavigate } from 'react-router-dom';
import animal_background from '../assets/elephants.jpg'; 

export default function RegisterUsers(): JSX.Element {
    const navigate = useNavigate();

    // Function to handle close action
    const handleClose = () => {
        navigate("/Ramani"); 
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
            <div className="bg-white/90 p-10 rounded-lg shadow-lg w-[400px] relative"> 
                {/* Close Button */}
                <button 
                    onClick={handleClose} 
                    className="absolute top-3 right-3 text-2xl font-bold text-black"
                >
                    &times; {/* X symbol */}
                </button>
                
                <h3 className="text-2xl font-semibold mb-5 text-center text-black">Register Users</h3> 

                <div className="flex flex-col w-full mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full py-2 px-3 rounded-lg mb-3 border border-black placeholder-black focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full py-2 px-3 rounded-lg mb-3 border border-black placeholder-black focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        className="w-full py-2 px-3 rounded-lg mb-3 border border-black placeholder-black focus:outline-none"
                    />
                </div>

                <div className="flex flex-col w-full space-y-4">
                    <button className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white text-lg font-semibold transition-colors">
                        Add User
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p className="text-black">Back to <span 
                        className='font-semibold underline-offset-2 cursor-pointer mb-4' 
                        onClick={() => navigate("/Ramani")}>
                            Main Page
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
