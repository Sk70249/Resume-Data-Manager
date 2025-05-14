export interface ResumeEntry {
  id: string;
  content: string;
  group_id?: string;
  user_id?: string;
}

export interface Group {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface User {
  id: string;
  email: string;
  avatar_url?: string;
  full_name?: string;
}