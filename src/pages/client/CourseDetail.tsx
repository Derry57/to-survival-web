
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Star, Download, FileText, Video, CheckCircle, ChevronDown, ExternalLink } from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();
  const [participantsOpen, setParticipantsOpen] = useState(false);
  
  // Mock data - in real app would fetch from database
  const course = {
    id: 1,
    name: "Urban Survival - Praha",
    description: "Komplexní kurz přežití v městském prostředí zaměřený na praktické dovednosti a znalosti potřebné k přežití v krizových situacích.",
    startDate: "2025-08-15T17:00:00",
    endDate: "2025-08-17T12:00:00",
    meetingLocation: {
      name: "Centrální park Praha, vstup u metra Náměstí Míru",
      coordinates: "50.0755,14.4378"
    },
    instructor: "Martin Novák",
    progress: 75,
    status: "in_progress",
    participants: [
      {
        id: 1,
        name: "Jan Novák",
        avatar: "/lovable-uploads/019e2001-f49b-46c7-b8af-c84d58987b99.png",
        level: "Začátečník",
        completedCourses: 1
      },
      {
        id: 2,
        name: "Marie Svobodová",
        avatar: "/lovable-uploads/019e2001-f49b-46c7-b8af-c84d58987b99.png",
        level: "Pokročilý",
        completedCourses: 5
      },
      {
        id: 3,
        name: "Petr Dvořák",
        avatar: "/lovable-uploads/019e2001-f49b-46c7-b8af-c84d58987b99.png",
        level: "Střední",
        completedCourses: 3
      }
    ],
    maxParticipants: 15,
    difficulty: "Pokročilý",
    price: 4500,
    rating: 4.8,
    image: "/lovable-uploads/019e2001-f49b-46c7-b8af-c84d58987b99.png",
    modules: [
      {
        id: 1,
        title: "Úvod do městského přežití",
        duration: "2 hodiny",
        completed: true,
        description: "Základní principy a mindset pro přežití ve městě"
      },
      {
        id: 2,
        title: "Voda a jídlo v městském prostředí",
        duration: "3 hodiny",
        completed: true,
        description: "Jak najít a purifikovat vodu, získávání potravy"
      },
      {
        id: 3,
        title: "Orientace a navigace",
        duration: "2.5 hodiny",
        completed: true,
        description: "Pohyb městem bez GPS, orientační body"
      },
      {
        id: 4,
        title: "Improvizované nástroje a zbraně",
        duration: "3 hodiny",
        completed: false,
        description: "Výroba nástrojů z běžných předmětů"
      },
      {
        id: 5,
        title: "Psychologie přežití",
        duration: "2 hodiny",
        completed: false,
        description: "Mentální odolnost a rozhodování pod tlakem"
      }
    ],
    materials: [
      {
        id: 1,
        title: "Příručka městského přežití",
        type: "PDF",
        size: "2.5 MB",
        downloadUrl: "#"
      },
      {
        id: 2,
        title: "Checklist - základní vybavení",
        type: "PDF",
        size: "500 KB",
        downloadUrl: "#"
      },
      {
        id: 3,
        title: "Video - Purifikace vody",
        type: "MP4",
        size: "15 MB",
        downloadUrl: "#"
      }
    ],
    schedule: [
      {
        day: "Den 1",
        date: "15.8.2025",
        activities: [
          { time: "17:00-18:30", activity: "Úvod a bezpečnost" },
          { time: "19:00-20:30", activity: "Základy orientace" },
          { time: "21:00-22:00", activity: "Noční navigace" }
        ]
      },
      {
        day: "Den 2",
        date: "16.8.2025",
        activities: [
          { time: "09:00-10:30", activity: "Improvizované nástroje" },
          { time: "11:00-12:30", activity: "Praktické cvičení" },
          { time: "14:00-16:00", activity: "Získávání potravy" },
          { time: "16:00-17:00", activity: "Diskuze a Q&A" }
        ]
      },
      {
        day: "Den 3",
        date: "17.8.2025",
        activities: [
          { time: "09:00-10:30", activity: "Psychologie přežití" },
          { time: "11:00-12:00", activity: "Finální test a vyhodnocení" }
        ]
      }
    ]
  };

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

  const getGoogleMapsUrl = (coordinates: string, name: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${coordinates}&query_place_id=${encodeURIComponent(name)}`;
  };

  const completedModules = course.modules.filter(module => module.completed).length;
  const totalModules = course.modules.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/client/courses">
          <Button variant="outline" size="sm" className="border-rust-600 text-rust-600 hover:bg-rust-600 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zpět na kurzy
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-rust-800/30">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-orbitron text-rust-400 mb-2">
                    {course.name}
                  </CardTitle>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>
                <Badge className="bg-blue-600">Probíhá</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-rust-400 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Trvání kurzu
                    </h4>
                    <div className="text-sm space-y-1 ml-6">
                      <div><strong>Od:</strong> {formatDateTime(course.startDate)}</div>
                      <div><strong>Do:</strong> {formatDateTime(course.endDate)}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-rust-400 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Místo srazu
                    </h4>
                    <div className="ml-6">
                      <a 
                        href={getGoogleMapsUrl(course.meetingLocation.coordinates, course.meetingLocation.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 underline"
                      >
                        {course.meetingLocation.name}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Collapsible open={participantsOpen} onOpenChange={setParticipantsOpen}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="p-0 h-auto font-medium text-rust-400 flex items-center gap-2 hover:bg-transparent">
                          <Users className="h-4 w-4" />
                          Účastníci ({course.participants.length}/{course.maxParticipants})
                          <ChevronDown className={`h-4 w-4 transition-transform ${participantsOpen ? 'rotate-180' : ''}`} />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="ml-6 mt-2">
                        <div className="space-y-3">
                          {course.participants.map((participant) => (
                            <div key={participant.id} className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-rust-800/20">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={participant.avatar} alt={participant.name} />
                                <AvatarFallback>{participant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="font-medium text-foreground">{participant.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {participant.level} • {participant.completedCourses} dokončených kurzů
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="modules">Moduly</TabsTrigger>
              <TabsTrigger value="schedule">Rozvrh</TabsTrigger>
              <TabsTrigger value="materials">Materiály</TabsTrigger>
            </TabsList>
            
            <TabsContent value="modules" className="space-y-4 mt-6">
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <Card key={module.id} className="border-rust-800/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {module.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                          )}
                          <div>
                            <h4 className="font-medium text-foreground">{module.title}</h4>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {module.duration}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4 mt-6">
              {course.schedule.map((day, index) => (
                <Card key={index} className="border-rust-800/30">
                  <CardHeader>
                    <CardTitle className="text-lg text-rust-400">{day.day} - {day.date}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex justify-between items-center py-2 border-b border-rust-800/20 last:border-b-0">
                          <span className="font-medium text-rust-400">{activity.time}</span>
                          <span className="text-foreground">{activity.activity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="materials" className="space-y-4 mt-6">
              <div className="space-y-4">
                {course.materials.map((material) => (
                  <Card key={material.id} className="border-rust-800/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {material.type === 'PDF' ? (
                            <FileText className="h-5 w-5 text-red-500" />
                          ) : (
                            <Video className="h-5 w-5 text-blue-500" />
                          )}
                          <div>
                            <h4 className="font-medium text-foreground">{material.title}</h4>
                            <p className="text-sm text-muted-foreground">{material.type} • {material.size}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-rust-600 text-rust-600 hover:bg-rust-600 hover:text-white">
                          <Download className="h-4 w-4 mr-2" />
                          Stáhnout
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="border-rust-800/30">
            <CardHeader>
              <CardTitle className="text-rust-400 font-orbitron">Pokrok kurzu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-rust-400">{course.progress}%</div>
                  <p className="text-sm text-muted-foreground">Dokončeno</p>
                </div>
                <Progress value={course.progress} className="h-3" />
                <div className="text-sm text-muted-foreground text-center">
                  {completedModules} z {totalModules} modulů dokončeno
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rust-800/30">
            <CardHeader>
              <CardTitle className="text-rust-400 font-orbitron">Instruktor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="font-medium text-foreground">{course.instructor}</div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm">{course.rating} hodnocení</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Certifikovaný instruktor přežití s více než 10 lety zkušeností.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-rust-800/30">
            <CardHeader>
              <CardTitle className="text-rust-400 font-orbitron">Informace o kurzu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Obtížnost:</span>
                  <span className="text-orange-600 font-medium">{course.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cena:</span>
                  <span className="font-medium">{course.price.toLocaleString()} Kč</span>
                </div>
                <div className="flex justify-between">
                  <span>Účastníci:</span>
                  <span>{course.participants.length}/{course.maxParticipants}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
