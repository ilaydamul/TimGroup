import { createContext, useState } from "react";

export const LocationContext = createContext();
export const LocationProvider = ({ children }) => {
    const [getLocation, setGetLocation] = useState([]);

    return (
        <LocationContext.Provider value={{ getLocation, setGetLocation }}>
            {children}
        </LocationContext.Provider>
    )
}