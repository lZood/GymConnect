
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { adminDashboardStats, gymGrowthData, userGrowthData, recentGyms } from '@/lib/mock-data';
import { DollarSign, Building, Users, Activity } from 'lucide-react';

const kpiCards = [
  { title: "Ingresos Mensuales", value: `$${adminDashboardStats.mrr.toLocaleString()}`, icon: DollarSign, description: "+5.2% vs mes anterior" },
  { title: "Gimnasios Activos", value: adminDashboardStats.activeGyms, icon: Building, description: `+${adminDashboardStats.newGymsThisMonth} este mes` },
  { title: "Usuarios Totales", value: adminDashboardStats.totalUsers.toLocaleString(), icon: Users, description: "Crecimiento constante" },
  { title: "Usuarios Activos (30d)", value: adminDashboardStats.activeUsers.toLocaleString(), icon: Activity, description: "Engagement de la plataforma" },
];

export default function PlatformAdminPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard de Super Administrador</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de Gimnasios</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gymGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Crecimiento de Usuarios</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="hsl(var(--accent))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nuevos Gimnasios Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del Gimnasio</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead>Miembros</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentGyms.map((gym) => (
                <TableRow key={gym.id}>
                  <TableCell className="font-medium">{gym.name}</TableCell>
                  <TableCell>
                    <Badge variant={gym.plan === 'Pro' ? 'default' : 'secondary'}>{gym.plan}</Badge>
                  </TableCell>
                  <TableCell>{gym.registeredDate}</TableCell>
                  <TableCell>{gym.memberCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
