import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GeolocationComponent = ({ onLocationUpdate }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    city: null,
    state: null,
    country: null,
    error: null,
  });

  useEffect(() => {
    // Check if geolocation is available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Fetch the city and state using reverse geocoding from Nominatim
          try {
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

            const response = await axios.get(url);
            const address = response.data.address;

            // Extract city, state, and country
            const city = address.city || address.town || address.village;
            const state = address.state;
            //const country = address.country;

            setLocation({
              latitude,
              longitude,
              city,
              state,
              //country,
              error: null,
            });

            // Call the onLocationUpdate prop with the city and state
            onLocationUpdate(city, state);
          } catch (error) {
            setLocation((prevState) => ({
              ...prevState,
              error: 'Error fetching geolocation data.',
            }));
          }
        },
        (error) => {
          setLocation((prevState) => ({
            ...prevState,
            error: error.message,
          }));
        }
      );
    } else {
      setLocation((prevState) => ({
        ...prevState,
        error: 'Geolocation is not supported by this browser.',
      }));
    }
  }, [onLocationUpdate]);

  return (
    <div>
      {location.error ? (
        <p> Please enable location tracking to make sure you get the best investigator close to you</p>
      ) : (
        <div>
          <p>{location.city},  {location.state}</p>
        </div>
      )}
    </div>
    
  );
};

export default GeolocationComponent;
