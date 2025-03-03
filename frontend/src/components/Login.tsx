import { useNavigate } from 'react-router-dom';
import animal_background from '../assets/elephants.jpg';
import GOOGLE_ICON from '../assets/google.svg';

const colors = {
    primary: "#060606",
    background: "#E0E0E0",
    disabled: "#D9D9D9"
}

export default function Login(): JSX.Element{

    const navigate = useNavigate()

    return (
        <div className="w-full h-screen flex">
            <div className="relative w-1/2 h-full flex flex-col">
                <img src={animal_background} className="w-full h-full object-cover" alt="Animal Background" />
            </div>
            <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-32 justify-between items-center">
                <div className = 'mt-20 relative left-[-198px]'>
                    <h1 className="w-full max-w-[500px] mx-auto text-xl text-[#060606] font-semibold mb-1">Fauna Link</h1>
                </div>
               

                <div className='w-full flex flex-col max-w-[500px] mt-[-10px]'>
                    <div className='w-full flex flex-col mb-2'>
                        <h3 className='text-3xl font-semibold mb-2'>Login</h3>
                        <p className='text-base mb-1'>Welcome Back! Please enter your details</p>
                    </div>

                    <div className='w-full flex flex-col'>
                        <input 
                            type="email"
                            placeholder='Email'
                            className='w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none' 
                        />

                        <input 
                            type="password"
                            placeholder='Password'
                            className='w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none' 
                        />
                    </div>

                    <div className='w-full flex items-center justify-between'>
                        <div className='w-full flex'>
                            <input type="checkbox" className='w-4 h-4 mr-2'/>
                            <p className='text-sm'>Remember Me</p>
                        </div>

                        <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Forgot Password?</p>
                    </div>

                    <div className='w-full flex flex-col my-4'>
                        <button className='w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer'
                            onClick = {() => navigate("/Ramani")}
                        >
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}