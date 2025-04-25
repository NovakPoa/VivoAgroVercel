import React, { useCallback, useState } from 'react';
import DashboardCard from './UI/DashboardCard';
import ResetConfirmation from './UI/ResetConfirmation';
import useDashboardStore from '../../stores/DashboardStore';
import useProductsStore from '../../stores/ProductsStore';
import useInteractionStore from '../../stores/InteractionStore';
import useSlotsStore from '../../stores/SlotsStore';
import useCameraStore from '../../stores/CameraStore';
import useIntroStore from '../../stores/IntroStore';
import useComponentVisibility from '../../hooks/useComponentVisibility';
import { ANIMATION_DURATIONS } from '../../config/animationUIConfig';

const Dashboard = () => {
  const { showDashboard, setShowDashboard } = useDashboardStore();
  const [shouldRender, handleAnimationOutEnded] = useComponentVisibility(showDashboard);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);

  const showConfirmationCard = useCallback(() => {
    setShowDashboard(false);
    setShowResetConfirmation(true);

  }, []);

  const cancelResetButtonClicked = useCallback(() => {
    setShowResetConfirmation(false);
    setShowDashboard(true); 
  }, []);

  const confirmResetButtonClicked = useCallback(() => {
 
    setTimeout(() => {
      window.location.reload();
    }, 50);

/*     setShowDashboard(false);
    
    useProductsStore.setState({
      startProduct: false,
      currentProduct: 'agro-cobertura',
      lastProductName: 'agro-cobertura',
      productsStatus: {
        'agro-cobertura': 'completed',
        'gestao-maquinario': 'unlocked',
        'gestao-pecuaria': 'locked',
        'clima-inteligente': 'locked',
      }
    });
    
    useInteractionStore.setState({
      timerActive: false,
      timerDuration: 10,
      timerRemaining: 0,
      showInteraction: false,
      showFirstInteraction: false,
      showSecondInteraction: false,
      showFirstInstruction: false,
      showSecondInstruction: false
    });
    
    useSlotsStore.setState({
      selectedIndex: -1,
      showSlots: false,
      slotsLength: 3
    });
    
    useCameraStore.setState({
      cameraTargetPoint: [0, 0, 0],
      cameraAnimate: false,
      animationDuration: 2
    });
    
    setTimeout(() => {
      useIntroStore.setState({
        introVisibility: false,
        startIntro: false
      });
      useCameraStore.getState().resetCameraPosition();
    }, ANIMATION_DURATIONS.DASHBOARD.SCALE_OUT); */

  }, []);

  //if (!shouldRender) return null;

  return (
    <>
      {shouldRender && 
        <DashboardCard 
          isVisible={showDashboard} 
          onAnimationOutEnded={handleAnimationOutEnded}
          onResetClick={showConfirmationCard}
        />
      }
      <ResetConfirmation
        isVisible={showResetConfirmation}
        onConfirmButtonClick={confirmResetButtonClicked}
        onCancelButtonClick={cancelResetButtonClicked}
      />
    </>
  );
};

export default Dashboard;