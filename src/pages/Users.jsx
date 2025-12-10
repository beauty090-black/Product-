import { useEffect, useState } from "react";
import "../pages/Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    number: "",
    street: "",
    city: "",
    zipcode: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name: { firstname: form.firstname, lastname: form.lastname },
      username: form.username,
      email: form.email,
      phone: form.phone,
      address: {
        number: form.number,
        street: form.street,
        city: form.city,
        zipcode: form.zipcode,
      },
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setForm({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      phone: "",
      number: "",
      street: "",
      city: "",
      zipcode: "",
    });
    alert("User added successfully!");
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleGetSingleUser = (id) => {
    const user = users.find((u) => u.id === id);
    setSelectedUser(user || null);
  };

  return (
    <div className="users-page">
      <h1>User Management</h1>

      <form className="user-form" onSubmit={handleAddUser}>
        <h2>Add User</h2>
        <input
          type="text"
          placeholder="First Name"
          value={form.firstname}
          onChange={(e) => setForm({ ...form, firstname: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={form.lastname}
          onChange={(e) => setForm({ ...form, lastname: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address Number"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
        />
        <input
          type="text"
          placeholder="Street"
          value={form.street}
          onChange={(e) => setForm({ ...form, street: e.target.value })}
        />
        <input
          type="text"
          placeholder="City"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Zipcode"
          value={form.zipcode}
          onChange={(e) => setForm({ ...form, zipcode: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      <div className="users-list">
        <h2>All Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <p>
                <strong>Name:</strong> {user?.name?.firstname || "N/A"}{" "}
                {user?.name?.lastname || ""}
              </p>
              <p>
                <strong>Username:</strong> {user?.username || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {user?.email || "N/A"}
              </p>
              <div className="user-actions">
                <button
                  key={`view-${user.id}`}
                  onClick={() => handleGetSingleUser(user.id)}
                >
                  View
                </button>
                <button
                  key={`delete-${user.id}`}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedUser && (
        <div className="single-user-details">
          <h2>Selected User Details</h2>
          <p>
            <strong>Name:</strong> {selectedUser?.name?.firstname || ""}{" "}
            {selectedUser?.name?.lastname || ""}
          </p>
          <p>
            <strong>Username:</strong> {selectedUser?.username || ""}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser?.email || ""}
          </p>
          <p>
            <strong>Phone:</strong> {selectedUser?.phone || ""}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {selectedUser?.address?.number || ""} {selectedUser?.address?.street || ""},{" "}
            {selectedUser?.address?.city || ""}, {selectedUser?.address?.zipcode || ""}
          </p>
          <button onClick={() => setSelectedUser(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
