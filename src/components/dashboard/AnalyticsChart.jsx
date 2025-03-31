
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const AnalyticsChart = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--background)', 
              borderColor: 'var(--border)',
              borderRadius: '0.5rem',
              fontSize: '0.875rem' 
            }} 
          />
          <Legend />
          <Bar dataKey="posts" name="Posts" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="engagement" name="Engagement" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="connections" name="Connections" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
