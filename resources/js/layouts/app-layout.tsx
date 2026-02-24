import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';
import { APIProvider} from '@vis.gl/react-google-maps';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <APIProvider 
    apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}
    libraries={['places']}
    >
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutTemplate>
    </APIProvider>
);
