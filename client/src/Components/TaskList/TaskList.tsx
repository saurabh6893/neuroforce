import { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { AuthContext } from "../../Context/AuthProvider";
import { Employee, Task } from "../../types";
import ErrorBoundary from "../Common/ErrorBoundary";

interface TaskListProps {
  data: Employee | null;
  tasks: Task[];
  sortType: "title" | "dateAsc" | "dateDesc";
}

const TaskList = ({ data, tasks, sortType }: TaskListProps) => {
  const authData = useContext(AuthContext);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const getStatusColor = (task: Task) => {
    if (task.newTask) return "bg-gradient-to-r from-[#6366f1] to-[#a855f7]";
    if (task.active) return "bg-gradient-to-r from-[#3b82f6] to-[#06b6d4]";
    if (task.completed) return "bg-gradient-to-r from-[#22c55e] to-[#15803d]";
    if (task.failed) return "bg-gradient-to-r from-[#ef4444] to-[#b91c1c]";
    return "bg-gray-500";
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortType === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortType === "dateAsc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.set(cardsRef.current, { y: "400%", opacity: 0 });
      gsap.to(cardsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        stagger: 0.15,
      });
    }
  }, [tasks]);

  const handleUpdate = async (task: Task) => {
    try {
      const newStatus = task.newTask ? "Accepted" : "Completed";
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${authData?.token}` } }
      );
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${authData?.token}` },
      });
      const mappedTasks = response.data.map((t: any) => ({
        _id: t._id,
        title: t.title,
        description: t.description,
        date: new Date(t.createdAt).toISOString(),
        newTask: t.status === "New",
        active: t.status === "Accepted",
        completed: t.status === "Completed",
        failed: t.status === "Failed",
        assignedTo: t.assignedTo
          ? { _id: t.assignedTo._id, fullName: t.assignedTo.fullName }
          : undefined,
        createdBy: t.createdBy,
      }));
      authData?.setTasks?.(mappedTasks);
    } catch (error) {
      alert("Failed to update task status");
    }
  };

  if (!data || !tasks) {
    return <div>No tasks available</div>;
  }

  return (
    <ErrorBoundary fallback={<div>Error loading tasks!</div>}>
      <div className="h-[55%] overflow-x-auto flex items-center justify-start flex-nowrap w-full gap-5 py-5 mt-10">
        {sortedTasks.map((task, index) => {
          const bgColor = getStatusColor(task);
          const showButton = task.newTask || task.active;

          return (
            <div
              ref={(el) => (cardsRef.current[index] = el)}
              key={task._id}
              className={`flex-shrink-0 ${bgColor} h-full w-[300px] p-5 rounded-xl relative`}>
              <div className="flex justify-between items-center">
                <h4 className="text-sm">
                  {new Date(task.date).toLocaleDateString()}
                </h4>
              </div>
              <h2 className="mt-5 text-2xl font-semibold">{task.title}</h2>
              <p className="text-sm">{task.description}</p>

              {showButton && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={() => handleUpdate(task)}
                    className="px-20 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:from-indigo-600 hover:to-blue-600 active:scale-95">
                    {task.newTask ? "Start Task" : "Complete Task"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ErrorBoundary>
  );
};

export default TaskList;
