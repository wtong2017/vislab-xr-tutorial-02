# Vislab XR Tutorial: WebXR

In this tutorial, we will learn how to create a simple WebXR application using the [React-XR](https://github.com/pmndrs/react-xr) library.

## Task

We will implement a 3D bar chart in WebXR.

## Prerequisites

1. [Node.js](https://nodejs.org/en/download/)
2. [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
3. [Git](https://git-scm.com/downloads)
4. [Visual Studio Code](https://code.visualstudio.com/download)
5. [WebXR API Emulator](https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje?hl=en)

## Setup

<details>
<summary>Read here if you want to start from scratch</summary>

If you want to start from scratch, you can delete the `src` folder and create a new React app using the following command

```bash
yarn create vite vislab-xr-tutorial-02 --template react-ts
yarn add @react-three/fiber three @react-three/drei react-xr d3
yarn dev
```

</details>

1. Clone the repository

```bash
git clone
```

2. Install dependencies

```bash
yarn
```

3. Start the development server

```bash
yarn dev
```

4. Open the application in your browser

```bash
http://localhost:5173
```

## Implementation

1. Setup XR canvas with camera, lights, and controllers in `App.tsx`

```tsx
import "./App.css";

import { Canvas } from "@react-three/fiber";
import { XR, Controllers, Hands, VRButton } from "@react-three/xr";

const App = () => {
  return (
    <div id="main">
      <VRButton />
      <Canvas>
        <XR>
          <Controllers />
          <Hands />
          <ambientLight />
          <pointLight position={[1, 1, 1]} />
          <mesh position={[0, 0, -3]}>
            <boxGeometry />
            <meshStandardMaterial color="blue" />
          </mesh>
        </XR>
      </Canvas>
    </div>
  );
};

export default App;
```

2. Try to run the application in the browser. You should see a blue box in the middle of the screen. If you don't see the box, try to refresh the page.
3. Use WebXR API Emulator to simulate XR devices. By clicking the `Enter VR` button, you should see the blue box in the middle of the screen. You can also see the controllers in the screen.
4. Add orbit controls to the camera in `App.tsx` when we are not in XR mode.

```tsx
import { OrbitControls } from "@react-three/drei";

<XR>
  ...
  <OrbitControls />
  ...
</XR>
```

5. Create a new component `BarChart.tsx` to render the bar chart.

```tsx
import { useMemo } from "react";
import * as d3 from "d3";

type BarChartProps = {
  data: { key: string; value: number }[];
};

export default function BarChart({ data }: BarChartProps) {
  const xScale = useMemo(
    () =>
      d3
        .scaleBand()
        .domain(data.map((d) => d.key))
        .range([0, 1]),
    [data]
  );
  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .range([0, 1]),
    [data]
  );

  return (
    <group>
      {data.map((d) => (
        <mesh key={d.key} position={[xScale(d.key)!, yScale(d.value) / 2, 0]}>
          <boxGeometry args={[xScale.bandwidth(), yScale(d.value)!, 0.1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      ))}
    </group>
  );
}
```

6. Import the `BarChart` component in `App.tsx` and render it.

```tsx
import BarChart from "./BarChart";

<XR>
  ...
  <BarChart data={[{key: "A", value: 10}, {key: "B", value: 20}, {key: "C", value: 30}]} />
  ...
</XR>
```

7. Try to run the application in the browser. You should see a bar chart in the middle of the screen. If you don't see the bar chart, try to refresh the page.

8. Show the value of each bar when we hover over it. We need to first create a new component `Bar.tsx` to render the bar and store the state of each bar.

```tsx
import { Text } from "@react-three/drei";
import { Interactive } from "@react-three/xr";
import { useState } from "react";

type BarProp = {
  width: number;
  height: number;
  x: number;
  y: number;
  value: number;
};

export default function Bar({ x, y, width, height, value }: BarProp) {
  const [hovered, setHovered] = useState(false);

  const onHovered = () => {
    setHovered(true);
  };

  const onUnhovered = () => {
    setHovered(false);
  };

  return (
    <Interactive onHover={() => onHovered()} onBlur={() => onUnhovered()}>
      <mesh position={[x, y, 0]}>
        <boxGeometry args={[width, height, 0.1]} />
        <meshStandardMaterial color={hovered ? "red" : "blue"} />
      </mesh>
    </Interactive>
  );
}
```

9. Show the value of each bar when we hover over it.

```tsx
    <Interactive>
    ...
      <Text position={[x, height + 0.1, 0]} color="black" visible={hovered}>
        {value}
      </Text>
      ...
    </Interactive>
```

10. Import the `Bar` component in `BarChart.tsx` and update it.

```tsx
import Bar from "./Bar";
...
export default function BarChart({ data }: BarChartProps) {
  ...
    
  return (
    <group>
      {data.map((d) => (
        <Bar
          key={d.key}
          x={xScale(d.key) || 0}
          y={yScale(d.value) / 2 || 0}
          width={xScale.bandwidth()}
          height={yScale(d.value)}
          value={d.value}
        />
      ))}
    </group>
  );
}
```

11. Try to run the application in the browser. You should see the value of each bar when you hover over it.
If you don't see the bar chart, try to refresh the page.

## Conclusion

In this tutorial, we have learned how to create a React VR application with React Three Fiber and React Web XR. We have also learned how to use WebXR API Emulator to simulate XR devices.
