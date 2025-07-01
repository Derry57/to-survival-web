
import { SidebarProvider } from "@/components/ui/sidebar";
import InstructorSidebar from "./InstructorSidebar";
import Navigation from "./Navigation";

interface InstructorLayoutProps {
  children: React.ReactNode;
}

const InstructorLayout = ({ children }: InstructorLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <SidebarProvider>
          <div className="flex min-h-[calc(100vh-5rem)]">
            <InstructorSidebar />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default InstructorLayout;
