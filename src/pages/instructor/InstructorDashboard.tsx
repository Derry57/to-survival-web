
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Calendar, Award } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface InstructorStats {
  totalCourses: number;
  upcomingCourses: number;
  totalParticipants: number;
  activeParticipants: number;
}

const InstructorDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<InstructorStats>({
    totalCourses: 0,
    upcomingCourses: 0,
    totalParticipants: 0,
    activeParticipants: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchInstructorStats();
    }
  }, [user]);

  const fetchInstructorStats = async () => {
    try {
      setLoading(true);
      
      // Get instructor profile
      const { data: instructor } = await supabase
        .from('instructors')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (!instructor) return;

      // Fetch course statistics
      const { data: courses } = await supabase
        .from('course_instructors')
        .select(`
          courses (
            id,
            status,
            start_date,
            course_participants (count)
          )
        `)
        .eq('instructor_id', instructor.id);

      if (courses) {
        const totalCourses = courses.length;
        const upcomingCourses = courses.filter(
          c => c.courses?.status === 'upcoming' || 
               (c.courses?.start_date && new Date(c.courses.start_date) > new Date())
        ).length;
        
        const totalParticipants = courses.reduce(
          (acc, c) => acc + (c.courses?.course_participants?.length || 0), 0
        );

        setStats({
          totalCourses,
          upcomingCourses,
          totalParticipants,
          activeParticipants: totalParticipants, // For now, same as total
        });
      }
    } catch (error) {
      console.error('Error fetching instructor stats:', error);
      toast({
        title: "Chyba při načítání dat",
        description: "Nepodařilo se načíst statistiky",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-rust-400">
          Instruktor Dashboard
        </h1>
        <div className="text-center text-muted-foreground">
          Načítání dat...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-rust-400">
          Instruktor Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card">
          <CardContent className="card-content p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="h-6 w-6 text-rust-400 mr-2" />
                <span className="text-sm font-medium text-rust-400">Celkem kurzů</span>
              </div>
              <div className="text-2xl font-bold text-rust-400">{stats.totalCourses}</div>
              <p className="text-sm text-muted-foreground">Všech kurzů</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card">
          <CardContent className="card-content p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-6 w-6 text-wasteland-400 mr-2" />
                <span className="text-sm font-medium text-wasteland-400">Nadcházející</span>
              </div>
              <div className="text-2xl font-bold text-wasteland-400">{stats.upcomingCourses}</div>
              <p className="text-sm text-muted-foreground">Plánované kurzy</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card">
          <CardContent className="card-content p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-green-400 mr-2" />
                <span className="text-sm font-medium text-green-400">Účastníci</span>
              </div>
              <div className="text-2xl font-bold text-green-400">{stats.totalParticipants}</div>
              <p className="text-sm text-muted-foreground">Celkem účastníků</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card">
          <CardContent className="card-content p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-sm font-medium text-blue-400">Aktivní</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">{stats.activeParticipants}</div>
              <p className="text-sm text-muted-foreground">Aktivní účastníci</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card">
        <CardHeader className="card-header">
          <CardTitle className="card-title text-rust-400">
            Rychlé akce
          </CardTitle>
        </CardHeader>
        <CardContent className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-card border text-center">
              <BookOpen className="h-8 w-8 text-rust-400 mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Vytvořit kurz</h3>
              <p className="text-sm text-muted-foreground">Naplánuj nový kurz</p>
            </div>
            <div className="p-4 rounded-lg bg-card border text-center">
              <Users className="h-8 w-8 text-wasteland-400 mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Správa účastníků</h3>
              <p className="text-sm text-muted-foreground">Zobraz účastníky kurzů</p>
            </div>
            <div className="p-4 rounded-lg bg-card border text-center">
              <Calendar className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Kalendář</h3>
              <p className="text-sm text-muted-foreground">Přehled termínů</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorDashboard;
