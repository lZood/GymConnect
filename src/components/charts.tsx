
"use client"

import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ChartTooltipContent, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

type WeightProgressChartProps = {
  data: { month: string; weight: number }[];
};

export function WeightProgressChart({ data }: WeightProgressChartProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Progreso de Peso</CardTitle>
        <CardDescription>Últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            weight: {
              label: "Peso",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[150px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border)/0.5)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Line
                dataKey="weight"
                type="monotone"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ r: 5, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "hsl(var(--background))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

type FullProgressChartProps = {
  data: { date: string; weight: number; bodyFat: number }[];
};

export function FullProgressChart({ data }: FullProgressChartProps) {
    const chartData = data.map(item => ({...item, date: new Date(item.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}));
  return (
     <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Métricas Clave</CardTitle>
        <CardDescription>Peso Corporal vs % Grasa Corporal</CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ChartContainer
          config={{
            weight: {
              label: "Peso (kg)",
              color: "hsl(var(--primary))",
            },
            bodyFat: {
                label: "% Grasa",
                color: "hsl(var(--accent))",
            }
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
               <Tooltip
                cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: "3 3" }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="weight"
                type="monotone"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="bodyFat"
                type="monotone"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}


type MuscleGroupVolumeChartProps = {
  data: { month: string; Pecho: number; Espalda: number, Piernas: number, Hombros: number, Brazos: number }[];
};

export function MuscleGroupVolumeChart({ data }: MuscleGroupVolumeChartProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Volumen por Grupo Muscular</CardTitle>
        <CardDescription>Volumen total (kg) levantado por mes.</CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ChartContainer
          config={{
            Pecho: { label: "Pecho", color: "hsl(var(--chart-1))" },
            Espalda: { label: "Espalda", color: "hsl(var(--chart-2))" },
            Piernas: { label: "Piernas", color: "hsl(var(--chart-3))" },
            Hombros: { label: "Hombros", color: "hsl(var(--chart-4))" },
            Brazos: { label: "Brazos", color: "hsl(var(--chart-5))" },
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="Pecho" stackId="a" fill="hsl(var(--chart-1))" radius={[0, 0, 4, 4]} />
              <Bar dataKey="Espalda" stackId="a" fill="hsl(var(--chart-2))" radius={[0, 0, 4, 4]} />
              <Bar dataKey="Piernas" stackId="a" fill="hsl(var(--chart-3))" radius={[0, 0, 4, 4]} />
              <Bar dataKey="Hombros" stackId="a" fill="hsl(var(--chart-4))" radius={[0, 0, 4, 4]} />
              <Bar dataKey="Brazos" stackId="a" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
