import { ThemeProvider } from 'emotion-theming';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
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
            <Head>
                <title>protobuf-thrift</title>
                <link rel="icon" type="image/png" href="/favicon.png" />
                {/* SEO */}
                <meta
                    name="description"
                    content="Protobuf idl to thrift, and vice versa."
                />
                <meta name="author" content="markey yuan" />
                <meta
                    name="keywords"
                    content="ast,protobuf,thrift,golang,go,protocol-buffer,code-generator"
                />
                <meta name="robots" content="index, follow" />
                {/* Twitter && Facebook */}
                <meta property="og:title" content="protobuf-thrift" />
                <meta property="og:image" content="/favicon.png" />
                <meta
                    property="og:description"
                    content="Protobuf idl to thrift, and vice versa."
                />
                {/* google search console */}
                <meta
                    name="google-site-verification"
                    content="n1n6CePjdhKBaoHVSxMRX_0lFSmPot2P9_3hFp8tLp8"
                />
                {/* Global site tag (gtag.js) - Google Analytics */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-EJN8HB5S26"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-EJN8HB5S26');`
                    }}
                />
                <script async src="/wasm_exec.min.js" />
            </Head>
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
