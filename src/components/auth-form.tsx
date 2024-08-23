import { useState } from "react";
import { useAuthMutation } from "../mutations/auth";

export const AuthForm = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { authMutate, setAuthLoading } = useAuthMutation();

  const handleSubmit = () => {
    setAuthLoading(true);
    console.log("Submitting:", { username, password });
    authMutate({
      username,
      password,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg gap-6">
        <h2 className="text-2xl font-bold text-center text-yellow-700 mb-6">Summer Login</h2>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
