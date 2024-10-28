// src/components/Login1.tsx
import React, { useState, useRef, useEffect } from 'react';
import animal_background from '../assets/elephants.jpg'; // Ensure this image exists
import GOOGLE_ICON from '../assets/google.svg'; // Ensure this image exists

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const emailRef = useRef<HTMLInputElement | null>(null); // Ref for focusing the email input

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simple validation
        if (username === '' || password === '') {
            setErrorMessage('Please enter both username and password.');
        } else {
            console.log('Username:', username);
            console.log('Password:', password);

            // Normally, you'd authenticate and navigate
            // For simplicity, we'll just log the values
            alert('Logged in successfully!');

            // Reset the input fields
            setUsername('');
            setPassword('');
            setErrorMessage('');
        }
    };

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus(); // Focus on the email input when component mounts
        }
    }, []);

    return (
        <div className="w-full h-screen flex">
            <div className="relative w-1/2 h-full flex flex-col">
                <img src={animal_background} className="w-full h-full object-cover" alt="Animal Background" />
            </div>
            <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-32 justify-between items-center">
                <h1 className="w-full max-w-[500px] mx-auto text-xl text-[#060606] font-semibold mr-auto">Fauna Link</h1>

                <div className='w-full flex flex-col max-w-[500px]'>
                    <div className='w-full flex flex-col mb-2'>
                        <h3 className='text-3xl font-semibold mb-2'>Login</h3>
                        <p className='text-base mb-2'>Welcome Back! Please enter your details</p>
                        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                    </div>

                    <form onSubmit={handleSubmit} className='w-full flex flex-col'>
                        <input 
                            type="email"
                            ref={emailRef} // Reference for focusing
                            placeholder='Email'
                            className='w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} // Handle input change
                            required
                        />
                        <input 
                            type="password"
                            placeholder='Password'
                            className='w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Handle input change
                            required
                        />
                        <div className='w-full flex items-center justify-between my-2'>
                            <div className='w-full flex'>
                                <input type="checkbox" className='w-4 h-4 mr-2'/>
                                <p className='text-sm'>Remember Me</p>
                            </div>
                            <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Forgot Password?</p>
                        </div>
                        <button
                            type="submit"
                            className='w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                            Log in
                        </button>
                    </form>
                    <div className='w-full flex items-center justify-center relative py-2'>
                        <div className='w-full h-[1px] bg-black/40'></div>
                        <p className='text-lg absolute text-black/80 bg-[#f5f5f5]'>or</p>
                    </div>
                    <div className='w-full text-[#060606] my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center'>
                        <img src={GOOGLE_ICON} className="h-6 mr-2" alt="Google Icon" />
                        Sign In With Google
                    </div>
                </div>

                <div className='w-full flex items-center justify-center'>
                    <p className='text-sm font-normal text-[#060606]'>
                        Don't have an account? 
                        <a 
                            href="/signup" // Use an anchor tag for navigation
                            className='font-semibold underline-offset-2 cursor-pointer'
                        >
                            Sign up for free
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
