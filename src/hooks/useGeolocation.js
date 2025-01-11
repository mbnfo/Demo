import { useState } from "react";

export const useGeolocation = () => {
    const [locationInfo, setLocationInfo] = useState(null)
    const [locationError, setLocationError] = useState(null)

    const {geolocation} = navigator
    
    const successFN = (res) => {
        console.log({res})
        setLocationInfo(res.coords)
    }

    const errorFN = (res) => {
        console.log({res})
        setLocationError(res.message)
    }

    if (!locationError, !locationInfo){
        geolocation.getCurrentPosition(successFN, errorFN )
    }

    return {locationError, locationInfo}
}