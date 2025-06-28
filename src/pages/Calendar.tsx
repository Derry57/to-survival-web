
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const Calendar = () => {
  const upcomingCourses = [
    {
      title: "Urban Survival",
      date: "15-16 Leden 2025",
      instructor: "Ritchie",
      location: "Praha",
      spotsLeft: 3,
      difficulty: "Střední",
      price: "3.200 Kč"
    },
    {
      title: "Survival Level 1",
      date: "22-23 Leden 2025", 
      instructor: "Pepa",
      location: "Brdy",
      spotsLeft: 7,
      difficulty: "Začátečník",
      price: "2.500 Kč"
    },
    {
      title: "Tactical Medical",
      date: "29-30 Leden 2025",
      instructor: "Milan",
      location: "Ostrava",
      spotsLeft: 5,
      difficulty: "Pokročilý",
      price: "3.800 Kč"
    }
  ];

  const allCourses = [
    {
      month: "Únor 2025",
      courses: [
        { title: "Survival Level 2", date: "5-7 Únor", instructor: "Zdeněk", location: "Šumava", spotsLeft: 6, difficulty: "Pokročilý" },
        { title: "Urban Survival", date: "12-13 Únor", instructor: "Ritchie", location: "Brno", spotsLeft: 8, difficulty: "Střední" },
        { title: "Expedice ČR", date: "19-21 Únor", instructor: "Pepa", location: "Krkonoše", spotsLeft: 4, difficulty: "Střední" },
        { title: "Tactical Medical", date: "26-27 Únor", instructor: "Milan", location: "Praha", spotsLeft: 12, difficulty: "Pokročilý" }
      ]
    },
    {
      month: "Březen 2025",
      courses: [
        { title: "Survival Level 1", date: "5-6 Březen", instructor: "Pepa", location: "Brdy", spotsLeft: 10, difficulty: "Začátečník" },
        { title: "Urban Survival", date: "12-13 Březen", instructor: "Ritchie", location: "Ostrava", spotsLeft: 6, difficulty: "Střední" },
        { title: "Expedice Polsko", date: "19-25 Březen", instructor: "Všichni", location: "Tatry", spotsLeft: 2, difficulty: "Expert" },
        { title: "Survival Level 2", date: "26-28 Březen", instructor: "Zdeněk", location: "Beskydy", spotsLeft: 8, difficulty: "Pokročilý" }
      ]
    },
    {
      month: "Duben 2025",
      courses: [
        { title: "Tactical Medical", date: "2-3 Duben", instructor: "Milan", location: "Brno", spotsLeft: 9, difficulty: "Pokročilý" },
        { title: "Survival Level 1", date: "9-10 Duben", instructor: "Pepa", location: "Šumava", spotsLeft: 12, difficulty: "Začátečník" },
        { title: "Urban Survival", date: "16-17 Duben", instructor: "Ritchie", location: "Praha", spotsLeft: 5, difficulty: "Střední" },
        { title: "Expedice ČR", date: "23-25 Duben", instructor: "Zdeněk", location: "Moravský kras", spotsLeft: 7, difficulty: "Střední" }
      ]
    }
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

  const getSpotsColor = (spots: number) => {
    if (spots <= 3) return "text-red-400";
    if (spots <= 6) return "text-yellow-400";
    return "text-green-400";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div 
        className="pt-24 pb-16 px-4 min-h-screen bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)), url('/lovable-uploads/48d2055d-26ae-4487-8a7e-bb8316e519c0.png')`
        }}
      >
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-orbitron font-bold text-rust-400 mb-4 text-glow">
              KALENDÁŘ KURZŮ
            </h1>
            <p className="text-xl text-muted-foreground font-rajdhani max-w-3xl mx-auto">
              Přehled všech nadcházejících survival kurzů a expedic. 
              Rezervuj si místo včas - kapacita je omezená.
            </p>
          </div>

          {/* Nejbližší kurzy */}
          <div className="mb-16">
            <h2 className="text-3xl font-orbitron font-bold text-rust-400 mb-8 text-center">
              NEJBLIŽŠÍ KURZY
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingCourses.map((course, index) => (
                <Card key={index} className="rust-texture bg-card/30 border-rust-800/30 hover:border-rust-600/50 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-orbitron font-bold text-rust-400">
                        {course.title}
                      </CardTitle>
                      <Badge className={`${getDifficultyColor(course.difficulty)} text-white font-rajdhani`}>
                        {course.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-sm text-wasteland-400 font-rajdhani font-medium">Datum:</span>
                        <span className="text-sm text-foreground font-rajdhani font-bold">{course.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-wasteland-400 font-rajdhani font-medium">Instruktor:</span>
                        <span className="text-sm text-foreground font-rajdhani">{course.instructor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-wasteland-400 font-rajdhani font-medium">Lokace:</span>
                        <span className="text-sm text-foreground font-rajdhani">{course.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-wasteland-400 font-rajdhani font-medium">Volná místa:</span>
                        <span className={`text-sm font-rajdhani font-bold ${getSpotsColor(course.spotsLeft)}`}>
                          {course.spotsLeft}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-wasteland-400 font-rajdhani font-medium">Cena:</span>
                        <span className="text-lg font-orbitron font-bold text-rust-400">{course.price}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-rust-600 hover:bg-rust-700 text-white font-rajdhani font-bold">
                      REZERVOVAT
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Kompletní kalendář */}
          <div>
            <h2 className="text-3xl font-orbitron font-bold text-rust-400 mb-8 text-center">
              KOMPLETNÍ KALENDÁŘ
            </h2>
            <div className="space-y-8">
              {allCourses.map((month, monthIndex) => (
                <Card key={monthIndex} className="wasteland-texture bg-card/20 border-wasteland-700/30">
                  <CardHeader>
                    <CardTitle className="text-2xl font-orbitron font-bold text-wasteland-400 text-center">
                      {month.month}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {month.courses.map((course, courseIndex) => (
                        <Card key={courseIndex} className="bg-card/40 border-rust-800/20 hover:border-rust-600/40 transition-all duration-300">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-orbitron font-bold text-rust-400 text-sm">
                                {course.title}
                              </h4>
                              <Badge className={`${getDifficultyColor(course.difficulty)} text-white font-rajdhani text-xs`}>
                                {course.difficulty}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-wasteland-400 font-rajdhani">Datum:</span>
                                <span className="text-foreground font-rajdhani font-medium">{course.date}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-wasteland-400 font-rajdhani">Instruktor:</span>
                                <span className="text-foreground font-rajdhani">{course.instructor}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-wasteland-400 font-rajdhani">Lokace:</span>
                                <span className="text-foreground font-rajdhani">{course.location}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-wasteland-400 font-rajdhani">Místa:</span>
                                <span className={`font-rajdhani font-bold ${getSpotsColor(course.spotsLeft)}`}>
                                  {course.spotsLeft}
                                </span>
                              </div>
                            </div>
                            <Button size="sm" className="w-full mt-3 bg-rust-600 hover:bg-rust-700 text-white font-rajdhani text-xs">
                              REZERVOVAT
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Informační sekce */}
          <Card className="rust-texture bg-card/30 border-rust-800/30 mt-12 max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-orbitron font-bold text-rust-400">
                DŮLEŽITÉ INFORMACE
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-rajdhani">
                <div>
                  <h4 className="font-bold text-wasteland-400 mb-2">Rezervace a platby:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Rezervace je závazná po zaplacení zálohy</li>
                    <li>• Záloha 50% ceny kurzu</li>
                    <li>• Doplatek nejpozději 7 dní před kurzem</li>
                    <li>• Platba převodem nebo v hotovosti</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-wasteland-400 mb-2">Storno podmínky:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Do 14 dní: 100% refundace</li>
                    <li>• Do 7 dní: 50% refundace</li>
                    <li>• Méně než 7 dní: bez refundace</li>
                    <li>• Změna termínu možná do 7 dní</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
