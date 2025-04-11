import React from 'react';
import DashboardCard from './UI/DashboardCard';
import useDashboardStore from '../../stores/DashboardStore';
import useComponentVisibility from '../../hooks/useComponentVisibility';

const Dashboard = () => {
  const { showDashboard } = useDashboardStore();
  const shouldRender = useComponentVisibility(showDashboard);

  if (!shouldRender) return null;

  return <DashboardCard isVisible={showDashboard} />;
};

export default Dashboard;