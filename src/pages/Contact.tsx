
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-orbitron font-bold text-rust-400 mb-4 text-glow">
              KONTAKT
            </h1>
            <p className="text-xl text-muted-foreground font-rajdhani max-w-3xl mx-auto">
              Máš otázky o kurzech nebo chceš kurz na míru? 
              Kontaktuj nás a připojíme tě k těm, kteří jsou připraveni na vše.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Kontaktní formulář */}
            <Card className="rust-texture bg-card/30 border-rust-800/30">
              <CardHeader>
                <CardTitle className="text-2xl font-orbitron font-bold text-rust-400">
                  POŠLI NÁM ZPRÁVU
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-rajdhani font-medium text-wasteland-400 mb-2">
                        Jméno *
                      </label>
                      <Input 
                        className="bg-background/50 border-wasteland-700 focus:border-rust-500 font-rajdhani"
                        placeholder="Tvoje jméno"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-rajdhani font-medium text-wasteland-400 mb-2">
                        Příjmení *
                      </label>
                      <Input 
                        className="bg-background/50 border-wasteland-700 focus:border-rust-500 font-rajdhani"
                        placeholder="Tvoje příjmení"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-wasteland-400 mb-2">
                      Email *
                    </label>
                    <Input 
                      type="email"
                      className="bg-background/50 border-wasteland-700 focus:border-rust-500 font-rajdhani"
                      placeholder="tvuj@email.cz"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-wasteland-400 mb-2">
                      Telefon
                    </label>
                    <Input 
                      type="tel"
                      className="bg-background/50 border-wasteland-700 focus:border-rust-500 font-rajdhani"
                      placeholder="+420 123 456 789"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-wasteland-400 mb-2">
                      Předmět
                    </label>
                    <Input 
                      className="bg-background/50 border-wasteland-700 focus:border-rust-500 font-rajdhani"
                      placeholder="O čem chceš mluvit?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-rajdhani font-medium text-wasteland-400 mb-2">
                      Zpráva *
                    </label>
                    <Textarea 
                      className="bg-background/50 border-wasteland-700 focus:border-rust-500 font-rajdhani min-h-[120px]"
                      placeholder="Napiš nám, co potřebuješ..."
                    />
                  </div>
                  
                  <Button className="w-full bg-rust-600 hover:bg-rust-700 text-white font-rajdhani font-bold text-lg">
                    ODESLAT ZPRÁVU
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Kontaktní informace */}
            <div className="space-y-6">
              <Card className="wasteland-texture bg-card/30 border-wasteland-700/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron font-bold text-wasteland-400">
                    KONTAKTNÍ ÚDAJE
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-rajdhani font-bold text-rust-400 mb-1">📧 Email</h4>
                    <p className="text-muted-foreground font-rajdhani">info@prezito.cz</p>
                  </div>
                  <div>
                    <h4 className="font-rajdhani font-bold text-rust-400 mb-1">📱 Telefon</h4>
                    <p className="text-muted-foreground font-rajdhani">+420 777 888 999</p>
                  </div>
                  <div>
                    <h4 className="font-rajdhani font-bold text-rust-400 mb-1">📍 Adresa</h4>
                    <p className="text-muted-foreground font-rajdhani">
                      Survival Base Camp<br/>
                      Lesní 42<br/>
                      252 28 Černošice
                    </p>
                  </div>
                  <div>
                    <h4 className="font-rajdhani font-bold text-rust-400 mb-1">🕒 Provozní doba</h4>
                    <p className="text-muted-foreground font-rajdhani">
                      Po-Pá: 9:00 - 18:00<br/>
                      So-Ne: Na domluvě
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rust-texture bg-card/30 border-rust-800/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron font-bold text-rust-400">
                    RYCHLÉ KONTAKTY
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-background/30 rounded border border-wasteland-700/30">
                      <h4 className="font-orbitron font-bold text-wasteland-400 mb-1">Ritchie</h4>
                      <p className="text-xs text-muted-foreground font-rajdhani mb-2">Urban Survival</p>
                      <p className="text-sm text-foreground font-rajdhani">+420 777 111 222</p>
                    </div>
                    <div className="text-center p-4 bg-background/30 rounded border border-wasteland-700/30">
                      <h4 className="font-orbitron font-bold text-wasteland-400 mb-1">Pepa</h4>
                      <p className="text-xs text-muted-foreground font-rajdhani mb-2">Wilderness</p>
                      <p className="text-sm text-foreground font-rajdhani">+420 777 333 444</p>
                    </div>
                    <div className="text-center p-4 bg-background/30 rounded border border-wasteland-700/30">
                      <h4 className="font-orbitron font-bold text-wasteland-400 mb-1">Milan</h4>
                      <p className="text-xs text-muted-foreground font-rajdhani mb-2">Tactical Medic</p>
                      <p className="text-sm text-foreground font-rajdhani">+420 777 555 666</p>
                    </div>
                    <div className="text-center p-4 bg-background/30 rounded border border-wasteland-700/30">
                      <h4 className="font-orbitron font-bold text-wasteland-400 mb-1">Zdeněk</h4>
                      <p className="text-xs text-muted-foreground font-rajdhani mb-2">Tactical Ops</p>
                      <p className="text-sm text-foreground font-rajdhani">+420 777 777 888</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="wasteland-texture bg-card/30 border-wasteland-700/30">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron font-bold text-wasteland-400">
                    ČASTO KLADENÉ OTÁZKY
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm font-rajdhani">
                    <div>
                      <h4 className="font-bold text-rust-400 mb-1">Jakou výbavu si mám přinést?</h4>
                      <p className="text-muted-foreground">
                        Detailní seznam výbavy pošleme po rezervaci kurzu. Základní vybavení poskytujeme.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-rust-400 mb-1">Jsou kurzy vhodné pro úplné začátečníky?</h4>
                      <p className="text-muted-foreground">
                        Ano, máme kurzy pro všechny úrovně. Level 1 je určen přímo pro začátečníky.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-rust-400 mb-1">Co když bude špatné počasí?</h4>
                      <p className="text-muted-foreground">
                        Kurzy probíhají za každého počasí - to je součást survival tréninku.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
