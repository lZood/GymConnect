import PageHeader from '@/components/page-header';
import { FullProgressChart } from '@/components/charts';
import { fullProgressData } from '@/lib/mock-data';
import { Fab } from '@/components/fab';

export default function ProgressPage() {
  return (
    <div className="flex flex-col h-full relative">
      <PageHeader title="Tu Progreso" subtitle="Visualiza tu evolución" />
      <div className="flex-1 overflow-y-auto px-4">
        <FullProgressChart data={fullProgressData} />
        <div className="h-4"></div>
      </div>
      <Fab />
    </div>
  );
}
