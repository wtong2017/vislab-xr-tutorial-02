import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Interactive } from "@react-three/xr";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type BarProp = {
  width: number;
  height: number;
  x: number;
  y: number;
  value: number;
};

export default function Bar({ x, y, width, height, value }: BarProp) {
  const [hovered, setHovered] = useState(false);
  const prevRef = useRef({});
  const meshRef = useRef<THREE.Mesh>(null!);
  const textRef = useRef();
  const tRef = useRef(0);
  const interpolatorRef = useRef<((t: number) => BarProp) | null>();

  const onHovered = () => {
    setHovered(true);
  };

  const onUnhovered = () => {
    setHovered(false);
  };

  useEffect(() => {
    interpolatorRef.current = d3.interpolateObject(prevRef.current, {
      x,
      y,
      width,
      height,
      value,
    });
    prevRef.current = {
      x,
      y,
      width,
      height,
      value,
    };
    tRef.current = 0;
  }, [x, y, width, height, value]);

  useFrame((_, delta) => {
    if (interpolatorRef.current) {
      tRef.current += delta/5;
      
      let { x, y, width, height, value } = interpolatorRef.current(
        tRef.current
      );
      
      meshRef.current.position.set(x, y, 0);
      meshRef.current.scale.set(width, height, 1);
      textRef.current.position.set(x, height + 0.5,0);
      textRef.current.text = value.toFixed(1);
    }
  });

  return (
    <>
      <Interactive onHover={() => onHovered()} onBlur={() => onUnhovered()}>
        <mesh ref={meshRef}>
          <boxGeometry args={[1, 1, 0.1]} />
          <meshStandardMaterial color={hovered ? "red" : "blue"} />
        </mesh>
      </Interactive>
      <Text
        ref={textRef}
        color="black"
        visible={hovered}
      >
      </Text>
    </>
  );
}
