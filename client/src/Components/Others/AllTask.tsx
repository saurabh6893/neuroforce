import { useState, useRef, useEffect } from "react";
import { Task } from "../../types";
import { updateTask, deleteTask } from "../../api/taskApi";
import { getStatusColor } from "../../utils/Statuses";
import { gsap } from "gsap";

function getTaskStatus(
  task: Task
): "newTask" | "active" | "completed" | "failed" {
  if (task.completed) return "completed";
  if (task.failed) return "failed";
  if (task.active) return "active";
  return "newTask";
}

function getAdminActions(
  status: "newTask" | "active" | "completed" | "failed"
) {
  switch (status) {
    case "newTask":
      return ["active", "delete"];
    case "active":
      return ["completed", "failed", "delete"];
    case "completed":
    case "failed":
      return ["delete"];
    default:
      return [];
  }
}

const statusLabels: Record<string, string> = {
  newTask: "New Task",
  active: "Active",
  completed: "Completed",
  failed: "Failed",
  delete: "Delete",
};

function getStatusOrder(task: Task) {
  if (task.failed) return 0;
  if (task.newTask) return 1;
  if (task.active) return 2;
  if (task.completed) return 3;
  return 4;
}

const AllTask = ({ sortType, tasks, refetch }) => {
  const [actionLoading, setActionLoading] = useState<string>("");
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  let sorted =
    sortType === "name"
      ? [...tasks].sort((a, b) =>
          a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
        )
      : [...tasks].sort((a, b) =>
          sortType === "statusAsc"
            ? getStatusOrder(a) - getStatusOrder(b)
            : getStatusOrder(b) - getStatusOrder(a)
        );

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
  }, [sorted.length]);

  const handleAdminAction = async (task: Task, action: string) => {
    setActionLoading(task._id + action);
    try {
      if (action === "delete") {
        await deleteTask(task._id);
      } else {
        const updatePayload: any = {
          active: false,
          completed: false,
          failed: false,
          newTask: false,
        };
        if (action === "active") updatePayload.active = true;
        if (action === "completed") updatePayload.completed = true;
        if (action === "failed") updatePayload.failed = true;
        if (action === "newTask") updatePayload.newTask = true;
        await updateTask(task._id, updatePayload);
      }
      refetch();
    } finally {
      setActionLoading("");
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-7 items-center max-h-screen h-dvh">
      {sorted.map((task, i) => {
        const status = getTaskStatus(task);
        const actions = getAdminActions(status);
        const bgColor = getStatusColor(status);

        return (
          <div
            key={task._id}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`w-full max-w-3xl ${bgColor} rounded-2xl p-8 shadow-md flex flex-col gap-2`}>
            <div className="flex justify-between items-center">
              <div className="text-md text-gray-900">{task.date}</div>
              <div className="font-semibold text-md text-gray-700">
                {statusLabels[status]}
              </div>
            </div>
            <div className="font-bold text-2xl text-gray-900">{task.title}</div>
            <div className="text-gray-800 text-lg">{task.description}</div>
            <div className="text-gray-700 text-sm">
              <b>Assignee:</b> {task.assignee?.fullName || task.assignee?.email}
            </div>
            <div className="flex flex-row justify-end">
              {actions.length > 0 && (
                <select
                  disabled={!!actionLoading}
                  className="px-4 py-2 rounded-md bg-[#232333] text-white font-semibold"
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAdminAction(task, e.target.value);
                      e.target.value = "";
                    }
                  }}>
                  <option value="" disabled>
                    Actions...
                  </option>
                  {actions.map((act) => (
                    <option key={act} value={act}>
                      {statusLabels[act]}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllTask;
