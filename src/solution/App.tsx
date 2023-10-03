import "./App.css";

import { Canvas } from "@react-three/fiber";
import { XR, Controllers, Hands, VRButton } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";
import BarChart from "./BarChart";
import { useEffect, useState } from "react";
import Model from "./Model";
import Chart from "./Chart";

const App = () => {
  return (
    <div id="main">
      <VRButton />
      <Canvas>
        <XR>
          <OrbitControls />
          <Controllers />
          <Hands />
          <ambientLight />
          <pointLight position={[0, 1, -2]} intensity={10} />

          <Model scale={0.2} position={[0, 0, -2]} />

          <Chart position={[-0.5, 0.5, -3]} scale={0.1} />
        </XR>
      </Canvas>
    </div>
  );
};

export default App;
