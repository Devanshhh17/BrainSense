import { useEffect } from "react";

function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} | BrainSense`;
  }, [title]);
}

export default usePageTitle;
