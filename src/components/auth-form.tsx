import { useState } from "react";
import { useAuthMutation } from "../mutations/auth";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";

export const AuthForm = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { authMutate, setAuthLoading } = useAuthMutation();

  const handleSubmit = async () => {
    setIsLoading(true);
    setAuthLoading(true);
    setErrorMessage("");

    try {
      await authMutate({
        username,
        password,
      });
    } catch (error: unknown) {
      console.log(error)
      setErrorMessage("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
      setAuthLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-xl">
        
        {errorMessage && (
          <div className="mb-4 text-sm text-red-500 text-center">
            {errorMessage}
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400">Username</label>
            <div className="relative mt-1">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="block w-full px-10 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your username"
                required
              />
              <AiOutlineUser className="absolute left-3 top-2.5 text-gray-500" size={20} />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
            <div className="relative mt-1">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-10 py-2 border border-gray-600 rounded-md shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
                required
              />
              <AiOutlineLock className="absolute left-3 top-2.5 text-gray-500" size={20} />
            </div>
          </div>
          
          <div>
            <button
              onClick={handleSubmit}
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md shadow-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
