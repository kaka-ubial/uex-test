import * as React from 'react';
import M3ThemeProvider from '../../themes/M3ThemeProvider';

export default function MuiThemeObserver({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = React.useState<'light' | 'dark'>(
        document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );

    React.useEffect(() => {
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains('dark');
            setMode(isDark ? 'dark' : 'light');
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
    }, []);

    return (
        <M3ThemeProvider mode={mode}>
            {children}
        </M3ThemeProvider>
    );
}