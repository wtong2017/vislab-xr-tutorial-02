import { useMemo, useState } from "react";
import * as d3 from "d3";
import Bar from "./Bar";

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
