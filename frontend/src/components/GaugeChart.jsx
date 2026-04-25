import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const GaugeChart = ({ probability }) => {
  // Convert probability (0-1) to percentage (0-100)
  const percentage = Math.round(probability * 100);
  
  // Determine color based on risk level
  const getColor = () => {
    if (probability < 0.3) return '#10b981'; // Green
    if (probability < 0.7) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  const color = getColor();
  
  // Data for the gauge (semi-circle)
  const data = [
    { value: percentage },
    { value: 100 - percentage },
  ];

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="80%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={90}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell fill={color} />
            <Cell fill="#e5e7eb" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ top: '40%' }}>
        <div className="text-4xl font-bold" style={{ color }}>
          {percentage}%
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Churn Probability
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
