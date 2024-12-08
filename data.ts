import { Theme, Consultant } from './types';

export const themes: Theme[] = Array.from({ length: 100 }, (_, i) => ({
  themeId: (i + 1).toString(),
  name: `Tema ${i + 1}`  
}));

export const consultants: Consultant[] = [
  {
    consultantId: '1',
    name: 'Ana García',
    consultantTheme: [
      { themeId: '1', consultantId: '1', level: 'specialist' },
      { themeId: '2', consultantId: '1', level: 'basic' },
      { themeId: '3', consultantId: '1', level: 'specialist' },
    ],
    cv: 'Experta en desarrollo web y machine learning con 10 años de experiencia.',
    email: 'ana.garcia@example.com',
    phone: '+34 600 123 456',
  },
  {
    consultantId: '2',
    name: 'Carlos Rodríguez',
    consultantTheme: [
      { themeId: '3', consultantId: '2', level: 'basic' },
      { themeId: '4', consultantId: '2', level: 'specialist' },
      { themeId: '5', consultantId: '2', level: 'specialist' },
    ],
    cv: 'Especialista en ciberseguridad y cloud computing con certificaciones en AWS y Azure.',
    email: 'carlos.rodriguez@example.com',
    phone: '+34 600 234 567',
  },
  {
    consultantId: '3',
    name: 'Laura Martínez',
    consultantTheme: [
      { themeId: '1', consultantId: '3', level: 'basic' },
      { themeId: '4', consultantId: '3', level: 'specialist' },
      { themeId: '6', consultantId: '3', level: 'basic' },
    ],
    cv: 'Desarrolladora full-stack con experiencia en arquitecturas cloud nativas.',
    email: 'laura.martinez@example.com',
    phone: '+34 600 345 678',
  },
];

