/* This code is renders the map */
import { useState } from "react";
import PoiMarkers, {Poi} from "./PoiMarkers";
import PopUpCards from "./PopUpCards";
import { 
    APIProvider, 
    Map, 
    MapCameraChangedEvent
} from '@vis.gl/react-google-maps';

//Dummy data of animals we want marked
const animals: Poi[] = [
    {key: 1, location: {lat:-1.2921, lng:35.0022}, species:"Lion", batteryLevel: 92, altitude:1702},
    {key: 2, location: {lat:-1.4148, lng:35.1535}, species: "Elephant", batteryLevel: 80, altitude:1710}
]

export default function Ramani(): JSX.Element{

    //Environment variables with our google API  credentials. 
    const API = process.env.REACT_APP_API_KEY;
    const MapId = process.env.REACT_APP_MAP_ID;
    
    //Test position, when the map renders it the FOV will be at this point
    const MaasaiMaraCoordinates = {
        lat: -1.4065,
        lng: 35.1456,
    }

    const [selectedPoi, setSelectedPoi] = useState<Poi | null>(null);

     // Function to handle marker click and update selected POI
     const handleMarkerClick = (poi: Poi) => {
        setSelectedPoi(poi);
    };

    // Function to close the pop-up
    const closePopUp = () => {
        setSelectedPoi(null);
    };
    
    //Making sure we have API key and Map ID
    if (!API){
        throw new Error("API key is missing!")
    }

    if (!MapId){
        throw new Error("Map ID is missing")
    }

    return( 
    <APIProvider apiKey = {API} >
        <Map
            style={{ width: '100vw', height: '100vh'}}
            mapId = {MapId}
            defaultCenter={MaasaiMaraCoordinates}
            defaultZoom={10}
            onCameraChanged={ (ev: MapCameraChangedEvent) =>
                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            } 
        >
            <PoiMarkers pois = {animals} onMarkerClick = {handleMarkerClick}/>
            {selectedPoi && <PopUpCards pois = {selectedPoi} closeCard = {closePopUp}/>}
        </Map>
    </APIProvider>
    )
}
