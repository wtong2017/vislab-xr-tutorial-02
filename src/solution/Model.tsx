import { useGLTF } from "@react-three/drei";

export default function Model(prop) {
  const gltf = useGLTF("/room/scene.gltf");
  return <primitive object={gltf.scene} {...prop} />;
}
