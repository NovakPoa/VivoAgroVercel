import React from 'react';
import DashboardCard from './UI/DashboardCard';
import useDashboardStore from '../../stores/DashboardStore';
import useComponentVisibility from '../../hooks/useComponentVisibility';

const Dashboard = () => {
  const { showDashboard } = useDashboardStore();
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(showDashboard);

  if (!shouldRender) return null;

  return <DashboardCard isVisible={showDashboard} onAnimationOutEnded={handleAnimationOutEnded} />;
};

export default Dashboard;