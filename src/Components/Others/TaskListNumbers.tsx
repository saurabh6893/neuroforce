const TaskListNumbers = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="py-6 px-6 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-4xl font-bold">0</h2>
        <h3 className="text-lg font-medium opacity-90">New Task</h3>
      </div>
      <div className="py-6 px-6 rounded-xl bg-gradient-to-br from-green-400 to-green-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-4xl font-bold">3</h2>
        <h3 className="text-lg font-medium opacity-90">Completed</h3>
      </div>
      <div className="py-6 px-6 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-4xl font-bold">0</h2>
        <h3 className="text-lg font-medium opacity-90">Accepted</h3>
      </div>
      <div className="py-6 px-6 rounded-xl bg-gradient-to-br from-red-400 to-red-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-4xl font-bold">1</h2>
        <h3 className="text-lg font-medium opacity-90">Failed</h3>
      </div>
    </div>
  );
};

export default TaskListNumbers;
