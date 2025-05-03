import React, { useState } from 'react';
import Scene from '../Scene/Scene';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import useAssetsStore from '../../stores/AssetsStore';
import { Leva } from 'leva';

export default function App() {
  const { isLoading } = useAssetsStore();

  return (
    <>
      <LoadingScreen />
      {!isLoading && <Scene />}
      <Leva hidden />
    </>
  );
}