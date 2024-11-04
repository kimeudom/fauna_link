export type Animal = {
    animal_id: number,
    description: string,
    latitude: number,
    longitude: number,
    altitude: number,
    name: string,
    battery_level: number,
    signal_strength: number,
    species: string,
    timestamp: string
}

export async function fetchAnimals(): Promise<Animal[] | undefined> {
    
    try{
        const response = await fetch("http://localhost:5000/animals/latest_location")
        
        if(!response.ok){
            throw new Error('Unable to get animal data' + response.status)
        }

        const animals = await response.json()
        return animals;
    }
    catch (error){
        console.error('Error fetching animals', error)
    }
    
    
}