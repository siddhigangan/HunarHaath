import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-craft-forest">My Account</h1>
          <Button
            onClick={handleLogout}
            className="bg-craft-forest text-white hover:bg-craft-forest/90"
          >
            Logout
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === "orders" ? "default" : "outline"}
            onClick={() => setActiveTab("orders")}
            className="bg-craft-terracotta text-white hover:bg-craft-clay"
          >
            My Orders
          </Button>
          <Button
            variant={activeTab === "profile" ? "default" : "outline"}
            onClick={() => setActiveTab("profile")}
            className="bg-craft-terracotta text-white hover:bg-craft-clay"
          >
            Profile
          </Button>
        </div>

        {/* Orders Tab Content */}
        {activeTab === "orders" && (
          <Card>
            <CardHeader>
              <CardTitle>My Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500">
                <p>You haven't placed any orders yet.</p>
                <Button
                  onClick={() => navigate("/products")}
                  className="mt-4 bg-craft-terracotta text-white hover:bg-craft-clay"
                >
                  Start Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">khushigildaamt@gmail.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="font-medium">Customer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
} 