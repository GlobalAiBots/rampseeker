"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon in webpack/Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface RampPin {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  city?: string;
  lake?: string;
}

interface RampMapProps {
  ramps: RampPin[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
  linkPrefix?: string;
}

export default function RampMap({ ramps, center = [39.8, -98.5], zoom = 4, height = "400px", className = "", linkPrefix = "/ramps" }: RampMapProps) {
  return (
    <div className={`rounded-xl overflow-hidden border border-gray-200 shadow-sm ${className}`} style={{ height }}>
      <MapContainer center={center} zoom={zoom} style={{ width: "100%", height: "100%" }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {ramps.map((r) => (
          <Marker key={r.id} position={[r.latitude, r.longitude]} icon={blueIcon}>
            <Popup>
              <div className="text-sm">
                <p className="font-bold text-charcoal">{r.name}</p>
                {r.lake && <p className="text-gray-500 text-xs">Lake: {r.lake}</p>}
                {r.city && <p className="text-gray-500 text-xs">{r.city}</p>}
                <Link href={`${linkPrefix}/${r.id}`} className="text-water text-xs font-semibold hover:underline mt-1 inline-block">View Details &rarr;</Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
