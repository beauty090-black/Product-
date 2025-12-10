import axiosInstance from "./axiosConfig";

// 1️⃣ Get all users
export const getUsers = async () => {
  try {
    const res = await axiosInstance.get("/users");
    return res.data || [];
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};

// 2️⃣ Get single user by ID
export const getUser = async (id) => {
  try {
    const res = await axiosInstance.get(`/users/${id}`);
    return res.data || null;
  } catch (err) {
    console.error(`Error fetching user ${id}:`, err);
    return null;
  }
};


export const addUser = async (user) => {
  try {
    const res = await axiosInstance.post("/users", user);
    return res.data || null;
  } catch (err) {
    console.error("Error adding user:", err);
    return null;
  }
};


export const deleteUser = async (id) => {
  try {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data || null;
  } catch (err) {
    console.error(`Error deleting user ${id}:`, err);
    return null;
  }
};
