import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Instructors from "./pages/Instructors";
import Calendar from "./pages/Calendar";
import Contact from "./pages/Contact";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientCourses from "./pages/client/ClientCourses";
import ClientCoursesCurrent from "./pages/client/ClientCoursesCurrent";
import ClientCoursesHistory from "./pages/client/ClientCoursesHistory";
import CourseDetail from "./pages/client/CourseDetail";
import ClientInvoices from "./pages/client/ClientInvoices";
import ClientContracts from "./pages/client/ClientContracts";
import ClientInsurance from "./pages/client/ClientInsurance";
import ClientShop from "./pages/client/ClientShop";
import NotFound from "./pages/NotFound";
import ClientLayout from "./components/ClientLayout";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/instructors" element={<Instructors />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/contact" element={<Contact />} />
      <Route 
        path="/client/*" 
        element={
          <ProtectedRoute>
            <ClientLayout>
              <Routes>
                <Route index element={<ClientDashboard />} />
                <Route path="courses" element={<ClientCourses />} />
                <Route path="courses/current" element={<ClientCoursesCurrent />} />
                <Route path="courses/history" element={<ClientCoursesHistory />} />
                <Route path="course/:id" element={<CourseDetail />} />
                <Route path="invoices" element={<ClientInvoices />} />
                <Route path="contracts" element={<ClientContracts />} />
                <Route path="insurance" element={<ClientInsurance />} />
                <Route path="shop" element={<ClientShop />} />
              </Routes>
            </ClientLayout>
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
