export const user = {
  name: 'Alex',
  email: 'alex@gymconnect.com',
  profilePicture: 'https://placehold.co/100x100',
  subscription: {
    plan: 'Premium',
    endDate: '2024-12-31',
  },
  streak: 21,
};

export const routine = [
  { id: '1', name: 'Press de Banca', sets: 4, reps: 8, completed: true, videoUrl: 'https://www.youtube.com/embed/SCVCL1pG5p4', description: 'Acuéstate en un banco plano. Agarra la barra con las manos un poco más anchas que el ancho de los hombros. Baja la barra hasta el pecho, y luego empújala hacia arriba hasta la posición inicial.' },
  { id: '2', name: 'Sentadillas con Barra', sets: 3, reps: 10, completed: true, videoUrl: 'https://www.youtube.com/embed/X-iI_p_V-38', description: 'Coloca la barra sobre tus trapecios. Mantén la espalda recta, el pecho hacia afuera y las rodillas alineadas con los pies. Baja como si te fueras a sentar en una silla, hasta que tus muslos estén paralelos al suelo.' },
  { id: '3', name: 'Peso Muerto', sets: 3, reps: 6, completed: false, videoUrl: 'https://www.youtube.com/embed/op9kVnSso6Q', description: 'Párate con los pies al ancho de las caderas. Agarra la barra con las manos justo por fuera de las rodillas. Mantén la espalda recta y levanta la barra extendiendo las caderas y las rodillas.' },
  { id: '4', name: 'Dominadas', sets: 4, reps: 'AMRAP', completed: false, videoUrl: 'https://www.youtube.com/embed/eGo4IyNcAks', description: 'Agarra la barra con las palmas hacia afuera. Cuélgate con los brazos completamente extendidos. Sube tu cuerpo hasta que tu barbilla esté por encima de la barra.' },
];

export const weightProgress = [
  { month: 'Ene', weight: 80 },
  { month: 'Feb', weight: 79 },
  { month: 'Mar', weight: 79.5 },
  { month: 'Abr', weight: 78 },
  { month: 'May', weight: 77 },
  { month: 'Jun', weight: 76 },
];

export const fullProgressData = [
  { date: '2024-01-01', weight: 80, bodyFat: 20 },
  { date: '2024-01-15', weight: 80.5, bodyFat: 19.8 },
  { date: '2024-02-01', weight: 79, bodyFat: 19.5 },
  { date: '2024-02-15', weight: 79.2, bodyFat: 19.2 },
  { date: '2024-03-01', weight: 79.5, bodyFat: 19 },
  { date: '2024-03-15', weight: 78.8, bodyFat: 18.7 },
  { date: '2024-04-01', weight: 78, bodyFat: 18.5 },
  { date: '2024-04-15', weight: 78.2, bodyFat: 18.3 },
  { date: '2024-05-01', weight: 77, bodyFat: 18 },
  { date: '2024-05-15', weight: 77.5, bodyFat: 17.8 },
  { date: '2024-06-01', weight: 76, bodyFat: 17.5 },
  { date: '2024-06-15', weight: 76.3, bodyFat: 17.2 },
];
