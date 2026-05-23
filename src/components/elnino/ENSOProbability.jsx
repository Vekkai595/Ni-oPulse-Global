import React from "react";
import { motion } from "framer-motion";
import { ensoStatus } from "@/lib/elNinoData";
import { Info, Waves, Thermometer, Snowflake } from "lucide-react";

export default function ENSOProbability() {
  const phases = [
    { name: "El Niño", prob: ensoStatus.probability.elNino, color: "bg-accent", icon: <Thermometer className="w-5 h-5" /> },
    { name: "Neutro", prob: ensoStatus.probability.neutral, color: "bg-primary", icon: <Waves className="w-5 h-5" /> },
    { name: "La Niña", prob: ensoStatus.probability.laNina, color: "bg-chart-2", icon: <Snowflake className="w-5 h-5" /> },
  ];

  return (
    <section className="px-4 py-16 max-w-6xl mx-auto" id="probabilidade">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          Probabilidade <span className="text-primary">ENSO</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Probabilidade global de cada fase do ENSO para os próximos meses
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className={`${phase.color} bg-opacity-20 p-3 rounded-full`}>
                  {phase.icon}
                </div>
              </div>
              <h3 className="text-lg font-display font-semibold mb-3">{phase.name}</h3>
              <div className="relative h-3 bg-secondary rounded-full overflow-hidden mb-3">
                <motion.div
                  className={`absolute inset-y-0 left-0 ${phase.color} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${phase.prob}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + i * 0.1 }}
                />
              </div>
              <span className="text-3xl font-display font-bold">{phase.prob}%</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass rounded-2xl p-6 flex items-start gap-4"
        >
          <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Entenda os dados</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O El Niño é um fenômeno que ocorre no Oceano Pacífico Equatorial — ele não tem 
              "probabilidade por país". O que varia é o <strong className="text-foreground">risco de impacto</strong> em 
              cada região. As probabilidades acima referem-se à chance global de formação ou 
              continuação do El Niño, condições neutras ou La Niña. O mapa mostra como cada 
              país seria afetado caso o fenômeno se manifeste.
            </p>
            <p className="text-xs text-muted-foreground mt-3 italic">
              Fonte: {ensoStatus.source}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}