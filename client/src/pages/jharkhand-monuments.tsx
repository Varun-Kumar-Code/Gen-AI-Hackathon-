import { useState } from "react";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import JharkhandMapComponent from "@/components/jharkhand/MapComponent";

export default function JharkhandMonuments() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between py-4 md:py-6 bg-background border-b border-border">
          <Button
            variant="ghost"
            onClick={() => setLocation("/explore")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Jharkhand Monuments Guide
          </h1>
          
          <div className="w-20" /> {/* Spacer for centering */}
        </header>

        {/* Jharkhand Map Component */}
        <div className="py-4">
          <JharkhandMapComponent />
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}