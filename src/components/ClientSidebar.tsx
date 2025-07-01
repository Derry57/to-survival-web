
import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, 
  FileText, 
  Shield, 
  CreditCard, 
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  Clock,
  History,
  Menu
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

const ClientSidebar = () => {
  const location = useLocation();
  const [coursesOpen, setCoursesOpen] = useState(true);
  
  const menuItems = [
    {
      title: "Mé kurzy",
      icon: BookOpen,
      url: "/client/courses",
      hasSubmenu: true,
      submenu: [
        { title: "Aktuální", url: "/client/courses/current", icon: Clock },
        { title: "Historie", url: "/client/courses/history", icon: History },
      ]
    },
    {
      title: "Faktury",
      icon: FileText,
      url: "/client/invoices",
    },
    {
      title: "Smlouvy",
      icon: Shield,
      url: "/client/contracts",
    },
    {
      title: "Pojištění",
      icon: CreditCard,
      url: "/client/insurance",
    },
    {
      title: "Shop",
      icon: ShoppingBag,
      url: "/client/shop",
    },
  ];

  const isActive = (url: string) => location.pathname === url;

  return (
    <Sidebar className="w-64 border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-rust-400 font-bold">
            <Menu className="mr-2 h-4 w-4" />
            Klientská sekce
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

export default ClientSidebar;
