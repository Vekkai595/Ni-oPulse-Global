import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { countries, riskColors, riskLabels, threatLabels } from "@/lib/elNinoData";
import { MapPin, AlertTriangle, Droplets, CloudRain, Thermometer, Wheat, Flame, CloudLightning } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const threatIconMap = {
  seca: Droplets,
  enchentes: CloudRain,
  calor: Thermometer,
  agricultura: Wheat,
  queimadas: Flame,
  "chuva intensa": CloudLightning,
};

export default function CountryGrid({ riskFilter, threatFilter, onCountryClick }) {
  const filteredCountries = useMemo(() => {
    return countries.filter((c) => {
      const riskMatch = riskFilter === "all" || c.nivelDeRisco === riskFilter;
      const threatMatch = !threatFilter || c.ameacas.includes(threatFilter);
      return riskMatch && threatMatch;
    });
  }, [riskFilter, threatFilter]);

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        Todos os Países ({filteredCountries.length})
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries.map((country, i) => {
          const color = riskColors[country.nivelDeRisco];
          return (
            <motion.button
              key={country.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.5) }}
              onClick={() => onCountryClick(country)}
              className="glass rounded-xl p-4 text-left hover:scale-[1.02] transition-all duration-200 group cursor-pointer"
              style={{ borderColor: `${color}30` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                    {country.nome}
                  </h4>
                  <span className="text-xs text-muted-foreground">{country.continente}</span>
                </div>
                <span
                  className="text-xs font-bold px-2 py-1 rounded-full"
                  style={{ backgroundColor: `${color}20`, color }}
                >
                  {riskLabels[country.nivelDeRisco]}
                </span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                {country.impactoDoElNino}
              </p>

              <div className="flex flex-wrap gap-1">
                {country.ameacas.map((a) => {
                  const Icon = threatIconMap[a] || AlertTriangle;
                  return (
                    <span key={a} className="inline-flex items-center gap-1 text-[10px] bg-secondary/60 text-muted-foreground px-1.5 py-0.5 rounded">
                      <Icon className="w-3 h-3" />
                      {threatLabels[a] || a}
                    </span>
                  );
                })}
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}