
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  instructor_names: string[];
}

const AllCourses = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      
      // Fetch all courses with participant count and instructor info
      const { data: coursesData, error } = await supabase
        .from('courses')
        .select(`
          *,
          course_participants (count),
          course_instructors (
            instructor_id,
            instructors (
              full_name
            )
          )
        `)
        .order('start_date', { ascending: true });

      if (error) {
        throw error;
      }

      const formattedCourses = coursesData?.map(course => ({
        ...course,
        participant_count: course.course_participants?.length || 0,
        instructor_names: course.course_instructors?.map(ci => ci.instructors?.full_name).filter(Boolean) || []
      })) as Course[];

      setCourses(formattedCourses || []);
    } catch (error) {
      console.error('Error fetching all courses:', error);
      toast({
        title: "Chyba při načítání kurzů",
        description: "Nepodařilo se načíst všechny kurzy",
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-600';
      case 'intermediate': return 'bg-yellow-600';
      case 'advanced': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Začátečník';
      case 'intermediate': return 'Pokročilý';
      case 'advanced': return 'Expert';
      default: return difficulty;
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
          <h1 className="text-3xl font-bold text-rust-400">Všechny kurzy</h1>
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
        <h1 className="text-3xl font-bold text-rust-400">Všechny kurzy</h1>
        <Badge variant="outline" className="text-wasteland-400 border-wasteland-600">
          {courses.length} kurzů
        </Badge>
      </div>

      {courses.length === 0 ? (
        <Card className="card">
          <CardContent className="card-content p-8 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Žádné kurzy nejsou k dispozici
            </h3>
            <p className="text-muted-foreground">
              Zatím nejsou vypsané žádné kurzy na platformě
            </p>
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
                  <div className="flex gap-2">
                    <Badge className={`${getStatusColor(course.status)} text-white`}>
                      {getStatusText(course.status)}
                    </Badge>
                    <Badge className={`${getDifficultyColor(course.difficulty_level)} text-white`}>
                      {getDifficultyText(course.difficulty_level)}
                    </Badge>
                  </div>
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
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{course.duration_hours} hodin</span>
                  </div>
                  {course.instructor_names.length > 0 && (
                    <div className="text-sm text-muted-foreground">
                      <strong>Instruktoři:</strong> {course.instructor_names.join(', ')}
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-rust-400">
                      {course.price.toLocaleString()} Kč
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
