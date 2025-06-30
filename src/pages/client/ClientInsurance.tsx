
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Shield, Phone, Mail } from "lucide-react";

const ClientInsurance = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-orbitron font-bold text-rust-400">
          Pojištění
        </h1>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="border-rust-800/30 text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-orbitron text-rust-400 mb-2">
              Pojištění pro účastníky kurzů
            </CardTitle>
            <p className="text-muted-foreground">
              Pro vaši bezpečnost během našich kurzů doporučujeme sjednat cestovní pojištění. 
              Spolupracujeme s renomovanou pojišťovnou Allianz.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 bg-card/50 rounded-lg border border-rust-800/20">
                <h4 className="font-semibold text-foreground mb-2">Pokrytí</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Úrazové pojištění</li>
                  <li>• Zdravotní péče</li>
                  <li>• Evakuace z terénu</li>
                </ul>
              </div>
              <div className="p-4 bg-card/50 rounded-lg border border-rust-800/20">
                <h4 className="font-semibold text-foreground mb-2">Výhody</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• 24/7 asistence</li>
                  <li>• Rychlé vyřízení</li>
                  <li>• Partnerské sazby</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-rust-800/20 pt-6">
              <a 
                href="https://www.allianz.cz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-rajdhani font-bold"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Sjednat pojištění u Allianz
                </Button>
              </a>
              <p className="text-xs text-muted-foreground mt-2">
                Budete přesměrováni na stránky pojišťovny Allianz
              </p>
            </div>

            <div className="border-t border-rust-800/20 pt-4">
              <h4 className="font-semibold text-foreground mb-3">Potřebujete pomoc?</h4>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+420 123 456 789</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>info@prezijto.cz</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientInsurance;
