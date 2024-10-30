/* This code is renders the map */
import { useState, useEffect } from "react";
import PoiMarkers, {Poi} from "./PoiMarkers";
import PopUpCards from "./PopUpCards";
import Filter from "./Filter";
import { 
    APIProvider, 
    Map, 
    MapCameraChangedEvent
} from '@vis.gl/react-google-maps';

//Dummy data of animals we want marked
const animals: Poi[] = [
    { key: 1, location: { lat: -1.2654, lng: 36.8045 }, species: "Lion", batteryLevel: 92, altitude: 1702 },
    { key: 2, location: { lat: -1.2665, lng: 36.8020 }, species: "Elephant", batteryLevel: 80, altitude: 1710 },
    { key: 3, location: { lat: -1.2687, lng: 36.8015 }, species: "Leopard", batteryLevel: 87, altitude: 1695 },
    { key: 4, location: { lat: -1.2703, lng: 36.7990 }, species: "Cheetah", batteryLevel: 76, altitude: 1688 },
    { key: 5, location: { lat: -1.2715, lng: 36.8055 }, species: "Buffalo", batteryLevel: 94, altitude: 1715 },
    { key: 6, location: { lat: -1.2730, lng: 36.8008 }, species: "Rhinoceros", batteryLevel: 70, altitude: 1700 },
    { key: 7, location: { lat: -1.2678, lng: 36.8032 }, species: "Giraffe", batteryLevel: 89, altitude: 1690 },
    { key: 8, location: { lat: -1.2695, lng: 36.8040 }, species: "Hyena", batteryLevel: 65, altitude: 1720 },
    { key: 9, location: { lat: -1.2720, lng: 36.8065 }, species: "Zebra", batteryLevel: 85, altitude: 1682 },
    { key: 10, location: { lat: -1.2660, lng: 36.7995 }, species: "Warthog", batteryLevel: 78, altitude: 1712 }
];



export default function Ramani(): JSX.Element{

    //Environment variables with our google API  credentials. 
    const API = process.env.REACT_APP_API_KEY;
    const MapId = process.env.REACT_APP_MAP_ID;
    
    //Test position, when the map renders it the FOV will be at this point
    const WestlandsCoordinates = {
        lat: -1.2691,
        lng: 36.8020,
    };
    
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
        
    <APIProvider apiKey = {API} >
        <Filter choices = {choices} onFilterChange = {handleFilterChange}/>
        <Map
            style={{ width: '100vw', height: '100vh'}}
            mapId = {MapId}
            defaultCenter = {WestlandsCoordinates}
            defaultZoom={10}
            onCameraChanged = { (ev: MapCameraChangedEvent) =>
                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            } 
        >
            <PoiMarkers pois = {selectedAnimals} onMarkerClick = {handleMarkerClick}/>
            {selectedPoi && <PopUpCards pois = {selectedPoi} closeCard = {closePopUp}/>}
        </Map>
    </APIProvider>
    )
}