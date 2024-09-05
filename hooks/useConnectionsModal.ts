import { create } from "zustand";

interface ConnectionsModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useConnectionsModal = create<ConnectionsModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useConnectionsModal;
