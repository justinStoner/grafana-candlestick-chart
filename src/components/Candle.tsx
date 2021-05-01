import React from 'react';
import { DataPoint } from 'CandleStickPanel';
import * as d3 from 'd3';

const styles = {
  candle: {
    strokeWidth: 1,
  },
  candleUp: {
    fill: '#81dfc4',
    stroke: '#81dfc4',
  },
  candleDown: {
    fill: '#d75b6d',
    stroke: '#d75b6d',
  },
  wick: {
    strokeWidth: 1,
  },
  wickUp: {
    stroke: '#81dfc4',
  },
  wickDown: {
    stroke: '#d75b6d',
  },
};

const Candle = ({
  data,
  x,
  width,
  yScale,
  volumeYScale,
  chartHeight,
}: {
  data: DataPoint;
  x: number;
  width: number;
  yScale: d3.ScaleLinear<number, number>;
  volumeYScale: d3.ScaleLinear<number, number>;
  chartHeight: number;
}) => {
  const up = data.c > data.o;
  const barTop = yScale(up ? data.c : data.o);
  const barBottom = yScale(up ? data.o : data.c);
  const barHeight = barBottom - barTop;
  const wickTop = yScale(data.h);
  const wickBottom = yScale(data.l);

  return (
    <>
      <rect
        x={x - width / 2}
        y={barTop}
        width={width}
        height={barHeight}
        rx={2}
        ry={2}
        style={{
          ...styles.candle,
          ...styles[up ? 'candleUp' : 'candleDown'],
        }}
      />
      <rect
        style={{ transform: 'scaleY(-1)', strokeWidth: 1, fill: '#81dfc4', fillOpacity: 0.1 }}
        x={x - width / 2}
        y={-chartHeight}
        width={width}
        rx={2}
        ry={2}
        height={volumeYScale(data.v)}
      />
      <line
        style={{
          ...styles.wick,
          ...styles[up ? 'wickUp' : 'wickDown'],
        }}
        x1={x}
        y1={barTop}
        x2={x}
        y2={wickTop}
      />
      <line
        style={{
          ...styles.wick,
          ...styles[up ? 'wickUp' : 'wickDown'],
        }}
        x1={x}
        y1={barBottom}
        x2={x}
        y2={wickBottom}
      />
    </>
  );
};

export default Candle;
