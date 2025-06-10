import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Database, LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AssetRegistration from "@/components/AssetRegistration";
import AssetList from "@/components/AssetList";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Get user data from localStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen max-h-screen flex flex-col bg-background">
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <Database className="h-6 w-6 text-primary animate-fade-in" />
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                Asset Management
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">{user?.username}</span>
                <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg">
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8 overflow-hidden animate-fade-in">
        <div className="px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <h1 className="text-2xl font-semibold text-gray-900">
              Asset Management System
            </h1>
            {isAdmin && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white transition-all duration-200 hover:shadow-md">
                    <Plus className="h-5 w-5 mr-2" />
                    <span className="whitespace-nowrap">Register Asset</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <AssetRegistration />
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="bg-white shadow-card rounded-lg animate-fade-in">
            <div className="p-6">
              <AssetList searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;