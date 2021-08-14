import Image from 'next/image';
import { Box } from 'rebass';
import light from '../icons/light-on.svg';

type Props = {
    on: boolean;
};

export function Light(props: Props) {
    const { on } = props;
    return (
        <Box style={{ transform: on && 'rotate(180deg)', fontSize: 0 }}>
            <Image {...light} alt="light" />
        </Box>
    );
}
