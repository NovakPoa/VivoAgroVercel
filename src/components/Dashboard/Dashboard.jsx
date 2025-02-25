import React from 'react';
import DashboardCard from './UI/DashboardCard';
import useDashboardStore from '../../stores/DashboardStore';

const Dashboard = () => {
  const { showDashboard } = useDashboardStore();

  if (!showDashboard) return null;

  return <DashboardCard />;
};

export default Dashboard;