"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X, Pencil, Trash2, UserCog, User } from "lucide-react";

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export default function ManageUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "barangay_official",
    password: "",
  });

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, role")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setAlert("Failed to fetch users");
    }
  };

  // Search functionality
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  // Split full name into first and last name
  const getFirstName = (fullName: string) => {
    return fullName?.split(" ")[0] || "";
  };

  const getLastName = (fullName: string) => {
    const parts = fullName?.split(" ");
    return parts?.slice(1).join(" ") || "";
  };

  // Open create modal
  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setSelectedUser(null);
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      role: "barangay_official",
      password: "",
    });
    setIsModalOpen(true);
  };

  // Open edit modal
  const handleOpenEditModal = (user: User) => {
    setIsEditMode(true);
    setSelectedUser(user);
    setFormData({
      email: user.email,
      firstName: getFirstName(user.full_name),
      lastName: getLastName(user.full_name),
      role: user.role,
      password: "",
    });
    setIsModalOpen(true);
    setOpenActionMenu(null);
  };

  // Handle create user
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert("");

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: fullName,
            role: formData.role,
          },
        },
      });

      if (error) throw error;

      setAlert("User created successfully!");
      setIsModalOpen(false);
      fetchUsers();
    } catch (error: any) {
      setAlert(error.message || "Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle update user
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert("");

    if (!selectedUser) return;

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          role: formData.role,
        })
        .eq("id", selectedUser.id);

      if (profileError) throw profileError;

      // Update email if changed
      if (formData.email !== selectedUser.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: formData.email,
        });
        if (emailError) throw emailError;
      }

      // Update password if provided
      if (formData.password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: formData.password,
        });
        if (passwordError) throw passwordError;
      }

      setAlert("User updated successfully!");
      setIsModalOpen(false);
      fetchUsers();
    } catch (error: any) {
      setAlert(error.message || "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setIsLoading(true);
    setAlert("");

    try {
      // Delete from auth.users (will cascade to profiles)
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) throw error;

      setAlert("User deleted successfully!");
      fetchUsers();
    } catch (error: any) {
      setAlert(error.message || "Failed to delete user");
    } finally {
      setIsLoading(false);
      setOpenActionMenu(null);
    }
  };

  return (
    <div>
      {/* Alert */}
      {alert && (
        <div className="fixed top-4 right-4 z-50 bg-white px-6 py-3 rounded-lg shadow-lg border-l-4 border-red-600 max-w-md">
          <p className="text-gray-900 font-medium">{alert}</p>
          <button
            onClick={() => setAlert("")}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Manage Users
          </h1>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          + Create User
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {/* Users Table */}
      <div
        className="bg-white rounded-lg shadow overflow-hidden"
        style={{ minHeight: "320px" }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getFirstName(user.full_name)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getLastName(user.full_name)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.role === "admin" ? "Admin" : "Barangay"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenActionMenu(
                          openActionMenu === user.id ? null : user.id,
                        )
                      }
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <UserCog size={18} />
                    </button>

                    {openActionMenu === user.id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <button
                          onClick={() => handleOpenEditModal(user)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center gap-2"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-500">No users found</div>
        )}
      </div>

      {/* Create/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6">
              {isEditMode ? "Edit User" : "Create New User"}
            </h2>

            <form onSubmit={isEditMode ? handleUpdateUser : handleCreateUser}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    disabled={isLoading}
                  >
                    <option value="barangay_official">Barangay</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password {isEditMode && "(leave blank to keep current)"}
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required={!isEditMode}
                    minLength={6}
                    disabled={isLoading}
                    placeholder={
                      isEditMode ? "Enter new password" : "Min 6 characters"
                    }
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Saving..."
                    : isEditMode
                      ? "Update User"
                      : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
