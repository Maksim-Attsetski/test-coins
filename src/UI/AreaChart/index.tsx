import React, { FC, memo, useMemo } from 'react';

import s from './AreaChart.module.scss';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
};

interface IProps {
  labels: (number | string)[];
  data: (number | string)[];
  coinName: string;
}

const AreaChart: FC<IProps> = ({ data, labels, coinName }) => {
  const lineData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          fill: true,
          label: coinName,
          data,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: '#5460fe',
        },
      ],
    }),
    [data, labels]
  );

  return (
    <div className={s.container}>
      <Line options={options} data={lineData} />
    </div>
  );
};

export default memo(AreaChart);
