import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { LOGIN_ENDPOINT } from "../config";

const Login = () => {
  const [usernameInput, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_ENDPOINT, {
        username: usernameInput,
        password,
      });

      console.log(response);

      const { message, user } = response.data;
      const { username, role } = user;

      // Store user data in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ username: username, role })
      );

      toast.success(message);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl animate-fade-in">
        <h1 className="text-3xl font-bold text-center mb-8 text-secondary">
          Asset Management
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
