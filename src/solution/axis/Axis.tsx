import { Line, Sphere, Text } from "@react-three/drei";

interface AxisProp {
  scale: d3.ScaleLinear<any, any, any> | d3.ScaleBand<any>;
  orient: "top" | "bottom" | "left" | "right";
}

export function Axis({ scale, orient }: AxisProp) {
  const values = scale.ticks ? scale.ticks() : scale.domain();
  const tickSize = 0.2;
  const tickPadding = 0.1;
  const k = orient == "bottom" || orient == "left" ? -1 : 1;
  const offset =
    orient == "bottom" || orient == "top"
      ? [0, k * (tickSize + tickPadding)]
      : [k * (tickSize + tickPadding), 0];
  const x =
    orient == "bottom" || orient == "top"
      ? scale.bandwidth
        ? (d) => scale(d) + scale.bandwidth() / 2
        : scale
      : (_) => 0;
  const y =
    orient == "left" || orient == "right"
      ? scale.bandwidth
        ? (d) => scale(d) + scale.bandwidth() / 2
        : scale
      : (_) => 0;
  const anchorX =
    orient == "left" ? "right" : orient == "right" ? "left" : "center";
  const anchorY =
    orient == "bottom" ? "top" : orient == "top" ? "bottom" : "middle";
  const range0 =
    orient == "bottom" || orient == "top"
      ? [scale.range()[0], 0]
      : [0, scale.range()[0]];
  const range1 =
    orient == "bottom" || orient == "top"
      ? [scale.range()[1], 0]
      : [0, scale.range()[1]];

  const xTickPos = orient == "bottom" || orient == "top" ? 0 : -tickSize;
  const yTickPos = orient == "left" || orient == "right" ? 0 : -tickSize;

  return (
    <>
      <Line
        points={[
          [...range0, 0],
          [...range1, 0],
        ]}
      ></Line>
      {values.map((d, i) => (
        <group key={i} position={[x(d), y(d), 0]}>
          <Line
            points={[
              [xTickPos, yTickPos, 0],
              [0, 0, 0],
            ]}
          ></Line>
          <Text
            position={[...offset, 0]}
            anchorX={anchorX}
            anchorY={anchorY}
            color={"black"}
          >
            {d}
          </Text>
        </group>
      ))}
    </>
  );
}
