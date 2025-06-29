
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ClientSidebar from "./ClientSidebar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ClientSidebar />
        <main className="flex-1">
          <header className="h-16 flex items-center border-b border-rust-800/30 px-4">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/e20e7f97-3e9c-43ad-a44f-0081c948e9df.png" 
                alt="Přežij TO! Logo" 
                className="w-8 h-8"
              />
              <span className="font-orbitron font-bold text-xl text-rust-400">Přežij TO!</span>
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
