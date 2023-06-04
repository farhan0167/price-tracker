import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
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
  Legend
);

const getDataLabels = (data) => {
    const today = new Date();
    const labels = [];
  
    const numOfDaysToShow = data.length - 1;
  
    for (let i = numOfDaysToShow; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const month = date.toLocaleString('default', { month: 'long' });
      const day = date.getDate();
      labels.push(`${month} ${day}`);
    }
  
    return labels;
  };



export function LineChart(props) {
    //console.log(props.chartData)
    const priceData = props.chartData.priceCh
    const labels = getDataLabels(priceData);
    const data = {
        labels,
        datasets: [
          {
            label: 'Price in $',
            data: priceData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
  return <Line data={data} />;
}
