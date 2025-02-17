import { create } from 'zustand';

const dashboardStore = (set) => ({
  showDashboard: false,
  setShowDashboard: (show) => set({ showDashboard: show }),
});

const useDashboardStore = create(dashboardStore);

export default useDashboardStore;