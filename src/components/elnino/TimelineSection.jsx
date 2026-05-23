import React from "react";
import { motion } from "framer-motion";
import { Waves, Thermometer, Flame, TrendingDown, RefreshCw } from "lucide-react";
import { timelineEvents } from "@/lib/elNinoData";

const iconMap = {
  Waves, Thermometer, Flame, TrendingDown, RefreshCw
};

const colorMap = {
  "primary": "text-primary border-primary bg-primary/10",
  "chart-5": "text-chart-5 border-chart-5 bg-chart-5/10",
  "destructive": "text-destructive border-destructive bg-destructive/10",
  "accent": "text-accent border-accent bg-accent/10",
  "chart-2": "text-chart-2 border-chart-2 bg-chart-2/10",
};

export default function TimelineSection() {
  return (
    <section className="px-4 py-16 max-w-5xl mx-auto" id="timeline">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          Linha do <span className="text-primary">Tempo</span>
        </h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          O ciclo do El Niño: do surgimento ao enfraquecimento
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

          {timelineEvents.map((event, i) => {
            const Icon = iconMap[event.icon];
            const colors = colorMap[event.color];
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex items-center mb-8 md:mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Icon circle */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${colors}`}>
                    {Icon && <Icon className="w-5 h-5" />}
                  </div>
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-[45%] ${isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-auto"}`}>
                  <div className="glass rounded-xl p-5 hover:scale-[1.02] transition-transform duration-300">
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                        Fase {i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">{event.phase}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}