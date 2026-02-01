"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { X, Pencil, Trash2, UserCog, User, Copy, Key } from "lucide-react";

// TypeScript interface to define the structure of a User object
// This helps with type safety and autocomplete in your code editor
interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export default function ManageUserPage() {
  // ===== STATE MANAGEMENT =====
  // useState hooks are used to store and manage component data that can change over time

  const [users, setUsers] = useState<User[]>([]); // Stores all users from database
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Stores filtered search results
  const [searchQuery, setSearchQuery] = useState(""); // Stores the search input text
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls if modal is visible or hidden
  const [isEditMode, setIsEditMode] = useState(false); // Determines if modal is for creating or editing
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Stores the user being edited
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null); // Controls which action menu is open
  const [isLoading, setIsLoading] = useState(false); // Shows loading state during API calls
  const [alert, setAlert] = useState(""); // Stores alert/notification messages
  const [generatedPassword, setGeneratedPassword] = useState(""); // Stores auto-generated password
  const [showPassword, setShowPassword] = useState(false); // Toggles password visibility
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Controls delete confirmation modal
  const [userToDelete, setUserToDelete] = useState<string | null>(null); // Stores ID of user to be deleted

  // Form data state - stores all input field values
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "barangay_official",
    password: "",
  });

  // ===== LIFECYCLE EFFECTS =====
  // useEffect runs code when component mounts or when dependencies change

  // Fetch users when component first loads (empty array [] means run only once)
  useEffect(() => {
    fetchUsers();
  }, []);

  // ===== DATABASE FUNCTIONS =====

  /**
   * Fetches all users from the database
   * This function queries Supabase to get user profiles and displays them in the table
   */
  const fetchUsers = async () => {
    try {
      // Query the 'profiles' table in Supabase
      // .select() specifies which columns to retrieve
      // .order() sorts results by creation date (newest first)
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, role")
        .order("created_at", { ascending: false });

      // If there's an error, throw it to be caught by the catch block
      if (error) throw error;

      // Update both users and filteredUsers state with the fetched data
      // The || [] ensures we set an empty array if data is null/undefined
      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setAlert("Failed to fetch users");
    }
  };

  // ===== SEARCH FUNCTIONALITY =====

  /**
   * Filter users based on search query
   * This effect runs whenever searchQuery or users array changes
   */
  useEffect(() => {
    // .filter() creates a new array with only items that match the condition
    const filtered = users.filter(
      (user) =>
        // .toLowerCase() makes search case-insensitive
        // .includes() checks if the search term exists in the field
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]); // Dependencies - run when these values change

  // ===== HELPER FUNCTIONS =====

  /**
   * Extracts first name from full name string
   * Example: "John Doe" returns "John"
   */
  const getFirstName = (fullName: string) => {
    // .split(" ") breaks string into array at spaces
    // [0] gets the first element (first name)
    return fullName?.split(" ")[0] || "";
  };

  /**
   * Extracts last name from full name string
   * Example: "John Doe Smith" returns "Doe Smith"
   */
  const getLastName = (fullName: string) => {
    const parts = fullName?.split(" ");
    // .slice(1) gets all elements after index 0
    // .join(" ") combines them back into a string
    return parts?.slice(1).join(" ") || "";
  };

  /**
   * Generates a random secure password
   * Creates an 8-character password with letters and numbers
   */
  const generatePassword = () => {
    // Character set to use for password generation
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    let password = "";

    // Loop 8 times to create 8-character password
    for (let i = 0; i < 8; i++) {
      // Math.random() creates random number between 0 and 1
      // Multiply by chars.length and floor to get random index
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Update both the generated password display and the form data
    setGeneratedPassword(password);
    setFormData({ ...formData, password });
    setShowPassword(true); // Show the password when generated
  };

  /**
   * Copies password to clipboard
   * Uses the modern Clipboard API
   * Copies generated password if it exists, otherwise copies the current password field value
   */
  const copyPassword = async () => {
    try {
      // Copy either the generated password or the current password field value
      const passwordToCopy = generatedPassword || formData.password;

      if (!passwordToCopy) {
        setAlert("No password to copy!");
        setTimeout(() => setAlert(""), 2000);
        return;
      }

      // navigator.clipboard.writeText() copies text to system clipboard
      await navigator.clipboard.writeText(passwordToCopy);
      setAlert("Password copied to clipboard!");

      // Auto-hide the success message after 2 seconds
      setTimeout(() => setAlert(""), 2000);
    } catch (error) {
      setAlert("Failed to copy password");
    }
  };

  // ===== MODAL HANDLERS =====

  /**
   * Opens modal in CREATE mode
   * Resets all form fields to default values
   */
  const handleOpenCreateModal = () => {
    setIsEditMode(false); // Set to create mode
    setSelectedUser(null); // Clear any selected user
    setGeneratedPassword(""); // Clear generated password
    setShowPassword(false); // Hide password field initially

    // Reset form to default values using spread operator {...}
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      role: "barangay_official",
      password: "",
    });
    setIsModalOpen(true); // Show the modal
  };

  /**
   * Opens modal in EDIT mode
   * Pre-fills form with selected user's data
   */
  const handleOpenEditModal = (user: User) => {
    setIsEditMode(true); // Set to edit mode
    setSelectedUser(user); // Store the user being edited
    setGeneratedPassword(""); // Clear any generated password
    setShowPassword(false); // Hide password field

    // Pre-fill form with user's current data
    setFormData({
      email: user.email,
      firstName: getFirstName(user.full_name),
      lastName: getLastName(user.full_name),
      role: user.role,
      password: "", // Password starts empty in edit mode
    });
    setIsModalOpen(true); // Show the modal
    setOpenActionMenu(null); // Close the action menu
  };

  // ===== CRUD OPERATIONS =====

  /**
   * CREATE: Adds a new user to the database
   * Uses Supabase Auth to create user account
   */
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload on form submit
    setIsLoading(true); // Show loading state
    setAlert(""); // Clear any previous alerts

    try {
      // Combine first and last name into full name
      // .trim() removes extra spaces at beginning/end
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      // Create new user in Supabase Auth
      // signUp() creates both auth user and profile automatically
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            // Additional user metadata stored in profile
            full_name: fullName,
            role: formData.role,
          },
        },
      });

      if (error) throw error;

      setAlert("User created successfully!");
      setIsModalOpen(false); // Close the modal
      fetchUsers(); // Refresh the user list
    } catch (error: any) {
      // error: any allows us to access error.message
      setAlert(error.message || "Failed to create user");
    } finally {
      // finally block runs whether try succeeds or fails
      setIsLoading(false);
    }
  };

  /**
   * UPDATE: Modifies existing user data
   * Updates profile info and optionally email/password
   */
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert("");

    // Guard clause - exit if no user is selected
    if (!selectedUser) return;

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      // Update the user's profile in the profiles table
      // .update() modifies existing rows
      // .eq() specifies which row to update (where id equals selectedUser.id)
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          role: formData.role,
        })
        .eq("id", selectedUser.id);

      if (profileError) throw profileError;

      // Only update email if it was changed
      if (formData.email !== selectedUser.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: formData.email,
        });
        if (emailError) throw emailError;
      }

      // Only update password if a new one was provided
      if (formData.password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: formData.password,
        });
        if (passwordError) throw passwordError;
      }

      setAlert("User updated successfully!");
      setIsModalOpen(false);
      fetchUsers(); // Refresh user list to show updates
    } catch (error: any) {
      setAlert(error.message || "Failed to update user");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * DELETE: Removes a user from the system
   * Shows confirmation dialog before deleting
   */
  /**
   * Opens the delete confirmation modal
   * Stores the user ID to delete and shows the modal
   */
  const openDeleteConfirmation = (userId: string) => {
    setUserToDelete(userId); // Store which user we want to delete
    setShowDeleteConfirm(true); // Show confirmation modal
    setOpenActionMenu(null); // Close the action menu
  };

  /**
   * Confirms and executes the user deletion
   * Called when user clicks "Delete" in confirmation modal
   */
  const confirmDeleteUser = async () => {
    if (!userToDelete) return; // Safety check

    setIsLoading(true);
    setAlert("");
    setShowDeleteConfirm(false); // Close the modal

    try {
      // Delete user from Supabase Auth
      // This will also delete their profile due to cascade delete setup
      const { error } = await supabase.auth.admin.deleteUser(userToDelete);

      if (error) throw error;

      setAlert("User deleted successfully!");
      fetchUsers(); // Refresh user list
    } catch (error: any) {
      setAlert(error.message || "Failed to delete user");
    } finally {
      setIsLoading(false);
      setUserToDelete(null); // Clear the stored user ID
    }
  };

  /**
   * RESET PASSWORD: Placeholder function for password reset
   * This doesn't do anything yet - ready for future implementation
   */
  const handleResetPassword = () => {
    setTimeout(() => setAlert(""), 2000);
  };

  // ===== RENDER / JSX =====
  return (
    <div>
      {/* ===== ALERT NOTIFICATION ===== */}
      {/* Only shows when alert has a value (conditional rendering with &&) */}
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

      {/* ===== PAGE HEADER ===== */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Manage Users
          </h1>
        </div>
        {/* Create User Button */}
        <button
          onClick={handleOpenCreateModal}
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          + Create User
        </button>
      </div>

      {/* ===== SEARCH BAR ===== */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {/* ===== USERS TABLE ===== */}
      <div
        className="bg-white rounded-lg shadow overflow-hidden"
        style={{ minHeight: "320px" }}
      >
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Header */}
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

          {/* Table Body - .map() creates a row for each user */}
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
                  {/* Ternary operator: condition ? valueIfTrue : valueIfFalse */}
                  {user.role === "admin" ? "Admin" : "Barangay"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {/* Action Menu */}
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

                    {/* Dropdown menu - only shows for the clicked row */}
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
                          onClick={() => openDeleteConfirmation(user.id)}
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

        {/* Empty State - shows when no users match the search */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-500">No users found</div>
        )}
      </div>

      {/* ===== CREATE/EDIT USER MODAL ===== */}
      {/* Modal only renders when isModalOpen is true */}
      {isModalOpen && (
        // Backdrop overlay - darkens and blurs the background
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          {/* Modal Container with improved styling */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditMode ? "Edit user" : "Create new user"}
              </h2>
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body - Form */}
            <form
              onSubmit={isEditMode ? handleUpdateUser : handleCreateUser}
              className="p-6"
            >
              <div className="space-y-5">
                {/* Email Field - Only show in create mode */}
                {!isEditMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className=" text-sm w-full px-4 py-1 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                      required
                      disabled={isLoading}
                      placeholder="user@example.com"
                    />
                  </div>
                )}

                {/* First Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="text-sm w-full px-4 py-1 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                    required
                    disabled={isLoading}
                    placeholder="Juan"
                  />
                </div>

                {/* Last Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="text-sm w-full px-4 py-1 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                    required
                    disabled={isLoading}
                    placeholder="Dela Cruz"
                  />
                </div>

                {/* Role Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="text-sm w-full px-4 py-1 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all cursor-pointer"
                    required
                    disabled={isLoading}
                  >
                    <option value="barangay_official">Barangay</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Password Field - Only show in Create mode */}
                {!isEditMode && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="flex gap-2">
                      {/* Password input */}
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="flex-1 px-4 py-1 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-mono text-sm"
                        required={!isEditMode}
                        minLength={6}
                        disabled={isLoading}
                        placeholder="Min 6 characters"
                      />

                      {/* Copy password button - always visible */}
                      <button
                        type="button"
                        onClick={copyPassword}
                        className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Copy password"
                      >
                        <Copy size={18} className="text-gray-600" />
                      </button>
                      <button
                        type="button"
                        onClick={generatePassword}
                        className="px-1 py-1 text-sm text-gray-700 font-medium flex items-center gap-1 bg-white hover:bg-gray-200 rounded-lg border border-gray-400 transition-colors "
                      >
                        Generate Password
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer - Action Buttons */}
              <div className="flex gap-3 mt-8">
                {/* Cancel Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-1 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  disabled={isLoading}
                >
                  Cancel
                </button>

                {/* Submit Button - text changes based on mode and loading state */}
                <button
                  type="submit"
                  className="flex-1 px-4 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-medium"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Saving..."
                    : isEditMode
                      ? "Update user"
                      : "Create user"}
                </button>
              </div>

              {/* Edit Mode: Additional Actions */}
              {isEditMode && (
                <div className=" flex justify-center mt-4 pt-4 border-t border-gray-200">
                  {/* Reset Password Button - No function yet */}
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className=" px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium text-xs"
                    disabled={isLoading}
                  >
                    Reset Password
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRMATION MODAL ===== */}
      {/* Custom confirmation dialog for deleting users */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              {/* Cancel button - closes modal without deleting */}
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setUserToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              {/* Delete button - confirms deletion */}
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
