"use client";

import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Label, Area, AreaChart
} from 'recharts';
import { ChevronDown, ArrowUpRight, MoreHorizontal, Pencil, Users, Calendar, Activity, Database, TrendingUp } from 'lucide-react';

const BAR_DATA = [
  { month: 'Jan', count: 45 },
  { month: 'Feb', count: 52 },
  { month: 'Mar', count: 48 },
  { month: 'Apr', count: 61 },
  { month: 'May', count: 55 },
  { month: 'Jun', count: 85 },
  { month: 'Jul', count: 42 },
  { month: 'Aug', count: 58 },
  { month: 'Sep', count: 65 },
  { month: 'Oct', count: 62 },
  { month: 'Nov', count: 55 },
  { month: 'Dec', count: 70 },
];

const REVENUE_DATA = [
  { name: 'Jan', value: 3000 },
  { name: 'Feb', value: 5000 },
  { name: 'Mar', value: 4500 },
  { name: 'Apr', value: 8000 },
  { name: 'May', value: 7000 },
  { name: 'Jun', value: 9000 },
  { name: 'Jul', value: 6500 },
  { name: 'Aug', value: 12000 }, // Peak
  { name: 'Sep', value: 6000 },
  { name: 'Oct', value: 5500 },
  { name: 'Nov', value: 4800 },
  { name: 'Dec', value: 6200 },
];

const VISITOR_DATA = [
  { name: 'Mon', male: 4000, female: 2400 },
  { name: 'Tue', male: 3000, female: 1398 },
  { name: 'Wed', male: 2000, female: 9800 },
  { name: 'Thu', male: 2780, female: 3908 },
  { name: 'Fri', male: 11000, female: 4800 }, // Stacked
  { name: 'Sat', male: 2390, female: 3800 },
  { name: 'Sun', male: 3490, female: 4300 },
];

const PIE_DATA = [
  { name: 'Patient reception', value: 26, color: '#3b82f6' },
  { name: 'Document processing', value: 10, color: '#94a3b8' },
  { name: 'Online consultations', value: 4, color: '#d8b4fe' },
];

