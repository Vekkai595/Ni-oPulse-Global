import React, { useState } from "react";
import NavBar from "@/components/elnino/NavBar";
import HeroSection from "@/components/elnino/HeroSection";
import FilterBar from "@/components/elnino/FilterBar";
import WorldMap from "@/components/elnino/WorldMap";
import CountryGrid from "@/components/elnino/CountryGrid";
import CountryPanel from "@/components/elnino/CountryPanel";
import ENSOProbability from "@/components/elnino/ENSOProbability";
import ComparisonSection from "@/components/elnino/ComparisonSection";
import TimelineSection from "@/components/elnino/TimelineSection";
import QuizSection from "@/components/elnino/QuizSection";
import FooterSection from "@/components/elnino/FooterSection";

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [riskFilter, setRiskFilter] = useState("all");
  const [threatFilter, setThreatFilter] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <HeroSection />

      {/* Map Section */}
      <section className="px-4 py-8 max-w-7xl mx-auto" id="mapa">
        <FilterBar
          riskFilter={riskFilter}
          setRiskFilter={setRiskFilter}
          threatFilter={threatFilter}
          setThreatFilter={setThreatFilter}
        />
        <WorldMap
          riskFilter={riskFilter}
          threatFilter={threatFilter}
          onCountryClick={setSelectedCountry}
        />
      </section>

      <CountryGrid
        riskFilter={riskFilter}
        threatFilter={threatFilter}
        onCountryClick={setSelectedCountry}
      />

      <ENSOProbability />

      <ComparisonSection />

      <TimelineSection />

      <QuizSection />

      <FooterSection />

      {/* Country detail panel */}
      {selectedCountry && (
        <CountryPanel
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
}