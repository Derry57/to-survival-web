
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, Calendar } from "lucide-react";

const ClientDashboard = () => {
  const userStats = {
    xp: 750,
    maxXp: 1000,
    rank: "Ranger",
    completedCourses: 5,
    upcomingCourses: 2,
  };

  const badges = [
    { name: "První kroky", description: "Dokončil první kurz", icon: Star },
    { name: "Urban Expert", description: "Splnil 3 městské kurzy", icon: Target },
    { name: "Týmový hráč", description: "Aktivní v diskuzích", icon: Trophy },
  ];

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
        <Badge variant="outline" className="text-wasteland-400 border-wasteland-600">
          {userStats.rank}
        </Badge>
      </div>

      {/* XP Progress */}
      <Card className="rust-texture border-rust-800/30">
        <CardHeader>
          <CardTitle className="text-rust-400 font-orbitron flex items-center">
            <Trophy className="mr-2 h-5 w-5" />
            Pokrok
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>XP: {userStats.xp}/{userStats.maxXp}</span>
              <span>{Math.round((userStats.xp / userStats.maxXp) * 100)}%</span>
            </div>
            <Progress value={(userStats.xp / userStats.maxXp) * 100} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {userStats.maxXp - userStats.xp} XP do dalšího levelu
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <Card className="border-rust-800/30">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-rust-400">{badges.length}</div>
              <p className="text-sm text-muted-foreground">Získané odznaky</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <Card className="border-rust-800/30">
        <CardHeader>
          <CardTitle className="text-rust-400 font-orbitron">Odznaky</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 border border-rust-800/20">
                <badge.icon className="h-8 w-8 text-rust-400" />
                <div>
                  <h4 className="font-semibold text-foreground">{badge.name}</h4>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
