import { useEffect, useState } from "react";
import { getLocalStorage } from "../../utils/localStorage";
import InputField from "./InputFeild";

const CreateTask = ({ onSuccess }: { onSuccess: () => void }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [category, setCategory] = useState("");
  const [assigneeList, setAssigneeList] = useState<string[]>([]);

  useEffect(() => {
    const { empData } = getLocalStorage();
    const names = empData.map((emp: any) => emp.fullName);
    setAssigneeList(names);
  }, []);

  const SubmitTask = (e: React.FormEvent) => {
    e.preventDefault();

    const task = {
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      category,
      assignee,
      active: false,
      newTask: true,
      completed: false,
      failed: false,
    };

    const { empData } = getLocalStorage();

    const updatedEmpData = empData.map((emp: any) => {
      if (emp.fullName === assignee) {
        return {
          ...emp,
          tasks: [...emp.tasks, task],
        };
      }
      return emp;
    });

    localStorage.setItem("Employee", JSON.stringify(updatedEmpData));

    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setCategory("");
    setAssignee("");

    onSuccess();
  };

  return (
    <div id="create-task" className="mt-10 flex justify-center">
      <div className="w-[90%] md:w-[80%] bg-[#2d2d2d] p-6 md:p-8 rounded-lg border-2 border-blue-500 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-200 mb-6 flex items-center">
          <span className="mr-2 text-blue-400">Ⓒ</span> Create Task
        </h2>
        <form
          onSubmit={SubmitTask}
          className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Make a UI design"
          />

          <InputField
            label="Assign To"
            type="select"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            options={assigneeList}
          />

          <InputField
            label="Date"
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />

          <InputField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Design, Development, etc..."
          />

          <div className="md:col-span-2">
            <InputField
              label="Description"
              type="textarea"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Detailed description of the task (Max 100 words)"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
