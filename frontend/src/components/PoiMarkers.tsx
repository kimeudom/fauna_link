import React, {useState, useCallback} from "react";
import { AdvancedMarker,
    useMap,
    Pin
 } from "@vis.gl/react-google-maps";

//Definition of a Point of Interest Data Type
export type Poi = {
    key: number, 
    location: google.maps.LatLngLiteral,
    species: string
    batteryLevel: number
    altitude: number
}

//Customization of our marker styling
export default function PoiMarkers(props: {pois: Poi[], onMarkerClick: (poi: Poi) => void}): JSX.Element{

    //Defines an instance of the map
    const map = useMap();

    //Function that does something when marker is clicked
    const handleClick = useCallback((ev: google.maps.MapMouseEvent, poi: Poi) => {

        if (!map || !ev.latLng) return;

        props.onMarkerClick(poi) //Trigger the pop up function
        
        //Move camera to marker that has been clicked
        map.panTo(ev.latLng)

        //Zoom in slightly to marker that has been clicked
        const currentZoom = map.getZoom() || 10
        map.setZoom(currentZoom + 2)
   
    },[map,props])

    return(
        <>
           {props.pois.map( (poi: Poi) => (
                <AdvancedMarker
                    key = {poi.key}
                    position = {poi.location}
                    clickable = {true}
                    onClick = {(ev) =>handleClick(ev,poi)}
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

            