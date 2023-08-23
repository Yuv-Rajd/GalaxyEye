import React, { useReducer, useState } from "react";

// import Third party
import { MapContainer, TileLayer, Polygon, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// import project file

import { statesData } from "./data/data";
import { checkIntersect } from "./util/checkIntersect";
import { reducer, initalStates } from "./hooks/reducer";

// Center To map
const center = [15.225861515798712, 75.7420330339098];

export default function App() {
  const [{ startLatLng, endLatLng, startPoint, endPoint }, dispatch] =
    useReducer(reducer, initalStates);

  const [selection, setSelection] = useState(true);

  const handleMouseClick = (e) => {
    setSelection((prevdata) => setSelection(!prevdata));

    if (selection) {
      const { lat, lng } = e.latlng;
      dispatch({ type: "startpoint", payload: [lat, lng] });
    } else {
      const { lat, lng } = e.latlng;
      dispatch({ type: "endpoint", payload: [lat, lng] });
    }
  };

  return (
    <MapContainer
      center={center}
      zoom={7}
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* Map  */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        onClick={() => {
          console.log("map");
        }}
      />
      {/*GeoJson Boundaries  */}
      {statesData.features.map((state) => {
        var res;
        const coordinates = state.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);
        if (endPoint[0] !== undefined && endPoint !== [] && selection) {
          res = checkIntersect([coordinates], startPoint, endPoint);
        }
        return (
          <Polygon
            pathOptions={{
              fillColor: res ? "red" : "#ffffff10",
              color: res ? "red" : "white",
              opacity: res ? 5 : 0.1,
              weight: 1,
            }}
            positions={coordinates}
            eventHandlers={{
              click: (e) => {
                handleMouseClick(e);
                const layer = e.target;
                layer.setStyle({
                  weight: 2,
                  opacity: 0.2,
                  fillColor: "#ffffff87",
                  color: "red",
                });
              },
            }}
          />
        );
      })}

      {/* AOI  */}
      {startLatLng && endLatLng && selection && (
        <Rectangle
          bounds={[startLatLng, endLatLng]}
          eventHandlers={{
            click: (e) => {
              handleMouseClick(e);
            },
          }}
        />
      )}
    </MapContainer>
  );
}
