/*This code creates the pop up information cards when a marker is clicked.*/
import { Poi } from "./PoiMarkers"

export default function PopUpCards(props: {pois: Poi, closeCard: () => void}): JSX.Element{

    return(
        <div className = "absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2  bg-white p-4 rounded-lg shadow-lg">
            <button
                onClick = {props.closeCard}
                className = "absolute top-1 right-1 bg-white p-1"
            >
                X
            </button>SS
            <p>Animal ID: {props.pois.key}</p>
            <p>Species: {props.pois.species}</p>
            <p>Latitude: {props.pois.location.lat}</p>
            <p>Longitude: {props.pois.location.lng}</p>
            <p>Altitude: {props.pois.altitude}</p>
            <p>Battery Level: {props.pois.batteryLevel}%</p>
        </div>
    )
}