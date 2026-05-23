import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Droplets, Thermometer, CloudRain, Wheat, Shield, Flame, CloudLightning, AlertTriangle } from "lucide-react";
import { riskColors, riskLabels, threatLabels } from "@/lib/elNinoData";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const threatIconMap = {
  seca: Droplets,
  enchentes: CloudRain,
  calor: Thermometer,
  agricultura: Wheat,
  queimadas: Flame,
  "chuva intensa": CloudLightning,
};

export default function CountryPanel({ country, onClose }) {
  if (!country) return null;

  const riskColor = riskColors[country.nivelDeRisco];

  return (
    <AnimatePresence>
      {country && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg z-50 glass-strong shadow-2xl"
          >
            <ScrollArea className="h-full">
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">{country.nome}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{country.continente}</span>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-secondary transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Risk badge */}
                <div className="flex items-center gap-3 mb-6 p-4 rounded-xl" style={{ backgroundColor: `${riskColor}15` }}>
                  <AlertTriangle className="w-6 h-6" style={{ color: riskColor }} />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Nível de Risco</p>
                    <p className="text-lg font-display font-bold" style={{ color: riskColor }}>
                      {riskLabels[country.nivelDeRisco]}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs text-muted-foreground">Confiança</p>
                    <p className="text-sm font-semibold text-foreground">{country.confianca}</p>
                  </div>
                </div>

                {/* Threats */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {country.ameacas.map((ameaca) => {
                    const Icon = threatIconMap[ameaca] || AlertTriangle;
                    return (
                      <Badge key={ameaca} variant="secondary" className="flex items-center gap-1.5 bg-secondary/80">
                        <Icon className="w-3.5 h-3.5" />
                        {threatLabels[ameaca] || ameaca}
                      </Badge>
                    );
                  })}
                </div>

                {/* Sections */}
                <div className="space-y-5">
                  <InfoSection title="Resumo Climático" content={country.resumoClimatico} />
                  <InfoSection title="Impacto do El Niño" content={country.impactoDoElNino} />
                  <InfoSection title="Regiões Mais Afetadas" content={country.regioesAfetadas} />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ImpactCard icon={<Wheat className="w-4 h-4" />} title="Agricultura" content={country.impactoNaAgricultura} />
                    <ImpactCard icon={<Droplets className="w-4 h-4" />} title="Água" content={country.impactoNaAgua} />
                    <ImpactCard icon={<Thermometer className="w-4 h-4" />} title="Temperatura" content={country.impactoNaTemperatura} />
                    <ImpactCard icon={<CloudRain className="w-4 h-4" />} title="Chuvas" content={country.impactoNasChuvas} />
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 p-4 rounded-xl bg-secondary/50 border border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    ⚠️ As previsões climáticas mudam frequentemente. Consulte sempre fontes 
                    oficiais como NOAA, WMO, INMET e agências meteorológicas nacionais.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function InfoSection({ title, content }) {
  return (
    <div>
      <h3 className="text-sm font-display font-semibold text-primary uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
    </div>
  );
}

function ImpactCard({ icon, title, content }) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2 text-primary">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{content}</p>
    </div>
  );
}