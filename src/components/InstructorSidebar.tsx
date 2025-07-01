
import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  Users, 
  FileText, 
  Settings,
  Calendar,
  ChevronDown,
  ChevronRight,
  Menu,
  Plus
} from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const InstructorSidebar = () => {
  const location = useLocation();
  const [coursesOpen, setCoursesOpen] = useState(true);
  
  const menuItems = [
    {
      title: "Kurzy",
      icon: BookOpen,
      url: "/instructor/courses",
      hasSubmenu: true,
      submenu: [
        { title: "Všechny kurzy", url: "/instructor/courses", icon: BookOpen },
        { title: "Vytvořit kurz", url: "/instructor/courses/create", icon: Plus },
        { title: "Kalendář", url: "/instructor/calendar", icon: Calendar },
      ]
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
                  {item.hasSubmenu ? (
                    <Collapsible open={coursesOpen} onOpenChange={setCoursesOpen}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full">
                          <item.icon className="mr-2 h-4 w-4" />
                          <span className="flex-1">{item.title}</span>
                          {coursesOpen ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.submenu?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(subItem.url)}
                              >
                                <Link to={subItem.url} className="flex items-center">
                                  <subItem.icon className="mr-2 h-4 w-4" />
                                  {subItem.title}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <Link to={item.url}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
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
