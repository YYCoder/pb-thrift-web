export const defaultTheme = {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    colors: {
        text: '#000',
        background: '#fff',
        reverseBg: '#000',
        primary: '#000',
        secondary: '#30c',
        muted: '#f6f6f9',
        gray: '#dddddf',
        highlight: 'hsla(205, 100%, 40%, 0.125)'
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256],
    fonts: {
        body: 'system-ui, sans-serif',
        heading: 'inherit',
        monospace: 'Menlo, monospace'
    },
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25
    },
    radii: {
        default: 4,
        circle: 99999
    },
    shadows: {
        small: '0 0 4px rgba(0, 0, 0, .125)',
        large: '0 0 24px rgba(0, 0, 0, .125)'
    },
    variants: {
        shadow: {
            textShadow: `4px 4px 0 rgba(0, 0, 0, .8),
                8px 8px 0 rgba(0, 0, 0, .6),
                16px 16px 0 rgba(0, 0, 0, .2),
                20px 20px 0 rgba(0, 0, 0, .05);`
        }
    },
    text: {},
    buttons: {
        primary: {
            color: 'white',
            bg: 'primary'
        }
    }
};

export const darkTheme = {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
    colors: {
        text: '#fff',
        background: '#000',
        reverseBg: '#fff',
        primary: '#fff',
        secondary: '#30c',
        muted: '#f6f6f9',
        gray: '#dddddf',
        highlight: 'hsla(205, 100%, 40%, 0.125)'
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256],
    fonts: {
        body: 'system-ui, sans-serif',
        heading: 'inherit',
        monospace: 'Menlo, monospace'
    },
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25
    },
    radii: {
        default: 4,
        circle: 99999
    },
    shadows: {
        small: '0 0 4px rgba(0, 0, 0, .125)',
        large: '0 0 24px rgba(0, 0, 0, .125)'
    },
    variants: {
        shadow: {
            textShadow: `4px 4px 0 rgba(255, 255, 255, .8),
                8px 8px 0 rgba(255, 255, 255, .5),
                16px 16px 0 rgba(255, 255, 255, .2),
                20px 20px 0 rgba(255, 255, 255, .05);`
        }
    },
    text: {},
    buttons: {
        primary: {
            color: 'white',
            bg: 'primary'
        }
    }
};
