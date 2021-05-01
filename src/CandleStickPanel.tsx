import React from 'react';
import { DataFrameView, PanelProps } from '@grafana/data';
import { CandleOptions } from 'types';
import Chart from './components/Chart';
import * as d3 from 'd3';
import { NumberValue } from 'd3';

export interface DataPoint {
  h: number;
  l: number;
  o: number;
  c: number;
  v: number;
  t: Date;
}

interface Props extends PanelProps<CandleOptions> {}

export const CandleStickPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const margin = { left: 45, top: 30, right: 10, bottom: 30 };

  const frame = data.series[0];
  const view = new DataFrameView<DataPoint>(frame).toArray();

  const chartWidth = width - (margin.left + margin.right);
  const chartHeight = height - (margin.top + margin.bottom);

  const high = d3.max(view.map(d => d.h)) || 0;
  const low = d3.min(view.map(d => d.l)) || 0;

  const maxDataPoints = data.request?.maxDataPoints || view.length;

  const xScale = d3
    .scaleTime()
    .domain([data.timeRange.from, data.timeRange.to])
    .range([0, chartWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([low, high])
    .range([chartHeight, 0]);

  const xAxis = d3
    .axisBottom(xScale)
    .tickSize(2)
    .tickFormat(d3.timeFormat('%m/%d %H') as (d: Date | NumberValue, i: number) => string);

  const yAxis = d3.axisLeft(yScale);

  const last = view[view.length - 1];

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <Chart
          data={view}
          width={chartWidth}
          height={chartHeight}
          high={high}
          low={low}
          xScale={xScale}
          yScale={yScale}
          maxDataPoints={maxDataPoints}
        />
      </g>
      <g
        transform={`translate(${margin.left}, ${chartHeight + margin.top + 5})`}
        ref={node => {
          d3.select(node).call(xAxis as any);
        }}
      />
      <g
        transform={`translate(40, ${margin.top})`}
        ref={node => {
          d3.select(node).call(yAxis as any);
        }}
      />
      <text transform={`translate(${margin.left + 5},15)`} style={{ fill: '#fff', fontSize: 11 }}>
        open: {last.o} &nbsp; close: {last.c} &nbsp; low: {last.l} &nbsp; high: {last.h}
      </text>
    </svg>
  );
};
