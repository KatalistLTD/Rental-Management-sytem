import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure token exists
        if (!token) return;

        const response = await axios.get("/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user, setUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
        <div className="flex flex-col items-center">
          {/* User Avatar */}
          <div className="w-24 h-24 overflow-hidden border-4 border-blue-500 rounded-full">
            <img
              src={user.avatar || "https://via.placeholder.com/100"}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>

          {/* User Info */}
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {user.name || "John Doe"}
          </h2>
          <p className="text-gray-500">{user.email || "johndoe@example.com"}</p>
          <span className="px-4 py-1 mt-2 text-sm font-medium text-white bg-blue-600 rounded-full">
            {user.role || "User"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
