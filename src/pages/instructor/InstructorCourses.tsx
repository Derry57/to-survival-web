
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Users, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty_level: string;
  max_participants: number;
  price: number;
  duration_hours: number;
  location: string;
  start_date: string;
  end_date: string;
  status: string;
  participant_count: number;
}

const InstructorCourses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchInstructorCourses();
    }
  }, [user]);

  const fetchInstructorCourses = async () => {
    try {
      setLoading(true);
      
      // Get instructor profile
      const { data: instructor } = await supabase
        .from('instructors')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (!instructor) return;

      // Fetch courses with participant count
      const { data: coursesData, error } = await supabase
        .from('course_instructors')
        .select(`
          courses (
            id,
            title,
            description,
            difficulty_level,
            max_participants,
            price,
            duration_hours,
            location,
            start_date,
            end_date,
            status,
            course_participants (count)
          )
        `)
        .eq('instructor_id', instructor.id);

      if (error) {
        throw error;
      }

      const formattedCourses = coursesData?.map(item => ({
        ...item.courses,
        participant_count: item.courses?.course_participants?.length || 0
      })).filter(course => course.id) as Course[];

      setCourses(formattedCourses || []);
    } catch (error) {
      console.error('Error fetching instructor courses:', error);
      toast({
        title: "Chyba při načítání kurzů",
        description: "Nepodařilo se načíst vaše kurzy",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-600';
      case 'active': return 'bg-green-600';
      case 'completed': return 'bg-gray-600';
      case 'cancelled': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Nadcházející';
      case 'active': return 'Aktivní';
      case 'completed': return 'Dokončený';
      case 'cancelled': return 'Zrušený';
      default: return status;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-rust-400">Mé kurzy</h1>
        </div>
        <div className="text-center text-muted-foreground">
          Načítání kurzů...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-rust-400">Mé kurzy</h1>
        <Link to="/instructor/courses/create">
          <Button className="btn btn-primary">
            <Plus className="mr-2 h-4 w-4" />
            Vytvořit kurz
          </Button>
        </Link>
      </div>

      {courses.length === 0 ? (
        <Card className="card">
          <CardContent className="card-content p-8 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Zatím nemáte žádné kurzy
            </h3>
            <p className="text-muted-foreground mb-4">
              Začněte vytvořením svého prvního kurzu
            </p>
            <Link to="/instructor/courses/create">
              <Button className="btn btn-primary">
                <Plus className="mr-2 h-4 w-4" />
                Vytvořit kurz
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="card hover:scale-105 transition-all duration-300">
              <CardHeader className="card-header">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="card-title text-rust-400">
                    {course.title}
                  </CardTitle>
                  <Badge className={`${getStatusColor(course.status)} text-white`}>
                    {getStatusText(course.status)}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  {course.description}
                </p>
              </CardHeader>
              <CardContent className="card-content">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{formatDateTime(course.start_date)}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{course.participant_count}/{course.max_participants} účastníků</span>
                  </div>
                  {course.location && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{course.location}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-rust-400">
                      {course.price.toLocaleString()} Kč
                    </span>
                    <Badge variant="outline" className="border-wasteland-600 text-wasteland-300">
                      {course.duration_hours}h
                    </Badge>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button className="w-full btn btn-outline">
                    Upravit kurz
                  </Button>
                  <Button className="w-full btn btn-secondary">
                    Zobrazit účastníky
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstructorCourses;
