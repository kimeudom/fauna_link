import { Poi } from "./PoiMarkers"


export default function PopUpCards(props: {pois: Poi, closeCard: () => void}){

    return(
        <div className = "absolute top-10 left-10 bg-white p-4 rounded-lg shadow-lg">
            <button
                onClick = {props.closeCard}
                className = "absolute top-1 right-1 bg-white p-1"
            >
                X
            </button>
            <p>Animal ID: {props.pois.key}</p>
            <p>Species: {props.pois.species}</p>
            <p>Latitude: {props.pois.location.lat}</p>
            <p>Longitude: {props.pois.location.lng}</p>
            <p>Battery Level {props.pois.batteryLevel}:</p>
        </div>
    )
}