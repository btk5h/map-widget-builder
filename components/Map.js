import { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { mapboxAccessToken } from "state/config";
import mapboxgl from "mapbox-gl";

export default function Map(props) {
  const {
    style = "mapbox://styles/mapbox/light-v10",
    interactive = true,
    center,
    marker,
    ...otherProps
  } = props;

  const mapContainer = useRef();
  const mapRef = useRef();
  const markerRef = useRef();
  const accessToken = useRecoilValue(mapboxAccessToken);

  useEffect(() => {
    if (mapContainer.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style,
        accessToken,
        interactive,
        zoom: 1,
      });

      markerRef.current = new mapboxgl.Marker();

      return () => {
        mapRef.current?.remove();
      };
    }
  }, [mapContainer.current, accessToken, interactive, style]);

  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.flyTo({
        center,
        zoom: 10,
      });
    }
  }, [mapRef.current, center]);

  useEffect(() => {
    if (mapRef.current && marker) {
      markerRef.current.setLngLat(marker).addTo(mapRef.current);
    }
  }, [mapRef.current, markerRef.current, marker]);

  return <Box w="100%" h={64} {...otherProps} ref={mapContainer} />;
}
