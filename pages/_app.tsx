import { ThemeProvider } from '@emotion/react';
import preset from '@rebass/preset';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
    getLayout?: (_page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <ThemeProvider theme={preset}>
            {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
    );
}
