/*This code puts markers on the map as well draws the boundary*/
import {useCallback, useEffect} from "react";
import { AdvancedMarker,
    useMap,
    Pin
 } from "@vis.gl/react-google-maps";
 import {categorizeByBoundary} from "./boundaryChecker";

//Definition of a Point of Interest Data Type
export type Poi = {
    key: number, 
    name: string,
    species: string,
    location: google.maps.LatLngLiteral,
    altitude: number,
    batteryLevel: number,
    signalStrength: number,
    timeStamp:string
   
    
}

const boundaryCoords = [
    { lat: -1.2724895895954178, lng: 36.80688318411771 }, // Central Examination Centre
    { lat: -1.2724757415758905, lng: 36.80725653788178 }, // Science and Physics Labs
    { lat: -1.273190164383422, lng: 36.80724929754507 }, // Department of Computing and Informatics
    { lat: -1.2730791056842818, lng: 36.806657501195026 } // Close to the junction
];

//Customization of our marker styling
export default function PoiMarkers(props: {pois: Poi[], onMarkerClick: (poi: Poi) => void}): JSX.Element{

    //Defines an instance of the map
    const map = useMap();

    // Draw boundary polygon when map is available
    useEffect(() => {
        if (map) {
            const boundaryPolygon = new google.maps.Polygon({
                paths: boundaryCoords,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#E0F7FA",
                fillOpacity: 0.35,
            });
            boundaryPolygon.setMap(map);
        }
    }, [map]);

    //Function that does something when marker is clicked
    const handleClick = useCallback((ev: google.maps.MapMouseEvent, poi: Poi) => {

        if (!map || !ev.latLng) return;

        props.onMarkerClick(poi) //Trigger the pop up function
        
        //Move camera to marker that has been clicked
        map.panTo(ev.latLng)

        //Zoom in slightly to marker that has been clicked
        const currentZoom = map.getZoom() || 10
        if (currentZoom !== 13){
            map.setZoom(currentZoom + 1)
        }
       
   
    },[map,props])

    //Get two arrays one for markers inside and another for markers outside the boundary.
    const {insideBoundary, outsideBoundary} = categorizeByBoundary(props.pois, boundaryCoords)

    return(
        <>
           {/*Markers inside the boundary */
                insideBoundary.map( (poi: Poi) => (
                <AdvancedMarker
                    key = {poi.key}
                    position = { poi.location}
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

            {/*Markers outside the boundary */
                outsideBoundary.map( (poi: Poi) => (  
                <AdvancedMarker
                    key = {poi.key}
                    position = { poi.location}
                    clickable = {true}
                    onClick = {(ev) =>handleClick(ev,poi)}
                >
                <>
                    <Pin 
                        background = {'#FF0000'}
                        glyphColor = {'#FFFFFF'}
                        borderColor = {'#FFFFFF'}
                    />  
                </>           
                </AdvancedMarker>
            ))}
        </>
    )
}

            