import React from 'react';
import { Search as SearchIcon, Database, BarChart3, Layout, Users, TrendingUp, Clock, Sparkles, BriefcaseIcon, Target, Award } from 'lucide-react';
import { ShortcutCard } from '../components/home/ShortcutCard';

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

const shortcuts = [
  {
    title: 'Quick Search',
    description: 'Search for candidates based on job requirements',
    icon: SearchIcon,
    color: 'bg-blue-500',
    page: 'search'
  },
  {
    title: 'Talent Pool',
    description: 'View and manage your saved candidates',
    icon: Database,
    color: 'bg-purple-500',
    page: 'pool'
  },
  {
    title: 'Analytics',
    description: 'View recruitment metrics and insights',
    icon: BarChart3,
    color: 'bg-green-500',
    page: 'reports'
  },
  {
    title: 'Recent Searches',
    description: 'Access your recent candidate searches',
    icon: Layout,
    color: 'bg-orange-500',
    page: 'search'
  }
];

const stats = [
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
    icon: Target,
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

const insights = [
  {
    title: 'Most In-Demand Skills',
    items: ['React', 'TypeScript', 'Node.js', 'AWS', 'Python'],
    icon: Award,
    color: 'indigo'
  },
  {
    title: 'Top Job Categories',
    items: ['Full Stack', 'Frontend', 'DevOps', 'Data Science', 'Backend'],
    icon: BriefcaseIcon,
    color: 'pink'
  },
  {
    title: 'Trending Technologies',
    items: ['Next.js', 'Rust', 'GraphQL', 'Kubernetes', 'AI/ML'],
    icon: Sparkles,
    color: 'yellow'
  }
];

export function Home({ setCurrentPage }: HomeProps) {
  return (
    <div className="p-6 space-y-8">
      {/* Shortcuts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {shortcuts.map((shortcut, index) => (
          <ShortcutCard
            key={index}
            title={shortcut.title}
            description={shortcut.description}
            icon={shortcut.icon}
            color={shortcut.color}
            onClick={() => setCurrentPage(shortcut.page)}
          />
        ))}
      </div>

      {/* Statistics Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recruitment Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{stat.title}</h3>
              <div className="mt-2 flex items-baseline">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <span className={`ml-2 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className={`w-12 h-12 bg-${insight.color}-100 rounded-lg flex items-center justify-center mb-4`}>
              <insight.icon className={`w-6 h-6 text-${insight.color}-500`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{insight.title}</h3>
            <div className="space-y-2">
              {insight.items.map((item, idx) => (
                <div key={idx} className="flex items-center">
                  <div className={`w-1.5 h-1.5 rounded-full bg-${insight.color}-500 mr-2`} />
                  <span className="text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}