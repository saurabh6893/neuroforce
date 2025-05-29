import { Task } from "../../types";
import { getStatusColor } from "../../utils/Statuses";
import ErrorBoundary from "../Common/ErrorBoundary";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { updateTask } from "../../api/taskApi";

type TaskListProps = {
  tasks: Task[];
  refetch?: () => void;
};

const getTaskStatus = (task: Task) => {
  if (task.completed) return "completed";
  if (task.failed) return "failed";
  if (task.active) return "active";
  if (task.newTask) return "newTask";
  return "newTask";
};

const TaskList = ({ tasks, refetch }: TaskListProps) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cardEls = cardsRef.current.filter(Boolean);
    if (cardEls.length > 0) {
      gsap.set(cardEls, { y: "400%", opacity: 0 });
      gsap.to(cardEls, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        stagger: 0.15,
      });
    }
  }, [tasks]);

  const handleUpdate = async (task: Task) => {
    let update: Partial<Task> = {};
    if (task.newTask) update = { newTask: false, active: true };
    else if (task.active) update = { active: false, completed: true };
    await updateTask(task._id, update);
    refetch && refetch();
  };

  return (
    <ErrorBoundary fallback={<div>Error loading tasks!</div>}>
      <div className="h-[55%] overflow-x-auto flex items-center justify-start flex-nowrap w-full gap-5 py-5 mt-10">
        {tasks.map((task, index) => {
          const status = getTaskStatus(task);
          const bgColor = getStatusColor(status);
          const showButton = !task.completed && !task.failed;

          return (
            <div
              ref={(el) => (cardsRef.current[index] = el)}
              key={task._id}
              className={`flex-shrink-0 ${bgColor} h-full w-[300px] p-5 rounded-xl relative`}>
              <div className="flex justify-between items-center">
                <h4 className="text-sm">{task.date}</h4>
              </div>
              <h2 className="mt-5 text-2xl font-semibold">{task.title}</h2>
              <p className="text-sm">{task.description}</p>
              {showButton && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={() => handleUpdate(task)}
                    className="px-20 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:from-indigo-600 hover:to-blue-600 active:scale-95">
                    {status === "newTask" ? "Start Task" : "Complete Task"}
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
