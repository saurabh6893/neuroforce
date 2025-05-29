import { useEffect, useState } from "react";
import { createTask } from "../../api/taskApi";
import InputField from "./InputFeild";

import { getEmployees } from "../../api/employeeApi";

const CreateTask = ({ onSuccess }: any) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [category, setCategory] = useState("");
  const [assigneeList, setAssigneeList] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await getEmployees();
        setAssigneeList(response.data.map((emp) => emp.email));
      } catch (err) {
        console.error("Failed to fetch employees", err);
      }
    }
    fetchEmployees();
  }, []);

  const SubmitTask = async (e) => {
    e.preventDefault();
    try {
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
      await createTask(task);
      setTaskTitle("");
      setTaskDescription("");
      setTaskDate("");
      setCategory("");
      setAssignee("");
      onSuccess();
    } catch (err) {
      alert("Failed to create task! Did you enter all fields?\n" + err);
    }
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

          <div>
            <label htmlFor="assignee" className="block text-gray-200">
              Assign To (employee email)
            </label>
            <select
              id="assignee"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="mt-1 block w-full ...">
              <option value="">--Select Employee--</option>
              {assigneeList.map((email) => (
                <option key={email} value={email}>
                  {email}
                </option>
              ))}
            </select>
          </div>

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
