
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const Courses = () => {
  const courses = [
    {
      title: "Survival Level 1",
      description: "Základní survival dovednosti pro začátečníky",
      duration: "2 dny",
      difficulty: "Začátečník",
      price: "2.500 Kč",
      skills: ["Stavba úkrytu", "Získávání vody", "Oheň", "Základní orientace"],
    },
    {
      title: "Survival Level 2",
      description: "Pokročilé techniky přežití v divočině",
      duration: "3 dny",
      difficulty: "Pokročilý",
      price: "4.500 Kč",
      skills: ["Lov a rybolov", "Pokročilá orientace", "Psychologie přežití", "Dlouhodobé přežití"],
    },
    {
      title: "Urban Survival",
      description: "Přežití v městském prostředí po katastrofě",
      duration: "2 dny",
      difficulty: "Střední",
      price: "3.200 Kč",
      skills: ["Městské skrýše", "Získávání zdrojů", "Evakuace", "Sebeobrana v městě"],
    },
    {
      title: "Tactical Medical",
      description: "Zdravotnická příprava v extrémních podmínkách",
      duration: "2 dny",
      difficulty: "Pokročilý",
      price: "3.800 Kč",
      skills: ["Taktická medicína", "Improvizované prostředky", "Trauma care", "Psychická první pomoc"],
    },
    {
      title: "Expedice ČR",
      description: "Víkendová expedice v českých horách",
      duration: "3 dny",
      difficulty: "Střední",
      price: "4.200 Kč",
      skills: ["Navigace v terénu", "Bivak", "Týmová spolupráce", "Řešení krizí"],
    },
    {
      title: "Expedice Polsko",
      description: "Týdenní hardcore expedice v polských Tatrách",
      duration: "7 dní",
      difficulty: "Expert",
      price: "12.500 Kč",
      skills: ["Extrémní podmínky", "Vysokohorská medicína", "Lezecké techniky", "Mentální odolnost"],
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Začátečník": return "bg-green-600";
      case "Střední": return "bg-yellow-600";
      case "Pokročilý": return "bg-orange-600";
      case "Expert": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-orbitron font-bold text-rust-400 mb-4 text-glow">
              SURVIVAL KURZY
            </h1>
            <p className="text-xl text-muted-foreground font-rajdhani max-w-3xl mx-auto">
              Od základních dovedností přežití až po extrémní expedice. 
              Vyber si kurz podle své úrovně a připrav se na skutečné výzvy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {courses.map((course, index) => (
              <Card key={index} className="rust-texture bg-card/30 border-rust-800/30 hover:border-rust-600/50 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-orbitron font-bold text-rust-400">
                      {course.title}
                    </CardTitle>
                    <Badge className={`${getDifficultyColor(course.difficulty)} text-white font-rajdhani`}>
                      {course.difficulty}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground font-rajdhani">
                    {course.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-wasteland-400 font-rajdhani font-medium">Délka:</span>
                      <span className="text-sm text-foreground font-rajdhani">{course.duration}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-wasteland-400 font-rajdhani font-medium">Cena:</span>
                      <span className="text-lg font-orbitron font-bold text-rust-400">{course.price}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-rajdhani font-bold text-wasteland-400 mb-2">Co se naučíš:</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs border-wasteland-700 text-wasteland-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-rust-600 hover:bg-rust-700 text-white font-rajdhani font-bold">
                    REZERVOVAT KURZ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Course Section */}
          <Card className="wasteland-texture bg-card/30 border-wasteland-700/30 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-orbitron font-bold text-wasteland-400">
                KURZ NA MÍRU
              </CardTitle>
              <p className="text-muted-foreground font-rajdhani">
                Potřebuješ specifický trénink? Vytvoříme kurz přesně podle tvých požadavků.
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <h4 className="font-rajdhani font-bold text-wasteland-400 mb-2">Možnosti customizace:</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge variant="outline" className="border-wasteland-600 text-wasteland-300">Firemní teambuilding</Badge>
                  <Badge variant="outline" className="border-wasteland-600 text-wasteland-300">Individuální trénink</Badge>
                  <Badge variant="outline" className="border-wasteland-600 text-wasteland-300">Speciální lokace</Badge>
                  <Badge variant="outline" className="border-wasteland-600 text-wasteland-300">Tematické kurzy</Badge>
                </div>
              </div>
              <Button className="bg-wasteland-600 hover:bg-wasteland-700 text-white font-rajdhani font-bold">
                KONTAKTOVAT PRO NABÍDKU
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Courses;
