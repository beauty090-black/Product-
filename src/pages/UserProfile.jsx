import { useState, useEffect } from "react";
import "../pages/UserProfile.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) setUser(storedUser);
  }, []);

  if (!user)
    return (
      <div className="user-profile">
        <p>No user is currently logged in.</p>
      </div>
    );

  return (
    <div className="user-profile">
      <h1>{user.name.firstname} {user.name.lastname}'s Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p>
        <strong>Address:</strong> {user.address.number} {user.address.street}, {user.address.city}, {user.address.zipcode}
      </p>
    </div>
  );
}
