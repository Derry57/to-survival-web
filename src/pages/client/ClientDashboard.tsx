
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const ClientDashboard = () => {
  const userStats = {
    completedCourses: 5,
    upcomingCourses: 2,
  };

  const recentCourses = [
    { name: "Urban Survival - Praha", date: "15-17.3.2024", status: "completed" },
    { name: "Wilderness Expert", date: "22-24.3.2024", status: "upcoming" },
  ];

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
              <div className="text-2xl font-bold text-rust-400">{userStats.completedCourses}</div>
              <p className="text-sm text-muted-foreground">Dokončené kurzy</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-rust-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-wasteland-400">{userStats.upcomingCourses}</div>
              <p className="text-sm text-muted-foreground">Nadcházející kurzy</p>
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
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-rust-800/20">
                <div>
                  <h4 className="font-semibold text-foreground">{course.name}</h4>
                  <p className="text-sm text-muted-foreground">{course.date}</p>
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
