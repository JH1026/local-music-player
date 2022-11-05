import { useCallback, useState } from "react";

const toggleOpening = (initOpening: boolean) => {
  const [opening, setOpening] = useState<boolean>(initOpening);

  const open = useCallback(() => {
    setOpening(true);
  }, []);

  const close = useCallback(() => {
    setOpening(false);
  }, []);

  return [opening, open, close] as const;
}

export default toggleOpening;