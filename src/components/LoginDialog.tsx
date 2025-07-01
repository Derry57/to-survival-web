
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

  const handleForgotPassword = async () => {
    if (!email) {
      toast({
        title: "Chyba",
        description: "Nejprve zadejte váš email",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/`,
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
        description: "Zkontrolujte svůj email pro instrukce k obnovení hesla",
      });
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="btn btn-primary font-medium">
          PŘIHLÁŠENÍ
        </Button>
      </DialogTrigger>
      <DialogContent className="card">
        <DialogHeader>
          <DialogTitle className="text-rust-400 text-center">
            Přihlášení / Registrace
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Přihlášení</TabsTrigger>
            <TabsTrigger value="signup">Registrace</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="label text-foreground">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password" className="label text-foreground">
                  Heslo
                </Label>
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-rust-400 hover:text-rust-600 transition-colors"
                >
                  Zapomněli jste heslo?
                </button>
              </div>
              <Button
                type="submit"
                className="w-full btn btn-primary font-medium"
                disabled={isLoading}
              >
                {isLoading ? "PŘIHLAŠOVÁNÍ..." : "PŘIHLÁSIT SE"}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="label text-foreground">
                  Email
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="label text-foreground">
                  Heslo
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="label text-foreground">
                  Potvrdit heslo
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input"
                  required
                  minLength={6}
                />
              </div>
              <Button
                type="submit"
                className="w-full btn btn-primary font-medium"
                disabled={isLoading}
              >
                {isLoading ? "REGISTROVÁNÍ..." : "REGISTROVAT SE"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
