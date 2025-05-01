import React from "react";

const CreateTask = () => {
  return (
    <div id="create-task" className="mt-10">
      <div className="bg-[#2d2d2d] p-6 rounded-lg border-2 border-blue-500 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-200 mb-4 flex items-center">
          <span className="mr-2 text-blue-400">Ⓒ</span> Create Task
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Make a UI design"
              className="w-full p-2 bg-[#3d3d3d] text-white border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              placeholder="Detailed description of the task (Max 100 words)"
              className="w-full p-2 bg-[#3d3d3d] text-white border-none rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Date
            </label>
            <input
              type="date"
              className="w-full p-2 bg-[#3d3d3d] text-white border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Assign To
            </label>
            <input
              type="text"
              placeholder="Enter assignee name"
              className="w-full p-2 bg-[#3d3d3d] text-white border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Category
            </label>
            <input
              type="text"
              placeholder="Design, Development, etc..."
              className="w-full p-2 bg-[#3d3d3d] text-white border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
