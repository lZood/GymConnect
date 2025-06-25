import type { LucideIcon } from 'lucide-react';
import { Flame, TrendingUp, Zap, Medal, Award, ShieldCheck, Dumbbell, Calendar, HeartPulse } from 'lucide-react';

// Main User
export const user = {
  id: 'user-1',
  name: 'Alex',
  email: 'alex@gymconnect.com',
  profilePicture: 'https://placehold.co/100x100',
  subscription: {
    plan: 'Premium',
    endDate: '2024-12-31',
  },
  streak: 21,
  gymPoints: 11250,
  achievements: [
    { id: 'ach-1', title: '1er Mes', icon: Medal, date: '2024-06-01' },
    { id: 'ach-2', title: '25 Check-ins', icon: Award, date: '2024-06-20' },
    { id: 'ach-3', title: 'Racha de 21 días', icon: ShieldCheck, date: '2024-06-24' },
    { id: 'ach-4', title: 'Reto de Sentadillas', icon: Dumbbell, date: '2024-05-15' },
    { id: 'ach-5', title: 'Consistencia', icon: Calendar, date: '2024-04-30' },
    { id: 'ach-6', title: 'Rey del Cardio', icon: HeartPulse, date: '2024-04-10' },
  ],
  stats: {
      workouts: 45,
      friends: 2,
      challenges: 4,
  },
  joinedDate: 'hace 6 meses'
};

// All users database
const allUsers = [
    { 
        id: 'user-2',
        name: 'Elena', 
        profilePicture: 'https://placehold.co/100x100.png',
        streak: 15, 
        score: 12500,
        joinedDate: 'hace 4 meses',
        achievements: [
            { id: 'ach-1', title: '1er Mes', icon: Medal, date: '2024-04-01' },
            { id: 'ach-7', title: 'Reto de Sentadillas', icon: Dumbbell, date: '2024-05-15' },
            { id: 'ach-8', title: 'Reina del Cardio', icon: HeartPulse, date: '2024-05-20' },
        ],
        stats: { workouts: 38, friends: 5, challenges: 3 },
    },
    { 
        id: 'user-3', 
        name: 'Carlos', 
        profilePicture: 'https://placehold.co/100x100.png', 
        streak: 32,
        score: 11800,
        joinedDate: 'hace 1 año',
        achievements: [
            { id: 'ach-9', title: 'Miembro por un año', icon: Medal, date: '2024-06-01' },
            { id: 'ach-10', title: 'Racha de 30 días', icon: ShieldCheck, date: '2024-06-22' },
        ],
        stats: { workouts: 150, friends: 8, challenges: 7 },
    },
    { 
        id: 'user-4', 
        name: 'Sofía', 
        profilePicture: 'https://placehold.co/100x100.png', 
        streak: 5,
        score: 10500,
        joinedDate: 'hace 2 meses',
        achievements: [
            { id: 'ach-1', title: '1er Mes', icon: Medal, date: '2024-06-15' },
        ],
        stats: { workouts: 12, friends: 3, challenges: 2 },
    },
    { 
        id: 'user-5', 
        name: 'David', 
        profilePicture: 'https://placehold.co/100x100.png', 
        streak: 10,
        score: 9800,
        joinedDate: 'hace 3 meses',
        achievements: [
            { id: 'ach-1', title: '1er Mes', icon: Medal, date: '2024-05-01' },
            { id: 'ach-11', title: '10 Check-ins', icon: Award, date: '2024-05-25' },
        ],
        stats: { workouts: 25, friends: 4, challenges: 1 },
    },
];

// Define friends of the main user
export const friends = allUsers.filter(u => ['user-2', 'user-3'].includes(u.id));

// Raw leaderboard data
const rawLeaderboard = [
  { rank: 1, ...allUsers.find(u => u.id === 'user-2')! },
  { rank: 2, ...allUsers.find(u => u.id === 'user-3')! },
  { rank: 3, id: user.id, name: user.name, profilePicture: user.profilePicture, score: user.gymPoints }, // Add current user to leaderboard
  { rank: 4, ...allUsers.find(u => u.id === 'user-4')! },
  { rank: 5, ...allUsers.find(u => u.id === 'user-5')! },
];

// Simplified leaderboard for display, without nested objects
export const leaderboard = rawLeaderboard.map(u => ({
    id: u.id,
    rank: u.rank,
    name: u.name,
    profilePicture: u.profilePicture,
    score: u.score
}));

// Function to find any user by ID
export const findUserById = (id: string) => {
    if (id === user.id) return user;
    const friend = allUsers.find(u => u.id === id);
    if(friend) return friend;

    // Fallback for users that might only exist in the leaderboard mock
    const leaderboardUser = leaderboard.find(u => u.id === id);
    if(leaderboardUser) {
        return {
            ...leaderboardUser,
            joinedDate: 'hace 2 meses',
            achievements: user.achievements.slice(0, 3),
            stats: { workouts: 12, friends: 3, challenges: 2 },
        }
    }
    return undefined;
}


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

export const challenges: {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    metric: string;
    goal: number;
    userProgress: number;
}[] = [
  { 
    id: 'ch-1', 
    title: 'Reto de Sentadillas', 
    description: 'Completa 500 sentadillas este mes para ganar.',
    icon: Flame,
    metric: 'reps',
    goal: 500,
    userProgress: 175,
  },
  { 
    id: 'ch-2', 
    title: 'Desafío de Cardio', 
    description: 'Quema 3000 calorías en la caminadora o elíptica.',
    icon: Zap,
    metric: 'calorías',
    goal: 3000,
    userProgress: 2100,
  },
  { 
    id: 'ch-3', 
    title: 'Consistencia es Clave', 
    description: 'Haz check-in 20 días este mes.',
    icon: TrendingUp,
    metric: 'días',
    goal: 20,
    userProgress: 15,
  },
];