/** Custom Bar with Stripes */
interface StripedBarProps {
  fill: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

const StripedBar = (props: StripedBarProps) => {
  const { fill, x, y, width, height } = props;
  return (
    <g>
      <defs>
        <pattern id={`pattern-stripe-${fill}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="4" height="8" transform="translate(0,0)" fill={fill} fillOpacity="0.8" />
        </pattern>
      </defs>
      <rect x={x} y={y} width={width} height={height} fill={fill} rx={6} ry={6} />
      <rect x={x} y={y} width={width} height={height} fill={`url(#pattern-stripe-${fill})`} rx={6} ry={6} />
    </g>
  );
};

export function DashboardCharts() {
  return (
    <div className="flex flex-col gap-3 w-full">
      
      {/* 1. Allex Vibrant Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <AllexStatCard 
          title="Overall visitors" 
          value="10.525" 
          trend="+15.2%"
          bgColor="bg-[#00a3ff]"
          icon={<Users className="w-5 h-5 text-white" />}
          // miniChartType="bars"
          description="Data obtained for the last 7days from 5.567 visitor to 7.525 visitor."
        />
        <AllexStatCard 
          title="Appointment" 
          value="955" 
          trend="+21%"
          bgColor="bg-[#ffaf66]"
          icon={<Calendar className="w-5 h-5 text-white" />}
          miniChartType="sparkline"
          description="Increase in data by +21% in last 7 days"
        />
        <AllexStatCard 
          title="Total Patients" 
          value="871" 
          bgColor="bg-[#f27d7d]"
          icon={<Activity className="w-5 h-5 text-white" />}
          // miniChartType="steps"
          description="Data per 20 Aug 2024"
        />
        <AllexStatCard 
          title="Room Availability" 
          value="221/300" 
          bgColor="bg-[#fae68c]"
          icon={<Database className="w-5 h-5 text-white" />}
          miniChartType="bubbles"
        />
      </div>

      {/* 2. New Large Allex Chart Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Chart */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center justify-between mb-8">
            <div className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Total revenue of the year
            </div>
            <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50">
              <MoreHorizontal className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="flex flex-col mb-8">
             <div className="flex items-baseline gap-3">
               <h2 className="text-4xl font-black text-slate-800">$35,510.00</h2>
               <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 flex items-center gap-1">
                 <ArrowUpRight className="w-3 h-3" /> 12%
               </span>
             </div>
             <p className="text-xs font-bold text-slate-400 mt-2">Increase amount $2,982.00 From 25/08/2024-30/08/2024</p>
          </div>

          <div className="h-[280px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" shape={<StripedBar fill="#f27d7d" />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Visitor Chart */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between mb-8">
            <div className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <Users className="w-3.5 h-3.5" />
              Total Visitor of the year
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded bg-black"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Male</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded bg-pink-400"></div>
                 <span className="text-[10px] font-bold text-slate-500 uppercase">Female</span>
              </div>
              <button className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 ml-2">
                <MoreHorizontal className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="flex flex-col mb-8">
             <div className="flex items-baseline gap-3">
               <h2 className="text-4xl font-black text-slate-800">324,763</h2>
               <span className="text-xs font-bold text-emerald-500 border border-emerald-100 px-2 py-0.5 rounded-lg flex items-center gap-1">
                 <ArrowUpRight className="w-3 h-3" /> +1.1%
               </span>
             </div>
          </div>

          <div className="h-[280px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={VISITOR_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} tickFormatter={(val) => `${val/1000}k`} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length >= 2) {
                      return (
                        <div className="bg-[#1c1f21] text-white p-4 rounded-2xl text-[11px] font-bold shadow-2xl relative">
                          <div className="mb-2 uppercase text-slate-400 tracking-widest text-[9px]">{payload[0].payload.name}</div>
                          <div className="flex items-center justify-between gap-8 mb-1">
                             <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                               <span>{payload[0].value?.toLocaleString()}</span>
                             </div>
                          </div>
                          <div className="flex items-center justify-between gap-8">
                             <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-red-400"></div>
                               <span>{payload[1].value?.toLocaleString()}</span>
                             </div>
                          </div>
                          {/* Triangle marker */}
                          <div className="absolute left-full top-1/2 -translate-y-1/2 -translate-x-1 border-y-[6px] border-y-transparent border-l-[6px] border-l-[#1c1f21]"></div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar stackId="a" dataKey="male" fill="#00a3ff" radius={[0,0,0,0]} barSize={40} />
                <Bar stackId="a" dataKey="female" fill="#f27d7d" radius={[8,8,0,0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Detailed Analytics Section (Content Preservation) */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-800 mb-8 px-2 flex items-center gap-2">
           Detailed Statistics Overtime
           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">Preserved View</span>
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BAR_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }} />
                <Bar dataKey="count" radius={[10, 10, 10, 10]} barSize={24}>
                  {BAR_DATA.map((entry, index) => (
                    <Cell key={index} fill={entry.month === 'Jun' ? '#1c1f21' : '#93c5fd'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="h-[350px] flex flex-col justify-between items-center">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={PIE_DATA} cx="50%" cy="100%" startAngle={180} endAngle={0} innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                  {PIE_DATA.map((entry, idx) => (<Cell key={idx} fill={entry.color} />))}
                  <Label content={({ viewBox }) => {
                    const { cx, cy } = viewBox as { cx: number; cy: number };
                    return (
                      <g>
                        <text x={cx} y={cy - 20} textAnchor="middle" dominantBaseline="central">
                          <tspan className="text-4xl font-black fill-slate-800">40</tspan>
                        </text>
                        <text x={cx} y={cy + 10} textAnchor="middle" dominantBaseline="central">
                          <tspan className="text-xs font-bold fill-slate-400 uppercase tracking-widest leading-none">Total hours</tspan>
                        </text>
                      </g>
                    );
                  }} />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full space-y-2 mt-4">
               {PIE_DATA.map((item, i) => (
                 <div key={i} className="flex items-center justify-between px-4">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                       <span className="text-[10px] font-bold text-slate-400 uppercase">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-800">{item.value}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface AllexStatCardProps {
  title: string;
  value: string;
  trend?: string;
  bgColor: string;
  icon: React.ReactNode;
  miniChartType?: 'bars' | 'sparkline' | 'steps' | 'bubbles';
  description?: string;
}

function AllexStatCard({ title, value, trend, bgColor, icon, miniChartType, description }: AllexStatCardProps) {
  return (
    <div className={`${bgColor} rounded-[2rem] p-3 text-white border border-white/10 shadow-lg shadow-black/5 relative overflow-hidden group min-h-[180px] flex flex-col justify-between`}>

      <div className="space-y-4">
        <div className="flex flex-col gap-0.5">
           <div className="bg-black/20 w-10 h-10 rounded-xl flex items-center justify-center mb-2">
             {icon}
           </div>
           <h3 className="text-sm font-black uppercase tracking-widest text-white/80">{title}</h3>
        </div>

        <div className="flex items-baseline gap-3">
          <h2 className="text-3xl font-black tracking-tight">{value}</h2>
          {trend && (
            <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full border border-white/20">
              {trend}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 gap-4">
        <p className="text-[9px] font-bold leading-relaxed text-white/70 flex-1">{description}</p>
        
        {/* Dynamic Mini Charts */}
        <div className="shrink-0 w-24 h-12 flex items-end gap-1.5 justify-end">
           {miniChartType === 'bars' && [60, 40, 100].map((h, i) => (
             <div key={i} className="w-3 bg-white/40 rounded-t" style={{ height: `${h}%`, opacity: i === 2 ? 1 : 0.6 }}></div>
           ))}
           {miniChartType === 'sparkline' && (
             <div className="w-full flex items-end gap-1">
               {[10, 40, 20, 80, 50, 100].map((h, i) => (
                 <div key={i} className={`w-2 rounded-t ${i === 3 ? 'bg-black shadow-lg shadow-black/20' : 'bg-white/30'}`} style={{ height: `${h}%` }}></div>
               ))}
             </div>
           )}
           {miniChartType === 'steps' && (
              <div className="w-full flex items-end gap-1">
                {[10, 30, 40, 60, 80, 100].map((h, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i === 4 ? 'bg-blue-600 border border-white' : 'bg-white/40'}`} style={{ marginBottom: i*4 }}></div>
                ))}
              </div>
           )}
           {miniChartType === 'bubbles' && (
             <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full bg-orange-700/80 border border-white/20 z-0 flex items-center justify-center text-[8px] font-bold">2022</div>
                <div className="w-12 h-12 rounded-full bg-blue-700/80 border border-white/20 z-10 -mt-2 flex items-center justify-center text-[8px] font-bold shadow-xl">2023</div>
                <div className="w-14 h-14 rounded-full bg-green-500/90 border border-white shadow-2xl z-20 -mt-4 flex items-center justify-center text-[10px] font-black shadow-green-500/30">2024</div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
