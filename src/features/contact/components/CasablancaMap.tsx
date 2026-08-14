import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { BRAND_COLORS } from "../../../config/theme";

const CasablancaMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [33.5731, -7.5898],
      zoom: 12,
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      { maxZoom: 19 }
    ).addTo(map);

    L.control
      .zoom({ position: "bottomright" })
      .addTo(map);

    L.control
      .attribution({ position: "bottomleft", prefix: false })
      .addAttribution(
        `© <a href="https://www.openstreetmap.org/copyright" style="color:${BRAND_COLORS.taupe}">OSM</a> © <a href="https://carto.com" style="color:${BRAND_COLORS.taupe}">CARTO</a>`
      )
      .addTo(map);

    const markerIcon = L.divIcon({
      className: "",
      html: `
        <div class="casablanca-marker">
          <div class="casablanca-pulse"></div>
          <div class="casablanca-dot"></div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });

    L.marker([33.5731, -7.5898], { icon: markerIcon })
      .addTo(map)
      .bindTooltip("Casablanca, Morocco", {
        permanent: true,
        direction: "top",
        offset: [0, -26],
        className: "casablanca-label",
      });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        .casablanca-marker {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
        }
        .casablanca-pulse {
          position: absolute;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(61, 30, 22, 0.18);
          animation: map-pulse 2.4s ease-out infinite;
        }
        .casablanca-dot {
          position: relative;
          width: 14px;
          height: 14px;
          background: ${BRAND_COLORS.clay};
          border-radius: 50%;
          border: 2.5px solid #fff;
          box-shadow: 0 2px 10px rgba(61,30,22,0.45);
          z-index: 1;
        }
        @keyframes map-pulse {
          0%   { transform: scale(0.6); opacity: 0.8; }
          80%  { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .casablanca-label {
          background: ${BRAND_COLORS.clay} !important;
          color: #fff !important;
          border: none !important;
          border-radius: 8px !important;
          padding: 4px 11px !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          letter-spacing: 0.07em !important;
          box-shadow: 0 4px 14px rgba(61,30,22,0.28) !important;
          white-space: nowrap;
        }
        .casablanca-label::before {
          border-top-color: ${BRAND_COLORS.clay} !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12) !important;
        }
        .leaflet-control-zoom a {
          color: ${BRAND_COLORS.clay} !important;
          font-weight: 700 !important;
          border-radius: 6px !important;
          border: none !important;
          background: #fff !important;
        }
        .leaflet-control-zoom a:hover {
          background: ${BRAND_COLORS.cream} !important;
        }
        .leaflet-control-attribution {
          background: rgba(246,244,241,0.8) !important;
          font-size: 9px !important;
          border-radius: 6px 0 0 0 !important;
        }
      `}</style>
      <div
        ref={containerRef}
        className="w-full h-56 rounded-xl overflow-hidden border border-[#DEDAD5] shadow-sm"
      />
    </>
  );
};

export default CasablancaMap;
