import React from 'react';
import Scene from './Scene';
import Model from './Model';

export default function ModelController({ modelState = 'idle' }) {
  return (
    <Scene>
      <Model state={modelState} />
    </Scene>
  );
}