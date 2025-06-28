
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const Instructors = () => {
  const instructors = [
    {
      name: "Ritchie",
      fullName: "Richard Novák",
      specialty: "Urban Survival Expert",
      experience: "15+ let",
      certifications: ["CMAS Instructor", "Military Survival", "TCCC Certified"],
      description: "Specialist na přežití v městském prostředí s vojenskou zkušeností. Zaměřuje se na taktické dovednosti a krizové situace v civilním prostředí.",
      achievements: [
        "Vojenský výcvik NATO",
        "Instruktor sebeobrany",
        "Konzultant bezpečnostních agentur",
        "Autor survival příruček"
      ]
    },
    {
      name: "Pepa",
      fullName: "Josef Svoboda", 
      specialty: "Wilderness Expert",
      experience: "12+ let",
      certifications: ["Wilderness First Aid", "Bushcraft Instructor", "Outdoor Guide"],
      description: "Mistr bushcraftu a života v divočině. Specializuje se na tradiční techniky přežití a život v souladu s přírodou bez moderních technologií.",
      achievements: [
        "Survival v Aljašce",
        "Instruktor bushcraftu",
        "Expert na tradiční dovednosti",
        "Průvodce expedicemi"
      ]
    },
    {
      name: "Milan",
      fullName: "Milan Dvořák",
      specialty: "Tactical Medic",
      experience: "18+ let",
      certifications: ["Paramedic License", "TCCC Instructor", "Wilderness Medicine"],
      description: "Zdravotnický záchranář s rozsáhlými zkušenostmi z extrémních podmínek. Specialist na taktickou medicínu a první pomoc v krizových situacích.",
      achievements: [
        "Záchranář horské služby",
        "Instruktor první pomoci",
        "Taktický medik",
        "Lektor zdravotnických kurzů"
      ]
    },
    {
      name: "Zdeněk",
      fullName: "Zdeněk Procházka",
      specialty: "Tactical Operations",
      experience: "20+ let",
      certifications: ["Special Forces", "Close Protection", "Combat Instructor"],
      description: "Veterán speciálních sil s mezinárodními zkušenostmi. Zaměřuje se na taktické dovednosti, sebeobranu a mentální přípravu na extrémní situace.",
      achievements: [
        "Veterán mezinárodních misí",
        "Instruktor sebeobrany",
        "Bezpečnostní konzultant",
        "Expert na krizové řízení"
      ]
    }
  ];

  const getSpecialtyColor = (specialty: string) => {
    if (specialty.includes("Urban")) return "bg-rust-600";
    if (specialty.includes("Wilderness")) return "bg-green-600";
    if (specialty.includes("Medic")) return "bg-blue-600";
    if (specialty.includes("Tactical")) return "bg-red-600";
    return "bg-gray-600";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section with Background Image */}
      <section 
        className="pt-24 pb-16 px-4 min-h-screen relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/lovable-uploads/f562b534-f3b9-4e56-8f57-8b8b7fdef032.png')`
        }}
      >
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-orbitron font-bold text-rust-400 mb-4 text-glow">
              NAŠI INSTRUKTOŘI
            </h1>
            <p className="text-xl text-muted-foreground font-rajdhani max-w-3xl mx-auto">
              Tým zkušených profesionálů s léty praxe v extrémních podmínkách. 
              Každý z našich instruktorů má bohaté zkušenosti z reálných situací.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {instructors.map((instructor, index) => (
              <Card key={index} className="rust-texture bg-card/50 backdrop-blur-sm border-rust-800/40 hover:border-rust-600/60 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-rust-600 to-rust-800 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-orbitron font-bold text-white">
                          {instructor.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-orbitron font-bold text-rust-400">
                          {instructor.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground font-rajdhani">
                          {instructor.fullName}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${getSpecialtyColor(instructor.specialty)} text-white font-rajdhani`}>
                      {instructor.experience}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Badge className={`${getSpecialtyColor(instructor.specialty)} text-white font-rajdhani mb-2`}>
                      {instructor.specialty}
                    </Badge>
                    <p className="text-muted-foreground font-rajdhani leading-relaxed">
                      {instructor.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-rajdhani font-bold text-wasteland-400 mb-2">Certifikace:</h4>
                    <div className="flex flex-wrap gap-1">
                      {instructor.certifications.map((cert, certIndex) => (
                        <Badge key={certIndex} variant="outline" className="text-xs border-wasteland-700 text-wasteland-300">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-rajdhani font-bold text-wasteland-400 mb-2">Klíčové úspěchy:</h4>
                    <ul className="space-y-1">
                      {instructor.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-sm text-muted-foreground font-rajdhani flex items-center">
                          <span className="w-2 h-2 bg-rust-500 rounded-full mr-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Team Philosophy Section */}
          <Card className="wasteland-texture bg-card/50 backdrop-blur-sm border-wasteland-700/40 mt-12 max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-orbitron font-bold text-wasteland-400">
                FILOZOFIE TÝMU
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground font-rajdhani leading-relaxed mb-6">
                "V post-apokalyptickém světě není místo pro teorii. Každá dovednost, kterou vyučujeme, 
                byla otestována v reálných podmínkách. Náš tým kombinuje vojenské zkušenosti, 
                zdravotnické vzdělání a roky praxe v divočině."
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="font-orbitron font-bold text-rust-400 mb-2">ZKUŠENOST</h4>
                  <p className="text-sm text-muted-foreground font-rajdhani">
                    65+ let kombinované praxe v extrémních podmínkách
                  </p>
                </div>
                <div>
                  <h4 className="font-orbitron font-bold text-rust-400 mb-2">REALITA</h4>
                  <p className="text-sm text-muted-foreground font-rajdhani">
                    Pouze prověřené techniky z reálných situací
                  </p>
                </div>
                <div>
                  <h4 className="font-orbitron font-bold text-rust-400 mb-2">PROFESIONALITA</h4>
                  <p className="text-sm text-muted-foreground font-rajdhani">
                    Mezinárodní certifikace a kontinuální vzdělávání
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Instructors;
