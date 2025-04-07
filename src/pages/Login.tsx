import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FaUserCircle } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const [isSeller, setIsSeller] = useState(localStorage.getItem("isSeller") === "true");
  const [invalidLogin, setInvalidLogin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (email === "khushigildaamt@gmail.com" && password === "khushi11") {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        setInvalidLogin(false);
        toast({
          title: "Login Successful",
          description: "Welcome back to CraftConnect!",
        });
        navigate("/customer-dashboard");
      } else {
        setInvalidLogin(true);
      }
    }, 1500);
  };

  const handleSellerLogin = () => {
    navigate("/seller-login");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  if (isSeller) {
    return (
      <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center p-4 bg-craft-cream/20">
        <Card className="w-full max-w-md text-center animate-fade-up">
          <CardHeader>
            <FaUserCircle className="text-6xl text-craft-terracotta mx-auto" />
            <CardTitle className="text-2xl font-serif">Artisan Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You have logged in as Seller.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogout} className="w-full bg-craft-terracotta hover:bg-craft-clay">
              Logout
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center p-4 bg-craft-cream/20">
      <Card className="w-full max-w-md animate-fade-up">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif">Welcome back</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-craft-terracotta hover:text-craft-clay">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {invalidLogin && (
              <p className="text-red-500 text-sm">Invalid email or password</p>
            )}
            <Button 
              type="submit" 
              className="w-full bg-craft-terracotta hover:bg-craft-clay"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/register" className="text-craft-terracotta hover:text-craft-clay">
              Sign up
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleSellerLogin}
          >
            Login as Seller
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
