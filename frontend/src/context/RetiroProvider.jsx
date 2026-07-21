import { useCallback, useMemo, useState } from "react";
import { RetiroContext } from "./retiroContext";
import SolicitudRetiroModal from "../components/SolicitudRetiroModal";

function RetiroProvider({ children }) {
  const [open, setOpen] = useState(false);

  const openRetiro = useCallback(() => setOpen(true), []);
  const closeRetiro = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openRetiro, closeRetiro }),
    [openRetiro, closeRetiro]
  );

  return (
    <RetiroContext.Provider value={value}>
      {children}
      <SolicitudRetiroModal open={open} onClose={closeRetiro} />
    </RetiroContext.Provider>
  );
}

export default RetiroProvider;
