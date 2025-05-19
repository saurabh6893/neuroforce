import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

export function useNavigationBlocker(condition: boolean) {
  const blocker = useBlocker(condition);

  useEffect(() => {
    if (blocker.state === "blocked" && !condition) {
      blocker.reset();
    }
  }, [blocker, condition]);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirm = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (confirm) blocker.proceed();
      else blocker.reset();
    }
  }, [blocker]);
}
