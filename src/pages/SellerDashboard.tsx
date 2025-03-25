import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SellerDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isSeller");
    navigate("/login");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome, Seller!</h2>
      <p>You are logged in as an artisan.</p>
      <Button onClick={handleLogout} className="mt-4 bg-red-500 hover:bg-red-600">
        Logout
      </Button>
    </div>
  );
}
