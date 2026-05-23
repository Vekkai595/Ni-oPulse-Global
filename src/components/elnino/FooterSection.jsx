import React from "react";
import { AlertTriangle, Globe, ExternalLink } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="px-4 py-12 mt-8">
      <div className="max-w-5xl mx-auto">
        {/* Disclaimer */}
        <div className="glass rounded-2xl p-6 mb-8 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display font-semibold text-foreground mb-2">Aviso Importante</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Os dados apresentados neste painel são <strong className="text-foreground">estimativas educacionais</strong> baseadas 
              em padrões históricos do El Niño e projeções climáticas gerais. As previsões climáticas mudam 
              frequentemente. Consulte sempre fontes oficiais como{" "}
              <strong className="text-primary">NOAA</strong>,{" "}
              <strong className="text-primary">WMO</strong>,{" "}
              <strong className="text-primary">INMET</strong> e agências meteorológicas nacionais para 
              informações atualizadas e oficiais.
            </p>
          </div>
        </div>

        {/* Sources */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { name: "NOAA/CPC", url: "https://www.cpc.ncep.noaa.gov/" },
            { name: "WMO", url: "https://public.wmo.int/" },
            { name: "INMET", url: "https://www.inmet.gov.br/" },
          ].map((source) => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors glass rounded-full px-4 py-2"
            >
              <ExternalLink className="w-3 h-3" />
              {source.name}
            </a>
          ))}
        </div>

        {/* Footer credit */}
        <div className="text-center border-t border-border pt-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-foreground">Monitor Global do El Niño</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Criado pelo estudante <strong className="text-foreground">Samuel Borba Cordeiro</strong> para 
            fins educacionais — <strong className="text-primary">Firjan SESI Caxias</strong>.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2026 — Dados educacionais • Não substitui fontes oficiais
          </p>
        </div>
      </div>
    </footer>
  );
}