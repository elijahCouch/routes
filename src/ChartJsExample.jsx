import { Line, LineChart } from "recharts";

const data = [
    {name: "2017", react: 32, angular: 37, vue: 60},
    {name: "2018", react: 42, angular: 33, vue: 45},
    {name: "2019", react: 51, angular: 23, vue: 29},
    {name: "2020", react: 60, angular: 56, vue: 54},
    {name: "2021", react: 51, angular: 65, vue: 42},
    {name: "2022", react: 95, angular: 22, vue: 15},
];

function ChartJsExample() {
  return (                  
    <LineChart width={600} height={300} data={data}>
       <Line type="monotone" dataKey="react" stroke="#2196F3" strokeWidth={3} />
    </LineChart>
  )
};

export default ChartJsExample;