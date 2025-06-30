
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, MapPin, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ClientCourses = () => {
  const enrolledCourses = [
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
      price: 4500,
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
      progress: 0,
      status: "upcoming",
      participants: 8,
      maxParticipants: 12,
      difficulty: "Expert",
      price: 6500,
      image: "/lovable-uploads/2a0cd038-b217-410a-bc2f-835540d82bf7.png"
    },
    {
      id: 3,
      name: "Medical Training",
      description: "Základy první pomoci v extrémních situacích",
      date: "12-14.2.2024",
      time: "09:00 - 16:00",
      location: "Brno",
      instructor: "Dr. Eva Černá",
      progress: 100,
      status: "completed",
      participants: 10,
      maxParticipants: 10,
      difficulty: "Začátečník",
      price: 3200,
      image: "/lovable-uploads/3fec14b8-3627-4896-831d-86e3fc7c7736.png"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-600">Dokončeno</Badge>;
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

  const filterCourses = (status: string) => {
    if (status === 'all') return enrolledCourses;
    return enrolledCourses.filter(course => course.status === status);
  };

  const CourseCard = ({ course }: { course: typeof enrolledCourses[0] }) => (
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
            <span className="font-semibold text-rust-400">{course.price.toLocaleString()} Kč</span>
            <Link to={`/client/course/${course.id}`}>
              <Button variant="outline" className="border-rust-600 text-rust-600 hover:bg-rust-600 hover:text-white">
                Detail kurzu
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-orbitron font-bold text-rust-400">
          Mé kurzy
        </h1>
        <Badge variant="outline" className="text-wasteland-400 border-wasteland-600">
          {enrolledCourses.length} kurzů
        </Badge>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Všechny</TabsTrigger>
          <TabsTrigger value="upcoming">Nadcházející</TabsTrigger>
          <TabsTrigger value="in_progress">Probíhající</TabsTrigger>
          <TabsTrigger value="completed">Dokončené</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 mt-6">
          {filterCourses('all').map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {filterCourses('upcoming').map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </TabsContent>
        
        <TabsContent value="in_progress" className="space-y-4 mt-6">
          {filterCourses('in_progress').map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-6">
          {filterCourses('completed').map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientCourses;
