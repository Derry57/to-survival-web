
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const UpcomingCourses = () => {
  const upcomingCourses = [
    {
      id: 1,
      name: "Urban Survival - Praha",
      description: "Naučte se přežít v městském prostředí",
      date: "15-17.3.2024",
      time: "09:00 - 17:00",
      location: "Praha, Střed",
      instructor: "Martin Novák", 
      difficulty: "Pokročilý",
      price: 4500,
      spots: 3,
      maxSpots: 15,
      image: "/lovable-uploads/019e2001-f49b-46c7-b8af-c84d58987b99.png"
    },
    {
      id: 2,
      name: "Wilderness Expert",
      description: "Pokročilý kurz přežití v divočině",
      date: "22-24.3.2024", 
      time: "08:00 - 18:00",
      location: "Šumava",
      instructor: "Pavel Svoboda",
      difficulty: "Expert",
      price: 6500,
      spots: 7,
      maxSpots: 12,
      image: "/lovable-uploads/2a0cd038-b217-410a-bc2f-835540d82bf7.png"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Začátečník':
        return 'bg-green-600';
      case 'Pokročilý':
        return 'bg-orange-600';
      case 'Expert':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-rust-900/20 to-wasteland-900/20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-orbitron font-bold text-rust-400 mb-4">
            NEJBLIŽŠÍ KURZY
          </h2>
          <p className="text-lg text-muted-foreground font-rajdhani max-w-2xl mx-auto">
            Připojte se k našim nadcházejícím kurzům a získejte dovednosti pro přežití v každé situaci
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {upcomingCourses.map((course) => (
            <Card key={course.id} className="border-rust-800/30 hover:border-rust-600/50 transition-all overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getDifficultyColor(course.difficulty)}>
                    {course.difficulty}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-background/80 text-foreground">
                    {course.spots} míst volných
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-rust-400 font-orbitron text-xl mb-2">
                  {course.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{course.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{course.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{course.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{course.instructor}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-rust-800/20">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-rust-400">
                        {course.price.toLocaleString()} Kč
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {course.maxSpots - course.spots}/{course.maxSpots} obsazeno
                      </span>
                    </div>
                    <Link to="/courses">
                      <Button className="bg-rust-600 hover:bg-rust-700 text-white font-rajdhani font-bold">
                        Přihlásit se
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/courses">
            <Button variant="outline" size="lg" className="border-wasteland-600 text-wasteland-400 hover:bg-wasteland-600 hover:text-white font-rajdhani font-bold">
              Zobrazit všechny kurzy
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingCourses;
