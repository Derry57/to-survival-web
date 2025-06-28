
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";

const Index = () => {
  const instructors = [
    { name: "Ritchie", specialty: "Urban Survival", experience: "15+ let" },
    { name: "Pepa", specialty: "Wilderness Expert", experience: "12+ let" },
    { name: "Milan", specialty: "Medical Training", experience: "18+ let" },
    { name: "Zdeněk", specialty: "Tactical Skills", experience: "20+ let" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-orbitron font-black text-rust-400 mb-6 text-glow animate-pulse">
              PřežíTO
            </h1>
            <p className="text-xl md:text-2xl font-rajdhani text-muted-foreground mb-8 max-w-2xl mx-auto">
              Profesionální survival training pro ty, kteří chtějí být připraveni na vše.
              V post-apokalyptickém světě není místo pro slabé.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Link to="/courses">
                <Card className="rust-texture border-rust-800/30 hover:border-rust-600/50 transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rust-500 to-rust-700 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h3 className="text-2xl font-orbitron font-bold text-rust-400 mb-2">KURZY</h3>
                    <p className="text-muted-foreground font-rajdhani">
                      Survival kurzy všech úrovní - od základů po pokročilé techniky
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/instructors">
                <Card className="wasteland-texture border-wasteland-700/30 hover:border-wasteland-500/50 transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-wasteland-500 to-wasteland-700 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">👥</span>
                    </div>
                    <h3 className="text-2xl font-orbitron font-bold text-wasteland-400 mb-2">INSTRUKTOŘI</h3>
                    <p className="text-muted-foreground font-rajdhani">
                      Zkušení profesionálové s léty praxe v extrémních podmínkách
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/calendar">
                <Card className="rust-texture border-rust-800/30 hover:border-rust-600/50 transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rust-500 to-rust-700 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📅</span>
                    </div>
                    <h3 className="text-2xl font-orbitron font-bold text-rust-400 mb-2">KALENDÁŘ</h3>
                    <p className="text-muted-foreground font-rajdhani">
                      Nejbližší termíny kurzů a expedic
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Instructors Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-orbitron font-bold text-center text-rust-400 mb-12">
            NAŠI INSTRUKTOŘI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((instructor, index) => (
              <Card key={index} className="bg-card/30 border-rust-800/20 hover:border-rust-600/40 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-rust-600 to-rust-800 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-orbitron font-bold text-white">
                      {instructor.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-orbitron font-bold text-rust-400 mb-2">
                    {instructor.name}
                  </h3>
                  <p className="text-sm text-wasteland-400 font-rajdhani font-medium mb-1">
                    {instructor.specialty}
                  </p>
                  <p className="text-xs text-muted-foreground font-rajdhani">
                    {instructor.experience}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-orbitron font-bold text-rust-400 mb-6">
            PŘIPRAVEN NA VÝZVU?
          </h2>
          <p className="text-lg text-muted-foreground font-rajdhani mb-8 max-w-2xl mx-auto">
            V post-apokalyptickém světě přežijí pouze ti nejpřipravenější. 
            Začni svou cestu už dnes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses">
              <Button size="lg" className="bg-rust-600 hover:bg-rust-700 text-white font-rajdhani font-bold text-lg px-8">
                ZOBRAZIT KURZY
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-wasteland-600 text-wasteland-400 hover:bg-wasteland-600 hover:text-white font-rajdhani font-bold text-lg px-8">
                KONTAKTOVAT NÁS
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
