import { useMemo, useState } from "react";
import * as d3 from "d3";
import Bar from "./Bar";
import { Axis } from "./axis/Axis";

type BarChartProps = {
  data: { key: string; value: number }[];
};

export default function BarChart({ data }: BarChartProps) {
  const margin = {
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
  };

  const xScale = useMemo(
    () =>
      d3
        .scaleBand()
        .domain(data.map((d) => d.key))
        .range([0, 10]),
    [data]
  );
  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
        .range([0, 10]),
    [data]
  );

  return (
    <group position={[margin.left, margin.top, 0]}>
      <Axis scale={yScale} orient={"left"}></Axis>
      <Axis scale={xScale} orient={"bottom"}></Axis>
      <group>
        {data.map((d) => (
          <Bar
            key={d.key}
            x={xScale(d.key) + xScale.bandwidth() / 2 || 0}
            y={yScale(d.value) / 2 || 0}
            width={xScale.bandwidth()}
            height={yScale(d.value)}
            value={d.value}
          />
        ))}
      </group>
    </group>
  );
}
