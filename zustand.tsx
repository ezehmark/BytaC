import { create } from "zustand";

// Create the store
const useAnimationStore = create((set) => ({
  hasAnimated: false,  // Initial state
  setHasAnimated: () => set({ hasAnimated: true }),  // Function to update state
}));

export default useAnimationStore;  // Export the store to be used in your components
