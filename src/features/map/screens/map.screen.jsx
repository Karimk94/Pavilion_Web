import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styled from "styled-components";
import { LocationContext } from "../../../services/location/location.context";
import { ShopsContext } from "../../../services/shops/shops.context";
import { MapCallout } from "../components/map-callout.component";
import { Search } from "../components/search.component";

// Import marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Custom marker icon to resolve marker issues in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapContainerStyled = styled(MapContainer)`
  height: 100vh;
  width: 100vw;
`;

export const MapScreen = ({ navigation }) => {
  const { countryCode } = useContext(LocationContext);
  const { shops = [] } = useContext(ShopsContext);

  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = countryCode;

  useEffect(() => {
    const northeastLat = viewport?.northeast?.lat;
    const southwestLat = viewport?.southwest?.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [countryCode, viewport]);

  return (
    <>
      <Search />
      <MapContainerStyled center={[lat, lng]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {shops.map((shop) => (
          <Marker
            key={shop.name}
            position={[
              shop?.geometry?.location?.lat,
              shop?.geometry?.location?.lng,
            ]}
          >
            <Popup>
              <MapCallout shop={shop} />
              <button
                onClick={() =>
                  navigation.navigate("ShopDetail", {
                    shop,
                  })
                }
              >
                View Details
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainerStyled>
    </>
  );
};
