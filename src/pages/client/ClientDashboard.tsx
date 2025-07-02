
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Award, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface UserProgress {
  completed_courses: number;
  total_xp: number;
  rank: string;
}

interface UserProfile {
  full_name: string;
}

const ClientDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch user progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (progressError && progressError.code !== 'PGRST116') {
        console.error('Error fetching user progress:', progressError);
        toast({
          title: "Chyba při načítání dat",
          description: "Nepodařilo se načíst váš pokrok",
          variant: "destructive",
        });
      } else {
        setUserProgress(progressData);
      }

      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching user profile:', profileError);
      } else {
        setUserProfile(profileData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Chyba při načítání dat",
        description: "Nepodařilo se načíst vaše data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Mock data for recent courses (this would come from a courses table in a real app)
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

  const upcomingCoursesCount = recentCourses.filter(course => course.status === "upcoming").length;
  const completedCoursesCount = userProgress?.completed_courses || 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-orbitron font-bold text-rust-400">
            Dashboard
          </h1>
        </div>
        <div className="text-center text-muted-foreground">
          Načítání dat...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-orbitron font-bold text-rust-400">
            Dashboard
          </h1>
          {userProfile?.full_name && (
            <p className="text-muted-foreground mt-1">
              Vítejte zpět, {userProfile.full_name}!
            </p>
          )}
        </div>
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
              <div className="text-2xl font-bold text-rust-400">{completedCoursesCount}</div>
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
              <div className="text-2xl font-bold text-wasteland-400">{upcomingCoursesCount}</div>
              <p className="text-sm text-muted-foreground">Registrovaných kurzů</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Progress Card */}
      {userProgress && (
        <Card className="border-rust-800/30">
          <CardHeader>
            <CardTitle className="text-rust-400 font-orbitron flex items-center">
              <Award className="mr-2 h-5 w-5" />
              Připravenost na kurz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-wasteland-400">{userProgress.total_xp}</div>
                <p className="text-sm text-muted-foreground">Celkové XP</p>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="text-rust-400 border-rust-600">
                  {userProgress.rank}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">Aktuální hodnost</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{userProgress.completed_courses}</div>
                <p className="text-sm text-muted-foreground">Dokončených kurzů</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
