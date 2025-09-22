import { useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';

export function useThemeEffect() {
  const { theme } = useTheme();

  useEffect(() => {
    const applyTheme = (appliedTheme: string) => {
      const root = document.documentElement;
      const body = document.body;
      
      // Remove all theme classes
      root.classList.remove('light', 'dark');
      body.classList.remove('light', 'dark');
      
      // Apply new theme
      root.classList.add(appliedTheme);
      body.classList.add(appliedTheme);
      
      // Set data attributes for CSS selectors
      root.setAttribute('data-theme', appliedTheme);
      body.setAttribute('data-theme', appliedTheme);
    };

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      applyTheme(systemTheme);
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(theme);
    }
  }, [theme]);
}