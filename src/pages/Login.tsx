import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
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
        navigate("/");
      } else {
        setInvalidLogin(true);
      }
    }, 1500);
  };

  const handleSellerLogin = () => {
    setIsSeller(true);
    localStorage.setItem("isSeller", "true");
    navigate("/seller-dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsSeller(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("isSeller");
    navigate("/login");
  };

  if (isSeller) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  return (
    <Layout>
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
              {invalidLogin && <p className="text-red-500 text-sm text-center">Invalid details</p>}
              <Button 
                type="submit" 
                className="w-full bg-craft-terracotta hover:bg-craft-clay"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              {/* Login as Artisan Button - Placed Below Sign In */}
              <Button 
                onClick={handleSellerLogin} 
                className="w-full mt-2 bg-craft-forest hover:bg-craft-darkforest text-white"
              >
                Login as Artisan
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 items-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-craft-terracotta hover:text-craft-clay">
                Sign up
              </Link>
            </p>
            {/* Register as Artisan Option Below Sign Up */}
            <p className="text-sm text-muted-foreground">
              Want to sell your crafts?{" "}
              <Link to="/artisan-register" className="text-craft-forest hover:text-craft-darkforest">
                Register as Artisan
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
