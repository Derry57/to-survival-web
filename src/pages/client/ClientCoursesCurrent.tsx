
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";

const ClientCoursesCurrent = () => {
  const currentCourses = [
    {
      id: 1,
      name: "Urban Survival - Praha",
      description: "Naučte se přežít v městském prostředí",
      date: "15-17.3.2024",
      time: "09:00 - 17:00",
      location: "Praha, Střed",
      instructor: "Martin Novák",
      progress: 75,
      status: "in_progress",
      participants: 12,
      maxParticipants: 15,
      difficulty: "Pokročilý",
      price: 4050, // 10% sleva
    },
    {
      id: 2,
      name: "Wilderness Expert",
      description: "Pokročilý kurz přežití v divočině",
      date: "22-24.3.2024",
      time: "08:00 - 18:00",
      location: "Šumava",
      instructor: "Pavel Svoboda",
      progress: 0,
      status: "upcoming",
      participants: 8,
      maxParticipants: 12,
      difficulty: "Expert",
      price: 5850, // 10% sleva
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <Badge className="bg-blue-600">Probíhá</Badge>;
      case 'upcoming':
        return <Badge className="bg-orange-600">Nadcházející</Badge>;
      default:
        return <Badge variant="outline">Neznámý</Badge>;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Začátečník':
        return 'text-green-600';
      case 'Pokročilý':
        return 'text-orange-600';
      case 'Expert':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-orbitron font-bold text-rust-400">
          Aktuální kurzy
        </h1>
        <Badge variant="outline" className="text-wasteland-400 border-wasteland-600">
          {currentCourses.length} kurzů
        </Badge>
      </div>

      <div className="space-y-4">
        {currentCourses.map((course) => (
          <Card key={course.id} className="border-rust-800/30 hover:border-rust-600/50 transition-all">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-rust-400 font-orbitron text-lg mb-2">
                    {course.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {course.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {course.location}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(course.status)}
                  <span className={`text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Instruktor: {course.instructor}</span>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.participants}/{course.maxParticipants}
                  </div>
                </div>
                
                {course.status === 'in_progress' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pokrok kurzu</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-rust-400">{course.price.toLocaleString()} Kč</span>
                    <Badge variant="outline" className="bg-green-600/10 text-green-600 border-green-600">
                      -10% sleva
                    </Badge>
                  </div>
                  <Link to={`/client/course/${course.id}`}>
                    <Button variant="outline" className="border-rust-600 text-rust-600 hover:bg-rust-600 hover:text-white">
                      Detail kurzu
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientCoursesCurrent;
