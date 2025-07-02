
import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  FileText, 
  Settings,
  Calendar,
  Menu,
  Plus,
  List
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const InstructorSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Mé kurzy",
      icon: BookOpen,
      url: "/instructor/courses",
    },
    {
      title: "Vytvořit kurz",
      icon: Plus,
      url: "/instructor/courses/create",
    },
    {
      title: "Všechny kurzy",
      icon: List,
      url: "/instructor/all-courses",
    },
    {
      title: "Kalendář",
      icon: Calendar,
      url: "/instructor/calendar",
    },
    {
      title: "Účastníci",
      icon: Users,
      url: "/instructor/participants",
    },
    {
      title: "Poznámky",
      icon: FileText,
      url: "/instructor/notes",
    },
    {
      title: "Profil",
      icon: Settings,
      url: "/instructor/profile",
    },
  ];

  const isActive = (url: string) => location.pathname === url;

  return (
    <Sidebar className="w-64 border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-rust-400 font-bold">
            <Menu className="mr-2 h-4 w-4" />
            Instruktor
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default InstructorSidebar;
