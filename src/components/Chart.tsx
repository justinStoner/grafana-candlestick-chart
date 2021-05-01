import React from 'react';
import * as d3 from 'd3';
import Candle from './Candle';
import { DataPoint } from 'CandleStickPanel';

const Chart = ({
  data,
  width,
  height,
  xScale,
  yScale,
  maxDataPoints,
}: {
  data: DataPoint[];
  width: number;
  height: number;
  high: number;
  low: number;
  xScale: d3.ScaleTime<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  maxDataPoints: number;
}) => {
  const volume = data.map(d => d.v);

  const volumeYScale = d3
    .scaleLinear()
    .domain([d3.min(volume) || 0, d3.max(volume) || 0])
    .range(yScale.range());

  d3.axisRight(volumeYScale);

  return (
    <>
      {data.map((column, i) => {
        const w = (width / maxDataPoints) * 0.1;
        const x = xScale(column.t);
        return (
          <>
            <Candle
              volumeYScale={volumeYScale}
              key={i}
              data={column}
              x={x}
              width={w}
              yScale={yScale}
              chartHeight={height}
            />
          </>
        );
      })}
    </>
  );
};

export default Chart;
