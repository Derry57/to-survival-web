
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, BookOpen } from "lucide-react";

const ClientDashboard = () => {
  const userStats = {
    completedCourses: 5,
    upcomingCourses: 2,
  };

  const recentCourses = [
    { 
      name: "Urban Survival - Praha", 
      startDate: "2024-03-15T17:00:00",
      endDate: "2024-03-17T12:00:00",
      status: "completed"
    },
    { 
      name: "Wilderness Expert", 
      startDate: "2024-03-22T09:00:00",
      endDate: "2024-03-24T16:00:00",
      status: "upcoming"
    },
  ];

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota'];
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${dayName} ${day}.${month}.${year} ${hours}:${minutes}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-orbitron font-bold text-rust-400">
          Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-rust-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-6 w-6 text-rust-400 mr-2" />
                <span className="text-sm font-medium text-rust-400">Dokončené kurzy</span>
              </div>
              <div className="text-2xl font-bold text-rust-400">{userStats.completedCourses}</div>
              <p className="text-sm text-muted-foreground">Úspěšně absolvovaných kurzů</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-rust-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-wasteland-400 mr-2" />
                <span className="text-sm font-medium text-wasteland-400">Nadcházející kurzy</span>
              </div>
              <div className="text-2xl font-bold text-wasteland-400">{userStats.upcomingCourses}</div>
              <p className="text-sm text-muted-foreground">Registrovaných kurzů</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Courses */}
      <Card className="border-rust-800/30">
        <CardHeader>
          <CardTitle className="text-rust-400 font-orbitron flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Nedávné kurzy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCourses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card/50 border border-rust-800/20">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">{course.name}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div><strong>Trvání od:</strong> {formatDateTime(course.startDate)}</div>
                    <div><strong>Trvání do:</strong> {formatDateTime(course.endDate)}</div>
                  </div>
                </div>
                <Badge 
                  variant={course.status === 'completed' ? 'default' : 'outline'}
                  className={course.status === 'completed' ? 'bg-rust-600' : 'border-wasteland-600 text-wasteland-400'}
                >
                  {course.status === 'completed' ? 'Dokončeno' : 'Nadcházející'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
