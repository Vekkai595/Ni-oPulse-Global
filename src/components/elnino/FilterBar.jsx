import React from "react";
import { motion } from "framer-motion";
import { Filter, Droplets, CloudRain, Thermometer, Wheat, Flame, CloudLightning, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const riskFilters = [
  { value: "all", label: "Todos", color: "bg-muted text-foreground" },
  { value: "baixo", label: "Baixo", color: "bg-risk-low/20 text-risk-low" },
  { value: "moderado", label: "Moderado", color: "bg-risk-moderate/20 text-risk-moderate" },
  { value: "alto", label: "Alto", color: "bg-risk-high/20 text-risk-high" },
  { value: "extremo", label: "Extremo", color: "bg-risk-extreme/20 text-risk-extreme" },
];

const threatFilters = [
  { value: "seca", label: "Seca", icon: <Droplets className="w-3.5 h-3.5" /> },
  { value: "chuva intensa", label: "Chuva Intensa", icon: <CloudLightning className="w-3.5 h-3.5" /> },
  { value: "calor", label: "Calor", icon: <Thermometer className="w-3.5 h-3.5" /> },
  { value: "agricultura", label: "Agricultura", icon: <Wheat className="w-3.5 h-3.5" /> },
  { value: "queimadas", label: "Queimadas", icon: <Flame className="w-3.5 h-3.5" /> },
  { value: "enchentes", label: "Enchentes", icon: <CloudRain className="w-3.5 h-3.5" /> },
];

export default function FilterBar({ riskFilter, setRiskFilter, threatFilter, setThreatFilter }) {
  const hasFilters = riskFilter !== "all" || threatFilter !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-4 md:p-6 mb-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-primary" />
        <span className="text-sm font-display font-semibold text-foreground">Filtros</span>
        {hasFilters && (
          <button
            onClick={() => { setRiskFilter("all"); setThreatFilter(null); }}
            className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3 h-3" /> Limpar
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Nível de Risco</p>
          <div className="flex flex-wrap gap-2">
            {riskFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setRiskFilter(f.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  riskFilter === f.value
                    ? `${f.color} ring-1 ring-current scale-105`
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Tipo de Impacto</p>
          <div className="flex flex-wrap gap-2">
            {threatFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setThreatFilter(threatFilter === f.value ? null : f.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  threatFilter === f.value
                    ? "bg-primary/20 text-primary ring-1 ring-primary scale-105"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}