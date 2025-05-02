const emp = [
  {
    id: 1,
    email: "employee1@example.com",
    password: "password123",
    tasks: [
      {
        title: "Design Homepage UI",
        description: "Create a modern homepage layout using Figma.",
        date: "2025-05-02",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        title: "Fix Login Bug",
        description: "Resolve issue with token expiration on login.",
        date: "2025-04-30",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        title: "Write Unit Tests",
        description: "Cover all user authentication logic with unit tests.",
        date: "2025-05-01",
        active: false,
        newTask: true,
        completed: false,
        failed: false,
      },
    ],
  },
  {
    id: 2,
    email: "employee2@example.com",
    password: "password234",
    tasks: [
      {
        title: "Build Navigation Bar",
        description: "Implement a responsive navbar with dropdowns.",
        date: "2025-04-29",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        title: "Optimize Images",
        description: "Compress homepage images to improve load speed.",
        date: "2025-04-28",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
    ],
  },
  {
    id: 3,
    email: "employee3@example.com",
    password: "password345",
    tasks: [
      {
        title: "Create User Profile Page",
        description:
          "Develop a user-friendly profile page with editable fields.",
        date: "2025-05-03",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
      {
        title: "Handle 404 Routes",
        description: "Add custom 404 page and route fallback.",
        date: "2025-05-02",
        active: false,
        newTask: false,
        completed: true,
        failed: false,
      },
      {
        title: "Review Code Standards",
        description: "Ensure team code aligns with internal standards.",
        date: "2025-04-27",
        active: false,
        newTask: false,
        completed: false,
        failed: true,
      },
    ],
  },
  {
    id: 4,
    email: "employee4@example.com",
    password: "password456",
    tasks: [
      {
        title: "Implement Dark Mode",
        description: "Add dark/light theme toggle in settings.",
        date: "2025-05-01",
        active: false,
        newTask: true,
        completed: false,
        failed: false,
      },
      {
        title: "Refactor Dashboard Code",
        description: "Improve dashboard component structure.",
        date: "2025-04-26",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
    ],
  },
  {
    id: 5,
    email: "employee5@example.com",
    password: "password567",
    tasks: [
      {
        title: "Set Up CI/CD",
        description: "Integrate GitHub Actions for automated deployment.",
        date: "2025-04-30",
        active: false,
        newTask: false,
        completed: false,
        failed: true,
      },
      {
        title: "Create FAQ Page",
        description: "Build an accessible and styled FAQ component.",
        date: "2025-05-02",
        active: true,
        newTask: false,
        completed: false,
        failed: false,
      },
    ],
  },
];

const admin = [
  {
    id: 1,
    email: "admin@example.com",
    password: "adminpass",
  },
];

export const setLocalStorage = () => {
  localStorage.setItem("employee", JSON.stringify(emp));
  localStorage.setItem("admin", JSON.stringify(admin));
};

export const getLocalStorage = () => {
  const empData = JSON.parse(localStorage.getItem("employee") || "[]");

  const adminData = JSON.parse(localStorage.getItem("admin") || "[]");
};
