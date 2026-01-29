"use client";

import { Plus, Package, Trash2, Edit2, X, Check } from "lucide-react";
import { useState } from "react";

export default function ResourcesPage() {
  // Sample resources data
  const [resources, setResources] = useState([
    { id: 1, category: "Food", itemName: "Rice (50kg sacks)", quantity: 25 },
    { id: 2, category: "Food", itemName: "Canned Goods", quantity: 150 },
    { id: 3, category: "Food", itemName: "Bottled Water (1L)", quantity: 300 },
    { id: 4, category: "Medical", itemName: "First Aid Kits", quantity: 15 },
    { id: 5, category: "Medical", itemName: "Face Masks", quantity: 500 },
    { id: 6, category: "Medical", itemName: "Alcohol (500ml)", quantity: 40 },
    { id: 7, category: "Clothing", itemName: "Blankets", quantity: 80 },
    { id: 8, category: "Clothing", itemName: "T-Shirts", quantity: 120 },
    { id: 9, category: "Tools", itemName: "Flashlights", quantity: 30 },
    { id: 10, category: "Tools", itemName: "Rope (meters)", quantity: 200 },
  ]);

  // Filter and search states
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Edit modal states
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editMode, setEditMode] = useState<"add" | "remove">("add");

  // Get unique categories
  const categories = [
    "All",
    ...Array.from(new Set(resources.map((item) => item.category))),
  ];

  // Filter resources
  const filteredResources = resources.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.itemName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Open edit modal
  const openEditModal = (id: number, currentQuantity: number) => {
    setEditingItem(id);
    setEditAmount("");
    setEditMode("add");
  };

  // Handle edit
  const handleBulkEdit = () => {
    const amount = parseInt(editAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive number");
      return;
    }

    setResources(
      resources.map((item) => {
        if (item.id === editingItem) {
          if (editMode === "add") {
            return { ...item, quantity: item.quantity + amount };
          } else {
            const newQuantity = item.quantity - amount;
            return { ...item, quantity: Math.max(0, newQuantity) };
          }
        }
        return item;
      }),
    );

    setEditingItem(null);
    setEditAmount("");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Resources Inventory
        </h1>
      </div>

      {/* Filters and Add Button */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by item name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Category Filter Dropdown */}
        <div className="w-full md:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-transparent bg-white "
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>

        {/* Add New Resource Button */}
        <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
          <Plus size={20} />
          Add New Resource
        </button>
      </div>

      {/* Scrollable Table Container */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden max-h-100 overflow-y-auto">
        <table className="w-full">
          {/* Table Header - Sticky */}
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Item Name
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                Quantity
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {filteredResources.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                {/* Category */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full  font-semibold ${
                      item.category === "Food"
                    }`}
                  >
                    {item.category}
                  </span>
                </td>

                {/* Item Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-900 font-medium">
                      {item.itemName}
                    </span>
                  </div>
                </td>

                {/* Quantity */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    {/* Quantity Display */}
                    <span>{item.quantity}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => openEditModal(item.id, item.quantity)}
                      className="px-5 p-2 text-white hover:bg-red-600 rounded-lg transition-colors bg-red-700"
                    >
                      Edit Stock
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium">
              No resources found
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {searchQuery || selectedCategory !== "All"
                ? "Try adjusting your filters"
                : "Add your first resource to get started"}
            </p>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {filteredResources.length} of {resources.length} items
      </div>

      {/* Edit Modal */}
      {editingItem !== null && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Quantity</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Current Item Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Editing:</p>
              <p className="font-semibold text-gray-900">
                {resources.find((r) => r.id === editingItem)?.itemName}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Current quantity:{" "}
                <span className="font-bold">
                  {resources.find((r) => r.id === editingItem)?.quantity}
                </span>
              </p>
            </div>

            {/* Add/Remove Toggle */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Action
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditMode("add")}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    editMode === "add"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Add Stock
                </button>
                <button
                  onClick={() => setEditMode("remove")}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    editMode === "remove"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Remove Stock
                </button>
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many to {editMode === "add" ? "add" : "remove"}?
              </label>
              <input
                type="number"
                min="1"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                placeholder="Enter amount..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setEditingItem(null)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkEdit}
                className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                  editMode === "add"
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
