
'use client';

import PageHeader from '@/components/page-header';
import { FullProgressChart, MuscleGroupVolumeChart } from '@/components/charts';
import {
  fullProgressData,
  muscleGroupVolume,
  personalRecords,
  user,
  latestMeasurements
} from '@/lib/mock-data';
import {
  PRCalendarCard,
  ConsistencyCard,
  BodyMeasurementsCard,
  SmartInsightCard,
  ProgressPhotosCard
} from '@/components/progress-cards';

export default function ProgressPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Tu Panel de Progreso" subtitle="Analiza, mide y conquista" />
      <div className="flex-1 overflow-y-auto px-4 space-y-6">
        <FullProgressChart data={fullProgressData} />
        <MuscleGroupVolumeChart data={muscleGroupVolume} />
        <PRCalendarCard records={personalRecords} />
        <ConsistencyCard completed={user.consistency.completed} planned={user.consistency.planned} />
        <BodyMeasurementsCard measurements={latestMeasurements.measurements} />
        <SmartInsightCard />
        <ProgressPhotosCard />
        <div className="h-4"></div>
      </div>
    </div>
  );
}
