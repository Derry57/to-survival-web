
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { LogOut, Trophy, Star, Target, Home } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ClientSidebar from "./ClientSidebar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const userStats = {
    xp: 750,
    maxXp: 1000,
    rank: "Ranger",
  };

  const badges = [
    { name: "První kroky", icon: Star },
    { name: "Urban Expert", icon: Target },
    { name: "Týmový hráč", icon: Trophy },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ClientSidebar />
        <main className="flex-1">
          <header className="h-20 flex items-center justify-between border-b border-rust-800/30 px-6">
            <div className="flex items-center space-x-4">
              <SidebarTrigger className="mr-2" />
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/e20e7f97-3e9c-43ad-a44f-0081c948e9df.png" 
                  alt="Přežij TO! Logo" 
                  className="w-8 h-8"
                />
                <span className="font-orbitron font-bold text-xl text-rust-400">Přežij TO!</span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-rust-600 text-rust-600 hover:bg-rust-600 hover:text-white font-rajdhani"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Odhlásit se
              </Button>
            </div>

            <div className="flex items-center space-x-6">
              {/* XP Bar */}
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="text-wasteland-400 border-wasteland-600">
                  {userStats.rank}
                </Badge>
                <div className="flex flex-col">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>XP: {userStats.xp}/{userStats.maxXp}</span>
                    <span>{Math.round((userStats.xp / userStats.maxXp) * 100)}%</span>
                  </div>
                  <Progress value={(userStats.xp / userStats.maxXp) * 100} className="h-2 w-32" />
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center space-x-2">
                {badges.map((badge, index) => (
                  <div key={index} className="flex items-center justify-center w-8 h-8 rounded-full bg-rust-600/20 border border-rust-600/30">
                    <badge.icon className="w-4 h-4 text-rust-400" />
                  </div>
                ))}
              </div>

              {/* Back to website link */}
              <Link to="/">
                <Button variant="outline" size="sm" className="border-wasteland-600 text-wasteland-400 hover:bg-wasteland-600 hover:text-white font-rajdhani">
                  <Home className="w-4 h-4 mr-2" />
                  Zpět na web
                </Button>
              </Link>
            </div>
          </header>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ClientLayout;
