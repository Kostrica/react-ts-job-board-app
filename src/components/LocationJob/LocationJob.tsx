import React, { useCallback, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { API_KEY } from '../../utils/BaseURL';
import { ILocationJob } from "../../models/models";
import { defaultTheme } from "./Theme";

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme,
};

const LocationJob = ({ location }: ILocationJob) => {
  const { lat, long: lng } = location;
  const center = { lat, lng };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const mapRef = useRef(null);

  const onLoad = useCallback((map: any) => {
    mapRef.current = map;
  }, [])

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={2}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={defaultOptions}
    >
      <Marker position={center} icon={{url: '/place-point.svg'}} />
    </GoogleMap>
  ) : <></>
}

export default React.memo(LocationJob);
