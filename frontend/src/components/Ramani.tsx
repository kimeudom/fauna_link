/* This code is renders the map */
import { useState, useEffect } from "react";
import PoiMarkers, {Poi} from "./PoiMarkers";
import PopUpCards from "./PopUpCards";
import Sidebar from "./Sidebar";

import { 
    APIProvider, 
    Map, 
    MapCameraChangedEvent
} from '@vis.gl/react-google-maps';

//Dummy data of animals we want marked
const animals: Poi[] = [
  // Animals within the boundary
  { key: 1, location: { lat: -1.2724, lng: 36.8069 }, species: "Lion", batteryLevel: 92, altitude: 1702 },
  { key: 2, location: { lat: -1.2726, lng: 36.8070 }, species: "Elephant", batteryLevel: 80, altitude: 1710 },
  { key: 3, location: { lat: -1.2727, lng: 36.8068 }, species: "Leopard", batteryLevel: 87, altitude: 1695 },
  { key: 4, location: { lat: -1.2725, lng: 36.8071 }, species: "Cheetah", batteryLevel: 76, altitude: 1688 },
  { key: 5, location: { lat: -1.2730, lng: 36.8069 }, species: "Buffalo", batteryLevel: 94, altitude: 1715 },
  { key: 6, location: { lat: -1.2726, lng: 36.8067 }, species: "Rhinoceros", batteryLevel: 70, altitude: 1700 },

  // Animals outside the boundary
  { key: 7, location: { lat: -1.2740, lng: 36.8080 }, species: "Giraffe", batteryLevel: 89, altitude: 1690 },
  { key: 8, location: { lat: -1.2750, lng: 36.8055 }, species: "Hyena", batteryLevel: 65, altitude: 1720 },
  { key: 9, location: { lat: -1.2735, lng: 36.8085 }, species: "Zebra", batteryLevel: 85, altitude: 1682 },
  { key: 10, location: { lat: -1.2745, lng: 36.8062 }, species: "Warthog", batteryLevel: 78, altitude: 1712 }
];


export default function Ramani(): JSX.Element{

    //Environment variables with our google API  credentials. 
    const API = process.env.REACT_APP_API_KEY;
    const MapId = process.env.REACT_APP_MAP_ID;

    //Test position, when the map renders it the FOV will be at this point
    const chiromo = { lat: -1.2730, lng: 36.8065 };

    
    const [selectedPoi, setSelectedPoi] = useState<Poi | null>(null);

    //State that handles the options in the filter dropdown
    const [choices, setChoices] = useState<string[]>([]);

    //State that handles the selected option of the dropdown
    const [filter, setFilter] = useState<string>("All")

    //Loads data into the choices state
    useEffect(()=>{
        const species = animals.map((animal) =>animal.species)
        setChoices(species);
    }, [])
   

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
    
    const selectedAnimals = animals.filter((animal) => {
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