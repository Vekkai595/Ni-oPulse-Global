import React from "react";
import { motion } from "framer-motion";
import { Thermometer, Snowflake, Sun, CloudRain, Droplets, Wind, ArrowUp, ArrowDown } from "lucide-react";

const elNinoTraits = [
  { icon: <Thermometer className="w-5 h-5" />, label: "Águas do Pacífico", desc: "Aquecimento anormal (+1.5 a +3°C)" },
  { icon: <Sun className="w-5 h-5" />, label: "Temperatura global", desc: "Aumento da temperatura média" },
  { icon: <Droplets className="w-5 h-5" />, label: "Seca", desc: "Seca intensa na Ásia, Oceania e Nordeste do Brasil" },
  { icon: <CloudRain className="w-5 h-5" />, label: "Chuvas", desc: "Enchentes no Sul do Brasil e costa do Peru" },
  { icon: <Wind className="w-5 h-5" />, label: "Ventos", desc: "Ventos alísios enfraquecem" },
  { icon: <ArrowUp className="w-5 h-5" />, label: "Nível do mar", desc: "Sobe na costa das Américas" },
];

const laNinaTraits = [
  { icon: <Snowflake className="w-5 h-5" />, label: "Águas do Pacífico", desc: "Resfriamento anormal (-1 a -2°C)" },
  { icon: <ArrowDown className="w-5 h-5" />, label: "Temperatura global", desc: "Tendência de resfriamento" },
  { icon: <CloudRain className="w-5 h-5" />, label: "Chuvas", desc: "Mais chuvas no Norte/Nordeste do Brasil e Ásia" },
  { icon: <Droplets className="w-5 h-5" />, label: "Seca", desc: "Seca no Sul do Brasil e Argentina" },
  { icon: <Wind className="w-5 h-5" />, label: "Ventos", desc: "Ventos alísios se intensificam" },
  { icon: <ArrowDown className="w-5 h-5" />, label: "Nível do mar", desc: "Sobe na Oceania e Ásia" },
];

export default function ComparisonSection() {
  return (
    <section className="px-4 py-16 max-w-6xl mx-auto" id="comparacao">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          El Niño <span className="text-muted-foreground">vs</span> La Niña
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Duas faces do mesmo fenômeno climático — o ENSO — com efeitos opostos no clima global
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* El Niño */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-6 glow-orange"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-accent/20">
                <Thermometer className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-accent">El Niño</h3>
                <p className="text-xs text-muted-foreground">Fase Quente do ENSO</p>
              </div>
            </div>
            <div className="space-y-4">
              {elNinoTraits.map((trait, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="text-accent mt-0.5">{trait.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{trait.label}</p>
                    <p className="text-xs text-muted-foreground">{trait.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* La Niña */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6 glow-cyan"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/20">
                <Snowflake className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-primary">La Niña</h3>
                <p className="text-xs text-muted-foreground">Fase Fria do ENSO</p>
              </div>
            </div>
            <div className="space-y-4">
              {laNinaTraits.map((trait, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="text-primary mt-0.5">{trait.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{trait.label}</p>
                    <p className="text-xs text-muted-foreground">{trait.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}