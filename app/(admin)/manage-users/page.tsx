export default function ManageUserPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-600 mt-2 mb-8">
            Manage user accounts and permissions
          </p>
        </div>
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <button className=" px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
              + Create User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
