import { useState } from "react"

export default function Filter(props:{choices:string[], onFilterChange: (selectedChoice: string) => void}):JSX.Element{

    const [selectedChoice, setSelectedChoice] = useState<string>("")

    const handleClick = (event: React.ChangeEvent<HTMLSelectElement>) =>{

        const choice = event.target.value;
        setSelectedChoice(choice)
        //Send selected choice back to parent
        props.onFilterChange(choice) 
    }

    return(
        <select 
            defaultValue = "" 
            value = {selectedChoice} 
            onChange = {handleClick}
        >   <option value = "All">All</option>
            <option value = "" disabled>Select a species</option>
           {props.choices.map((choice, index) => {
                return(
                    <option
                       
                        key = {index}
                        value = {choice}
                    >   
                        {choice}
                    </option>
                )
                
           })}
        </select>
    )
}