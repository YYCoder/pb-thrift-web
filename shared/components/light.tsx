import { Box } from 'rebass';

type Props = {
    on: boolean;
};

export function Light(_props: Props) {
    return (
        <Box
            sx={{
                border: '1px solid',
                borderColor: 'background',
                '&:hover': {
                    borderColor: 'reverseBg'
                },
                borderRadius: 'circle',
                transition: 'border-color .2s ease'
            }}
            px={2}
            py={2}
            ml={2}
        >
            <Box
                bg="reverseBg"
                sx={{
                    borderRadius: 'circle'
                }}
                px={2}
                py={2}
                width={30}
                height={30}
            />
        </Box>
    );
}
