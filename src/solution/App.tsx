import "./App.css";

import { Canvas } from "@react-three/fiber";
import { XR, Controllers, Hands, VRButton } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";
import BarChart from "./BarChart";

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
          <pointLight position={[1, 1, 1]} />

          <group position={[0, 0, -3]}>
            <BarChart
              data={[
                { key: "A", value: Math.random() * 100 },
                { key: "B", value: Math.random() * 100 },
                { key: "C", value: Math.random() * 100 },
                { key: "D", value: Math.random() * 100 },
                { key: "E", value: Math.random() * 100 },
              ]}
            />
          </group>
        </XR>
      </Canvas>
    </div>
  );
};

export default App;
