import { useTheme } from 'emotion-theming';

export function Swap() {
    const theme = useTheme() as any;
    return (
        <svg
            className="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1188"
            width="20%"
        >
            <path
                d="M273.664 341.333h579.67a42.667 42.667 0 0 1 0 85.334H170.666c-37.974 0-57.046-45.952-30.166-72.832l170.667-170.667a42.667 42.667 0 0 1 60.33 60.33l-97.834 97.835z m476.587 341.334H170.58a42.667 42.667 0 0 1 0-85.334h682.667c37.973 0 57.045 45.952 30.165 72.832L712.747 840.832a42.667 42.667 0 1 1-60.331-60.33l97.835-97.835z"
                p-id="1189"
                fill={theme.colors.background}
            ></path>
        </svg>
    );
}
