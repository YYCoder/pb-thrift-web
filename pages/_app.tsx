import { ThemeProvider } from 'emotion-theming';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode, useState } from 'react';
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
    const [dark, setMode] = useState<boolean>(true);
    const theme = dark ? darkTheme : defaultTheme;
    const tips = dark ? 'Light' : 'Dark';
    const handleChangeTheme = () => setMode(!dark);

    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <ThemeProvider theme={theme}>
            <Flex
                onClick={handleChangeTheme}
                px={4}
                py={4}
                sx={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    right: 0
                }}
                color="primary"
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
