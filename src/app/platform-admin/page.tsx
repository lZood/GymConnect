import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/mobile-layout';

export default function PlatformAdminPage() {
  return (
    <MobileLayout className="bg-gray-900 text-white">
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Panel de Super Admin</h1>
            <p className="text-muted-foreground mb-8">
                Bienvenido al panel de control de la plataforma.
            </p>
            <Link href="/" passHref>
                <Button variant="secondary">Volver al Inicio</Button>
            </Link>
        </div>
    </MobileLayout>
  );
}
