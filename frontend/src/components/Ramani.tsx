/* This code is renders the map */
import { useState, useEffect } from "react";
import PoiMarkers, {Poi} from "./PoiMarkers";
import PopUpCards from "./PopUpCards";
import Sidebar from "./Sidebar";
import { fetchAnimals } from "./retrieveAnimals";

import { 
    APIProvider, 
    Map, 
    MapCameraChangedEvent
} from '@vis.gl/react-google-maps';

export default function Ramani(): JSX.Element{

    //Environment variables with our google API  credentials. 
    const API = process.env.REACT_APP_API_KEY;
    const MapId = process.env.REACT_APP_MAP_ID;

    //Test position, when the map renders it the FOV will be at this point
    const chiromo =  {lat: -1.2732, lng: 36.8067};

    const [selectedPoi, setSelectedPoi] = useState<Poi | null>(null);

    //State that handles the options in the filter dropdown
    const [choices, setChoices] = useState<string[]>([]);

    //State that handles the selected option of the dropdown
    const [filter, setFilter] = useState<string>("All")

    //state to hold the animals
    const [animals, setAnimals] = useState<Poi[]>([])

    useEffect(() => {
        const getAnimals = async () =>{
            const data = await fetchAnimals()
            console.log(data)
            const transformedData = data?.map((animal) => ({

                key: animal.animal_id, //rename animal_id to key
                name: animal.name,
                species: animal.species,
                location: {
                    lat: parseFloat(String(animal.latitude)), 
                    lng: parseFloat(String(animal.longitude)),
                },
                altitude: animal.altitude,
                batteryLevel: animal.battery_level,
                signalStrength: animal.signal_strength,
                timeStamp: animal.timestamp
                
            })) || []

            console.log("Transformed animal data:", transformedData);
            setAnimals(transformedData)
        }

        getAnimals()
    }, [])

    //Loads data into the choices state
    useEffect(()=>{
        const species = animals?.map((animal) =>animal.species) || []
        setChoices(species);
    }, [animals])
   

     // Function to handle marker click and update selected POI
     const handleMarkerClick = (poi: Poi) => {
        setSelectedPoi(poi);
    };

    // Function to close the pop-up
    const closePopUp = () => {
        setSelectedPoi(null);
    };

    //Function to filter markers
    const handleFilterChange = (selectedChoice:string) => {
        setFilter(selectedChoice)
    }
    
    //Making sure we have API key and Map ID
    if (!API){
        throw new Error("API key is missing!")
    }

    if (!MapId){
        throw new Error("Map ID is missing")
    }
    
    const selectedAnimals = animals?.filter((animal) => {
        return filter === "All" || animal.species === filter; // If no filter is selected, show all animals
    });
    
    return( 
        <div className = "relative w-screen h-screen"> 
            <div className = "absolute top-0 left-0 z-10">
            <Sidebar choices = {choices} onFilterChange = {handleFilterChange}/>
            </div>
            <APIProvider apiKey = {API} >
                <Map
                    style={{ width: '100vw', height: '100vh'}}
                    mapId = {MapId}
                    defaultCenter = {chiromo}
                    defaultZoom={17}
                    onCameraChanged = { (ev: MapCameraChangedEvent) =>
                        console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                    } 
                >
                    <PoiMarkers pois = {selectedAnimals} onMarkerClick = {handleMarkerClick}/>
                    {selectedPoi && <PopUpCards pois = {selectedPoi} closeCard = {closePopUp}/>}
                    
                </Map>
            </APIProvider>
        </div>
    )
}