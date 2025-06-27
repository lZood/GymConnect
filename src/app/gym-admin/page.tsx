import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/mobile-layout';

export default function GymAdminPage() {
  return (
    <MobileLayout className="bg-gray-900 text-white">
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Panel de Admin de Gimnasio</h1>
            <p className="text-muted-foreground mb-8">
                Bienvenido al panel de gestión de tu gimnasio.
            </p>
            <Link href="/" passHref>
                <Button variant="secondary">Volver al Inicio</Button>
            </Link>
        </div>
    </MobileLayout>
  );
}
