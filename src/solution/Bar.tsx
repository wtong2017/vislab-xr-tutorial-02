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
    <>
      <Interactive onHover={() => onHovered()} onBlur={() => onUnhovered()}>
        <mesh position={[x, y, 0]}>
          <boxGeometry args={[width, height, 0.1]} />
          <meshStandardMaterial color={hovered ? "red" : "blue"} />
        </mesh>
      </Interactive>
      <Text position={[x, height + 0.1, 0]} color="black" visible={hovered}>
        {value}
      </Text>
    </>
  );
}
