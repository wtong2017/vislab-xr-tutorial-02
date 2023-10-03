import { useEffect, useState } from "react";
import BarChart from "./BarChart";

export default function Chart(prop) {
  const [data, setData] = useState<{ key: string; value: number }[]>([
    { key: "A", value: 0 },
    { key: "B", value: 0 },
    { key: "C", value: 0 },
    { key: "D", value: 0 },
    { key: "E", value: 0 },
  ]);

  useEffect(() => {
    setData([
      { key: "A", value: Math.random() * 100 },
      { key: "B", value: Math.random() * 100 },
      { key: "C", value: Math.random() * 100 },
      { key: "D", value: Math.random() * 100 },
      { key: "E", value: Math.random() * 100 },
    ]);
    let interval = setInterval(() => {
      setData([
        { key: "A", value: Math.random() * 100 },
        { key: "B", value: Math.random() * 100 },
        { key: "C", value: Math.random() * 100 },
        { key: "D", value: Math.random() * 100 },
        { key: "E", value: Math.random() * 100 },
      ]);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <group {...prop}>
      <BarChart data={data} />
    </group>
  );
}
