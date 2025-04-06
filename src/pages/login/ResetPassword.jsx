import { useState } from "react";
import { resetPassword } from "../../services/api";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); 

    try {
      const result = await resetPassword(email);
      setMessage(result);
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Reset Password</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your email, and we'll send you a password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
            disabled={loading}
          >
            Send Reset Link
          </button>
        </form>
        {message && (
  <p className="mt-4 text-center text-sm text-red-500">{message}</p>
)}

      </div>
    </div>
  );
};
      
export default ResetPassword;
