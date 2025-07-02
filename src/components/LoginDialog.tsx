
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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoginDialog = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Chyba při přihlášení",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Úspěšné přihlášení",
        description: "Vítejte zpět!",
      });
      setIsOpen(false);
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Chyba",
        description: "Hesla se neshodují",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      toast({
        title: "Chyba při registraci",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Registrace úspěšná",
        description: "Zkontrolujte svůj email pro potvrzení účtu",
      });
      setIsOpen(false);
    }

    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast({
        title: "Chyba",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email odeslán",
        description: "Zkontrolujte svůj email pro pokyny k obnovení hesla",
      });
      setShowForgotPassword(false);
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowForgotPassword(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="bg-rust-600 hover:bg-rust-700 text-white font-rajdhani font-medium">
          PŘIHLÁŠENÍ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-rust-800/30">
        <DialogHeader>
          <DialogTitle className="text-rust-400 font-orbitron text-center">
            {showForgotPassword ? "Obnovit heslo" : "Přihlášení / Registrace"}
          </DialogTitle>
        </DialogHeader>
        
        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="text-foreground font-rajdhani">
                Email
              </Label>
              <Input
                id="reset-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-rust-800/30"
                required
              />
            </div>
            <div className="space-y-2">
              <Button
                type="submit"
                className="w-full bg-rust-600 hover:bg-rust-700 text-white font-rajdhani font-medium"
                disabled={isLoading}
              >
                {isLoading ? "ODESÍLÁNÍ..." : "ODESLAT ODKAZ"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-rust-400 hover:text-rust-300"
                onClick={() => setShowForgotPassword(false)}
              >
                Zpět na přihlášení
              </Button>
            </div>
          </form>
        ) : (
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Přihlášení</TabsTrigger>
              <TabsTrigger value="signup">Registrace</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-foreground font-rajdhani">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-rust-800/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-foreground font-rajdhani">
                    Heslo
                  </Label>
                  <Input
                    id="login-password"
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
                  disabled={isLoading}
                >
                  {isLoading ? "PŘIHLAŠOVÁNÍ..." : "PŘIHLÁSIT SE"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-rust-400 hover:text-rust-300 font-rajdhani"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Zapomněli jste heslo?
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-foreground font-rajdhani">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-rust-800/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-foreground font-rajdhani">
                    Heslo
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background border-rust-800/30"
                    required
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-foreground font-rajdhani">
                    Potvrdit heslo
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-background border-rust-800/30"
                    required
                    minLength={6}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-rust-600 hover:bg-rust-700 text-white font-rajdhani font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "REGISTROVÁNÍ..." : "REGISTROVAT SE"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
