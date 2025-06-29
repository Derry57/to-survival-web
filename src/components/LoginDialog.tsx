
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginDialog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic with Supabase
    console.log("Login attempt:", { email, password });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-rust-600 hover:bg-rust-700 text-white font-rajdhani font-medium">
          PŘIHLÁŠENÍ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-rust-800/30">
        <DialogHeader>
          <DialogTitle className="text-rust-400 font-orbitron text-center">
            Přihlášení
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-rajdhani">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background border-rust-800/30"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-rajdhani">
              Heslo
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background border-rust-800/30"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-rust-600 hover:bg-rust-700 text-white font-rajdhani font-medium"
          >
            PŘIHLÁSIT SE
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
