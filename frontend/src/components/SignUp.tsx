import React from 'react';
import animal_background from '../assets/elephants.jpg'; 
import GOOGLE_ICON from '../assets/google.svg'; 

const SignUp: React.FC = () => {
    return (
        <div className="w-full h-screen flex">
            <div className="relative w-1/2 h-full flex flex-col">
                <img src={animal_background} className="w-full h-full object-cover" alt="Animal Background" />
            </div>
            <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-32 justify-between items-center">
                <h1 className="w-full max-w-[500px] mx-auto text-xl text-[#060606] font-semibold mr-auto">Fauna Link</h1>

                <div className='w-full flex flex-col max-w-[500px]'>
                    <div className='w-full flex flex-col mb-2'>
                        <h3 className='text-3xl font-semibold mb-2'>Sign Up</h3>
                        <p className='text-base mb-2'>Create your account</p>
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
                        <input 
                            type="password"
                            placeholder='Confirm Password'
                            className='w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none' 
                        />
                    </div>

                    <div className='w-full flex flex-col my-4'>
                        <button className='w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                            Register
                        </button>
                    </div>

                    <div className='w-full flex items-center justify-center relative py-2'>
                        <div className='w-full h-[1px] bg-black/40'></div>
                        <p className='text-lg absolute text-black/80 bg-[#f5f5f5]'>or</p>
                    </div>
                    <div className='w-full text-[#060606] my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center'>
                        <img src={GOOGLE_ICON} className="h-6 mr-2" alt="Google Icon" />
                        Sign Up With Google
                    </div>
                </div>

                <div className='w-full flex items-center justify-center'>
                    <p className='text-sm font-normal text-[#060606]'>
                        Already have an account? 
                        <a 
                            href="/" // Link to the login page
                            className='font-semibold underline-offset-2 cursor-pointer'
                        >
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
