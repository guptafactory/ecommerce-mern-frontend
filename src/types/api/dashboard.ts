import { MessageResponse } from "../api-types";
import { BarChart, LineChart, PieChart, Stats } from "../types";

export type StatsResponse = MessageResponse & {
  stats: Stats;
};

export type BarChartResponse = MessageResponse & {
  charts: BarChart;
};

export type LineChartResponse = MessageResponse & {
  charts: LineChart;
};

export type PieChartResponse = MessageResponse & {
  charts: PieChart;
};
