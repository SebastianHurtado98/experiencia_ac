export interface Theme {
  themeId: string;
  name: string;  
}

export interface ConsultantTheme {
  themeId: string;
  consultantId: string;
  level: 'basic' | 'specialist';
}

export interface Consultant {
  consultantId: string;
  name: string;
  consultantTheme: ConsultantTheme[];
  cv: string;
  email: string;
  phone: string;
}

