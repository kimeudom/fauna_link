import React, {useEffect, useState, useRef, useCallback} from "react";
import {AdvancedMarker, 
    APIProvider, 
    Map, 
    MapCameraChangedEvent, 
    useMap,
    Pin,
    MarkerRef
} from '@vis.gl/react-google-maps';

//Definition of a Point of Interest Data Type
type Poi = {
    key: string, 
    location: google.maps.LatLngLiteral
}

// Definition of the places we want marked
const locations: Poi[] = [
    {key: 'Wildbeast migration', location: {lat:-1.2921, lng:35.0022}},
    {key: 'Talek Gate', location: {lat:-1.4148, lng:35.1535}}
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
            <PoiMarkers pois = {locations}/>
        </Map>
    </APIProvider>
    )
}
//Customization of our marker styling
const PoiMarkers = (props: {pois: Poi[]}) =>{
    //Defines an instance of the map
    const map = useMap();
    //Function that does something when marker is clicked
    const handleClick = useCallback((ev: google.maps.MapMouseEvent) => {
        if (!map) return;
        if (!ev.latLng) return;
        //Test for click event
        console.log('Marker clicked:', ev.latLng.toString())
        // move camera to marker that has been clicked
        map.panTo(ev.latLng)

        //zoom in slightly to marker that has been clicked
        const currentZoom = map.getZoom() || 10
        map.setZoom(currentZoom + 2)

        
    },[map])

    return(
        <>
           {props.pois.map( (poi: Poi) => (
                <AdvancedMarker
                    key = {poi.key}
                    position = {poi.location}
                    clickable = {true}
                    onClick = {handleClick}
                >
                <>
                    <Pin 
                        background = {'#90EE90'}
                        glyphColor = {'#FFFFFF'}
                        borderColor = {'#FFFFFF'}
                    />  
                </>           
                </AdvancedMarker> 
           ))}
        </>
    )
}

            