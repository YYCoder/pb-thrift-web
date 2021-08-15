import { ThemeProvider } from 'emotion-theming';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Flex, Text } from 'rebass';
import { Light } from '../shared/components';
import '../shared/styles/global.css';
import { darkTheme, defaultTheme } from '../shared/styles/theme';

type NextPageWithLayout = NextPage & {
    getLayout?: (_page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const [dark, setDark] = useState<boolean>(false);
    const theme = dark ? darkTheme : defaultTheme;
    const tips = dark ? 'Light' : 'Dark';
    const handleChangeTheme = () => {
        setDark(!dark);
        window.localStorage.setItem('mode', (!dark).toString());
    };

    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);

    useEffect(() => {
        if (window.localStorage) {
            const mode = window.localStorage.getItem('mode');
            if (mode === 'true') {
                setDark(true);
            } else {
                setDark(false);
            }
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Flex
                onClick={handleChangeTheme}
                px={2}
                py={2}
                sx={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    right: 0
                }}
                color="text"
                alignItems="center"
            >
                <Text fontSize={[2, 3, 4]} fontWeight="heading">
                    {tips}
                </Text>
                <Light on={!dark} />
            </Flex>
            {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
    );
}
