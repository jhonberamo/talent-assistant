import React from 'react';
import { BarChart3, TrendingUp, Users, Clock, Sparkles } from 'lucide-react';

const metrics = [
  {
    title: 'Total Candidates',
    value: '2,547',
    change: '+12.5%',
    trend: 'up',
    icon: Users,
    color: 'blue'
  },
  {
    title: 'Average Match Score',
    value: '85.3%',
    change: '+3.2%',
    trend: 'up',
    icon: Sparkles,
    color: 'green'
  },
  {
    title: 'Time to Hire',
    value: '18 days',
    change: '-2.5 days',
    trend: 'down',
    icon: Clock,
    color: 'purple'
  },
  {
    title: 'Success Rate',
    value: '92%',
    change: '+5.4%',
    trend: 'up',
    icon: TrendingUp,
    color: 'orange'
  }
];

export function Reports() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
              <p className="text-gray-600 max-w-3xl">
                Track your recruitment metrics and gain valuable insights into your hiring process. Monitor key performance indicators, analyze trends, and make data-driven decisions to optimize your talent acquisition strategy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className={`w-10 h-10 bg-${metric.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <metric.icon className={`w-5 h-5 text-${metric.color}-500`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{metric.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                  <span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <p className="text-gray-600">
              Detailed reports and advanced analytics features are coming soon. Stay tuned for more insights into your recruitment process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}