import React from "react";
import { motion } from "framer-motion";
import { Globe, AlertTriangle, TrendingDown, Activity } from "lucide-react";
import { ensoStatus } from "@/lib/elNinoData";

export default function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/3" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Atualizado: {ensoStatus.lastUpdate}</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 text-glow"
        >
          <span className="text-primary">Monitor Global</span>
          <br />
          <span className="text-foreground">do El Niño</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 font-light leading-relaxed"
        >
          Mapa interativo de riscos climáticos, impactos regionais e probabilidade do ENSO
        </motion.p>

        {/* Status cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <StatusCard
            icon={<Globe className="w-5 h-5" />}
            label="Fase Atual"
            value={ensoStatus.currentPhase}
            color="text-primary"
          />
          <StatusCard
            icon={<AlertTriangle className="w-5 h-5" />}
            label="El Niño"
            value={`${ensoStatus.probability.elNino}%`}
            color="text-accent"
          />
          <StatusCard
            icon={<TrendingDown className="w-5 h-5" />}
            label="La Niña"
            value={`${ensoStatus.probability.laNina}%`}
            color="text-chart-2"
          />
          <StatusCard
            icon={<Activity className="w-5 h-5" />}
            label="SST Anomalia"
            value={ensoStatus.sst}
            color="text-chart-5"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8"
        >
          <p className="text-sm text-muted-foreground italic">
            {ensoStatus.trend}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function StatusCard({ icon, label, value, color }) {
  return (
    <div className="glass rounded-xl p-4 glow-cyan hover:scale-105 transition-transform duration-300">
      <div className={`flex items-center gap-2 mb-2 ${color}`}>
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-lg font-display font-bold text-foreground">{value}</p>
    </div>
  );
}