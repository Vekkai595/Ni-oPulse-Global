import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import { countries, riskColors, riskLabels, threatLabels } from "@/lib/elNinoData";
import { AlertTriangle } from "lucide-react";
import "leaflet/dist/leaflet.css";

const riskRadius = {
  baixo: 6,
  moderado: 8,
  alto: 10,
  extremo: 13,
};

export default function WorldMap({ riskFilter, threatFilter, onCountryClick }) {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const filteredCountries = useMemo(() => {
    return countries.filter((c) => {
      const riskMatch = riskFilter === "all" || c.nivelDeRisco === riskFilter;
      const threatMatch = !threatFilter || c.ameacas.includes(threatFilter);
      return riskMatch && threatMatch;
    });
  }, [riskFilter, threatFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl overflow-hidden glow-cyan"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-display font-semibold">Mapa de Risco Global</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {filteredCountries.length} países exibidos
        </span>
      </div>

      <div className="h-[400px] md:h-[550px] relative">
        <MapContainer
          center={[15, 0]}
          zoom={2}
          minZoom={2}
          maxZoom={6}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%", background: "hsl(215, 28%, 7%)" }}
          className="rounded-b-2xl"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />

          {filteredCountries.map((country) => {
            const color = riskColors[country.nivelDeRisco];
            const radius = riskRadius[country.nivelDeRisco];
            const isHovered = hoveredCountry === country.id;

            return (
              <CircleMarker
                key={country.id}
                center={[country.lat, country.lng]}
                radius={isHovered ? radius + 4 : radius}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: isHovered ? 0.9 : 0.7,
                  color: color,
                  weight: isHovered ? 3 : 1.5,
                  opacity: isHovered ? 1 : 0.8,
                }}
                eventHandlers={{
                  click: () => onCountryClick(country),
                  mouseover: () => setHoveredCountry(country.id),
                  mouseout: () => setHoveredCountry(null),
                }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -10]}
                  className="custom-tooltip"
                >
                  <div className="bg-card border border-border rounded-lg p-3 shadow-xl min-w-[220px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-foreground text-sm">{country.nome}</span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${color}25`, color }}
                      >
                        {riskLabels[country.nivelDeRisco]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                      {country.impactoDoElNino.substring(0, 100)}...
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {country.ameacas.slice(0, 3).map((a) => (
                        <span key={a} className="text-[10px] bg-secondary px-1.5 py-0.5 rounded text-secondary-foreground">
                          {threatLabels[a] || a}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-primary mt-2">Clique para ver detalhes →</p>
                  </div>
                </Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-border flex flex-wrap items-center gap-4">
        <span className="text-xs text-muted-foreground">Legenda:</span>
        {Object.entries(riskColors).map(([level, color]) => (
          <div key={level} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-muted-foreground">{riskLabels[level]}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}