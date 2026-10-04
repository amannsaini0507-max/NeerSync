import React, { useEffect, useRef } from 'react';

interface GISMapProps {
  center?: [number, number];
  zoom?: number;
  fhtcs?: Array<{ id: string; lat: number; lon: number; status: string; name: string }>;
  nodes?: Array<{ id: string; lat: number; lon: number; type: string; status: string }>;
}

export const GISMap: React.FC<GISMapProps> = ({
  center = [77.7060, 28.9845],
  zoom = 15,
  fhtcs = [],
  nodes = []
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    const maplibre = (window as any).maplibregl;

    if (!maplibre) {
      // Dynamic load MapLibre JS script if not present in window
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js';
      script.async = true;
      script.onload = () => initMap(maplibre || (window as any).maplibregl);
      document.body.appendChild(script);
    } else {
      initMap(maplibre);
    }

    function initMap(ml: any) {
      if (!ml || mapInstance.current || !mapContainer.current) return;

      const map = new ml.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'osm-tiles': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap Contributors'
            }
          },
          layers: [
            {
              id: 'osm-layer',
              type: 'raster',
              source: 'osm-tiles',
              minzoom: 0,
              maxzoom: 19
            }
          ]
        },
        center: center,
        zoom: zoom
      });

      map.addControl(new ml.NavigationControl(), 'top-right');
      mapInstance.current = map;

      // Add FHTC Household Pins
      fhtcs.forEach((fhtc) => {
        if (!fhtc.lat || !fhtc.lon) return;
        const color = fhtc.status === 'functional' ? '#16a34a' : fhtc.status === 'intermittent' ? '#ca8a04' : '#dc2626';

        const el = document.createElement('div');
        el.className = 'fhtc-marker';
        el.style.width = '14px';
        el.style.height = '14px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = color;
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';

        const popup = new ml.Popup({ offset: 15 }).setHTML(`
          <div style="font-size: 13px;">
            <strong>${fhtc.id}</strong><br/>
            <span>Status: <b style="color: ${color}">${fhtc.status.toUpperCase()}</b></span><br/>
            <span>${fhtc.name}</span>
          </div>
        `);

        new ml.Marker(el).setLngLat([fhtc.lon, fhtc.lat]).setPopup(popup).addTo(map);
      });

      // Add IoT Node Station Pins
      nodes.forEach((node) => {
        if (!node.lat || !node.lon) return;
        const el = document.createElement('div');
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '6px';
        el.style.backgroundColor = '#0284c7';
        el.style.color = '#ffffff';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.fontSize = '12px';
        el.style.fontWeight = 'bold';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 3px 8px rgba(0,0,0,0.3)';
        el.innerText = node.type === 'pump' ? '⚡' : node.type === 'esr_level' ? '🏰' : node.type === 'quality' ? '🧪' : '💧';

        const popup = new ml.Popup({ offset: 15 }).setHTML(`
          <div style="font-size: 13px;">
            <strong>IoT Node: ${node.id}</strong><br/>
            <span>Type: <b>${node.type.toUpperCase()}</b></span><br/>
            <span>Status: <b style="color: green">${node.status.toUpperCase()}</b></span>
          </div>
        `);

        new ml.Marker(el).setLngLat([node.lon, node.lat]).setPopup(popup).addTo(map);
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [fhtcs, nodes]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '420px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(255,255,255,0.92)', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', display: 'flex', gap: '12px', zIndex: 10 }}>
        <span>🟢 Functional</span>
        <span>🟡 Intermittent</span>
        <span>🔴 Non-Functional</span>
        <span>⚡ IoT Pump / ESR</span>
      </div>
    </div>
  );
};
