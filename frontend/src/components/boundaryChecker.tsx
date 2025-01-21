import { Poi } from "./PoiMarkers";

// Helper function to determine if a point is inside the polygon based on the Ray-Casting algorithm
export function isPointInBoundary(point: google.maps.LatLngLiteral, polygonCoords: google.maps.LatLngLiteral[]): boolean {
    let isInside = false;
    const x = point.lat;
    const y = point.lng;

    for (let i = 0, j = polygonCoords.length - 1; i < polygonCoords.length; j = i++) {
        const xi = polygonCoords[i].lat, yi = polygonCoords[i].lng;
        const xj = polygonCoords[j].lat, yj = polygonCoords[j].lng;

        const intersect = ((yi > y) !== (yj > y)) &&
                          (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }

    return isInside;
}
//Function that separates the markers based on their positions in the boundary
export function categorizeByBoundary(animals: Poi[], boundary: google.maps.LatLngLiteral[]) {
    const insideBoundary = animals.filter(animal => isPointInBoundary(animal.location, boundary));
    const outsideBoundary = animals.filter(animal => !isPointInBoundary(animal.location, boundary));

    return { insideBoundary, outsideBoundary };
}
