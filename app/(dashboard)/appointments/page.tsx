import React from 'react';
import { CalendarWeeklyView, AppointmentProps } from './components/CalendarWeeklyView';
import { getAppointmentsAction } from '@/app/actions/appointments';

export const metadata = {
  title: 'Appointments - MedLink Portal',
};

export default async function AppointmentsPage() {
  const result = await getAppointmentsAction();
  // Bypass stale Prisma client typings during dev server runs by explicitly mapping to our expected prop structure
  const appointments = (result.success && result.appointments ? result.appointments : []) as unknown as AppointmentProps[];

  return (
    <div className="flex-1 w-full h-full flex flex-col p-2 md:p-6 overflow-hidden bg-[#f8fafc]">
      <div className="flex flex-col gap-2 mb-4 px-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#191c1e]">Appointments</h1>
        <p className="text-slate-500">Manage your weekly schedule and upcoming consultations.</p>
      </div>
      
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <CalendarWeeklyView initialAppointments={appointments} />
      </div>
    </div>
  );
}
