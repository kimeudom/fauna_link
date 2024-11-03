import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdLogIn } from "react-icons/io";
import { FaHome, FaUsers, FaPlusCircle } from "react-icons/fa";
import { IoPawSharp } from "react-icons/io5";

export default function Sidebar(props: {choices:string[], onFilterChange: (selectedChoice: string) => void}): JSX.Element {
    const [open, setOpen] = useState(true);

    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const [selectedChoice, setSelectedChoice] = useState<string>("")

    const handleDropdownChoice = (event: React.ChangeEvent<HTMLSelectElement>) =>{

        const choice = event.target.value;
        setSelectedChoice(choice)
        //Send selected choice back to parent
        props.onFilterChange(choice) 
    }

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const menus = [
        { name: 'Login', link: '/', icon: <IoMdLogIn size={20} /> },
        { name: 'Select a species', link: '#', icon: <IoPawSharp size={20} /> },
        { name: 'Register Users', link: '/signup', icon: <FaUsers size={20} /> },
        { name: 'Register Animals', link: '/registerAnimals', icon: <FaPlusCircle size={20} /> },
    ];

    return (
        <section className={`flex gap-6`}>
            <div className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
                <div className='py-3 flex justify-end'>
                    <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
                </div>
                
                <h1 className={`text-1xl text-white mb-4 ${!open && 'hidden'}`}>FAUNA LINK</h1>

                <div className='mt-4 flex flex-col gap-4 relative'>
                    {menus.map((menu, i) => (
                        <React.Fragment key={i}>
                            <Link 
                                to={menu.link} 
                                className='flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'
                                onClick={menu.name === 'Select a species' ? toggleDropdown : undefined}
                            >
                                <div>{React.createElement(menu.icon.type, {size: 20})}</div>
                                <h2 
                                    style={{transitionDelay: `${i + 3}00ms`}}
                                    className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}
                                >
                                    {menu.name}
                                </h2>
                                <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:duration-300`}>
                                    {menu.name}
                                </h2>
                            </Link>

                            {/* Dropdown for Filtering Animals */}
                            {menu.name === 'Select a species' && open && showDropdown && (
                                <div className="mt-2">
                                    <select className="w-full text-black bg-white rounded-md"
                                        onChange = {handleDropdownChoice}
                                        value = {selectedChoice}
                                    >         
                                        <option value = "All">All</option>
                                        {props.choices.map((choice, index) => (
                                            <option
                                                key={index} 
                                                value={choice}
                                            >
                                                {choice}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}