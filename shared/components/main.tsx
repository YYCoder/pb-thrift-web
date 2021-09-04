import { Textarea } from '@rebass/forms';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, Flex, Link, Text } from 'rebass';
import { Swap } from '../components';
import { TaskType } from '../types';

export type PageMainProps = {
    onChange: (_val: string) => void;
    onSwap: () => void;
    taskType: TaskType;
    raw: string;
    transformed: string;
    isError: boolean;
};

function selectText(id: string) {
    const node = document.getElementById(id);

    if (document.body.createTextRange) {
        const range = document.body?.createTextRange?.();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.error('Could not select text in node: Unsupported browser.');
    }
}

export function PageMain(props: PageMainProps) {
    const theme = useTheme() as any;
    const { onChange, raw, transformed, onSwap, taskType, isError } = props;
    const leftSide = taskType === TaskType.PROTO2THRIFT ? 'protobuf' : 'thrift';
    const rightSide =
        taskType === TaskType.PROTO2THRIFT ? 'thrift' : 'protobuf';
    const rightContent = transformed ?? 'transformed idl will show up here';
    const handleClick = async () => {
        if (!transformed) return;

        selectText('transformed');

        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(transformed);
                toast.success('copied to clipboard', {
                    style: {
                        backgroundColor: theme.colors.reverseBg,
                        color: theme.colors.background
                    }
                });
            } catch (e) {
                console.error(e);
                toast.error(
                    'sorry, copy to clipboard failed, try to copy it yourself 😓',
                    {
                        style: {
                            backgroundColor: theme.colors.reverseBg,
                            color: theme.colors.background
                        }
                    }
                );
            }
        } else {
        }
    };

    const timer = React.useRef<any>(null);
    const debouncedClick = () => {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            handleClick();
        }, 300);
    };

    return (
        <Box>
            <Box>
                <Flex textAlign="center">
                    <Box
                        width={1 / 3}
                        pl={3}
                        fontSize={[3, 4, 5]}
                        fontWeight="bold"
                        color="text"
                    >
                        {leftSide}
                    </Box>
                    <Box width={1 / 3}>
                        <Button
                            bg="reverseBg"
                            onClick={onSwap}
                            mr={2}
                            width={1 / 2}
                            css={{
                                cursor: 'pointer',
                                maxWidth: 200
                            }}
                        >
                            <Swap />
                        </Button>
                    </Box>
                    <Box
                        width={1 / 3}
                        pr={3}
                        fontSize={[3, 4, 5]}
                        fontWeight="bold"
                        color="text"
                    >
                        {rightSide}
                    </Box>
                </Flex>
            </Box>
            <Box>
                <Flex>
                    <Box width={1 / 2} px={2} py={2}>
                        <Textarea
                            value={raw}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => onChange(e.target?.value)}
                            placeholder="paste your original idl here"
                            fontSize={[1, 2, 2]}
                            css={{
                                resize: 'none',
                                borderRadius: 0
                            }}
                            height={650}
                            bg="gray"
                        />
                    </Box>
                    <Box width={1 / 2} px={2} py={2}>
                        <Box
                            px={2}
                            py={2}
                            fontSize={[1, 2, 2]}
                            height={650}
                            sx={{
                                // 边框颜色应该应用主题变量
                                border: '1px solid #000'
                            }}
                            bg="gray"
                        >
                            <pre
                                style={{
                                    whiteSpace: 'break-spaces',
                                    margin: 0,
                                    color: isError ? 'red' : '',
                                    overflowY: 'scroll',
                                    height: '100%'
                                }}
                                onClick={debouncedClick}
                            >
                                <code id="transformed">{rightContent}</code>
                            </pre>
                        </Box>
                    </Box>
                </Flex>
            </Box>
            <Text textAlign="center" mt={3} color="text">
                © 2021 Markey Github:
                <Link
                    target="_blank"
                    rel="noopener noreferer"
                    href="https://github.com/YYCoder/protobuf-thrift"
                >
                    protobuf-thrift
                </Link>
            </Text>
        </Box>
    );
}
