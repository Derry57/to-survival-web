
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-rust-800/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/lovable-uploads/019e2001-f49b-46c7-b8af-c84d58987b99.png" 
                alt="PřežijTO Logo" 
                className="w-8 h-8 opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="font-orbitron font-bold text-xl text-rust-400 text-glow">PřežijTO</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/courses"
              className={`text-sm font-rajdhani font-medium transition-colors hover:text-rust-400 ${
                isActive("/courses") ? "text-rust-400" : "text-foreground"
              }`}
            >
              KURZY
            </Link>
            <Link
              to="/instructors"
              className={`text-sm font-rajdhani font-medium transition-colors hover:text-rust-400 ${
                isActive("/instructors") ? "text-rust-400" : "text-foreground"
              }`}
            >
              INSTRUKTOŘI
            </Link>
            <Link
              to="/calendar"
              className={`text-sm font-rajdhani font-medium transition-colors hover:text-rust-400 ${
                isActive("/calendar") ? "text-rust-400" : "text-foreground"
              }`}
            >
              KALENDÁŘ
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-rajdhani font-medium transition-colors hover:text-rust-400 ${
                isActive("/contact") ? "text-rust-400" : "text-foreground"
              }`}
            >
              KONTAKT
            </Link>
          </div>

          <Button className="bg-rust-600 hover:bg-rust-700 text-white font-rajdhani font-medium">
            PŘIHLÁŠENÍ
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
