import { Textarea } from '@rebass/forms';
import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, Flex, Link } from 'rebass';
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
                        backgroundColor: '#000'
                    }
                });
            } catch (e) {
                console.error(e);
                toast.error(
                    'sorry, copy to clipboard failed, try to copy it yourself 😓'
                );
            }
        } else {
        }
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
                        color="primary"
                    >
                        {leftSide}
                    </Box>
                    <Box width={1 / 3}>
                        <Button
                            color="white"
                            bg="black"
                            onClick={onSwap}
                            mr={2}
                            width={1 / 2}
                            css={{
                                cursor: 'pointer',
                                maxWidth: 200
                            }}
                        >
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
                                    fill="#e6e6e6"
                                ></path>
                            </svg>
                        </Button>
                    </Box>
                    <Box
                        width={1 / 3}
                        pr={3}
                        fontSize={[3, 4, 5]}
                        fontWeight="bold"
                        color="primary"
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
                                resize: 'none'
                            }}
                            height={500}
                        />
                    </Box>
                    <Box width={1 / 2} px={2} py={2}>
                        <Box
                            px={2}
                            py={2}
                            fontSize={[1, 2, 2]}
                            height={500}
                            sx={{
                                // 边框颜色应该应用主题变量
                                border: '1px solid #000'
                            }}
                        >
                            <pre
                                style={{
                                    whiteSpace: 'break-spaces',
                                    margin: 0,
                                    color: isError ? 'red' : '',
                                    overflowY: 'scroll',
                                    height: '100%'
                                }}
                                onClick={handleClick}
                            >
                                <code id="transformed">{rightContent}</code>
                            </pre>
                        </Box>
                    </Box>
                </Flex>
            </Box>
            <Box textAlign="center" mt={3}>
                © 2021 Markey Github:
                <Link
                    target="_blank"
                    rel="noopener"
                    href="https://github.com/YYCoder/protobuf-thrift"
                >
                    protobuf-thrift
                </Link>
            </Box>
        </Box>
    );
}
