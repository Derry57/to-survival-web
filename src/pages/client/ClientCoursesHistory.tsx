
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Camera, Users, Star, Upload } from "lucide-react";
import { useState } from "react";

const ClientCoursesHistory = () => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  const completedCourses = [
    {
      id: 3,
      name: "Medical Training",
      description: "Základy první pomoci v extrémních situacích",
      date: "12-14.2.2024",
      location: "Brno",
      instructor: "Dr. Eva Černá",
      difficulty: "Začátečník",
      rating: 5,
      photos: [
        "/lovable-uploads/3fec14b8-3627-4896-831d-86e3fc7c7736.png",
        "/lovable-uploads/019e2001-f49b-46c7-b8af-c84d58987b99.png",
      ]
    },
    {
      id: 4,
      name: "Basic Survival",
      description: "Základní techniky přežití v přírodě",
      date: "5-7.1.2024",
      location: "Krkonoše",
      instructor: "Pavel Svoboda",
      difficulty: "Začátečník",
      rating: 4,
      photos: [
        "/lovable-uploads/2a0cd038-b217-410a-bc2f-835540d82bf7.png",
      ]
    }
  ];

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-orbitron font-bold text-rust-400">
          Historie kurzů
        </h1>
        <Badge variant="outline" className="text-green-600 border-green-600">
          {completedCourses.length} dokončeno
        </Badge>
      </div>

      <div className="space-y-4">
        {completedCourses.map((course) => (
          <Card key={course.id} className="border-rust-800/30">
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
                    <span>Instruktor: {course.instructor}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className="bg-green-600">Dokončeno</Badge>
                  <span className={`text-sm font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Hodnocení:</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(course.rating)}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
                    className="border-rust-600 text-rust-600 hover:bg-rust-600 hover:text-white"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {selectedCourse === course.id ? 'Skrýt' : 'Zobrazit'} fotky
                  </Button>
                </div>

                {selectedCourse === course.id && (
                  <div className="border-t border-rust-800/20 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-foreground">Fotoalbum kurzu</h4>
                      <Button variant="outline" size="sm" className="border-wasteland-600 text-wasteland-400">
                        <Upload className="w-4 h-4 mr-2" />
                        Přidat fotku
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {course.photos.map((photo, index) => (
                        <div key={index} className="aspect-square overflow-hidden rounded-lg border border-rust-800/20">
                          <img 
                            src={photo} 
                            alt={`Fotka z kurzu ${course.name}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientCoursesHistory;
