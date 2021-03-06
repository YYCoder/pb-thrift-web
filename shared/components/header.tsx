import { Checkbox, Input, Label, Select } from '@rebass/forms';
import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Link, Text } from 'rebass';

export type ChangeOptions = {
    pbSyntax: number;
    nameCase: string;
    fieldCase: string;
    useSpaceIndent: boolean;
    indentSpace: number;
};
export type PageHeaderProps = {
    onChange: (_params: ChangeOptions) => void;
    onClickExample: () => void;
};

export function PageHeader(props: PageHeaderProps) {
    const { onChange, onClickExample } = props;
    const [pbSyntax, setPbSyntax] = useState<ChangeOptions['pbSyntax']>(2);
    const [nameCase, setNameCase] =
        useState<ChangeOptions['nameCase']>('camelCase');
    const [fieldCase, setFieldCase] =
        useState<ChangeOptions['fieldCase']>('camelCase');
    const [useSpaceIndent, setUseSpaceIndent] =
        useState<ChangeOptions['useSpaceIndent']>(true);
    const [indentSpace, setIndentSpace] =
        useState<ChangeOptions['indentSpace']>(4);

    useEffect(() => {
        onChange({
            pbSyntax,
            nameCase,
            fieldCase,
            useSpaceIndent,
            indentSpace
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pbSyntax, nameCase, fieldCase, useSpaceIndent, indentSpace]);

    return (
        <Box py={3} color="text">
            <Flex mx={2} mb={2}>
                <Box width={1 / 2} pr={6}>
                    <Heading fontSize={[5, 6, 7]}>
                        <Box variant="shadow">pb-thrift</Box>
                    </Heading>
                    <Text mt={2} fontSize={[3, 4, 5]} fontWeight="bold">
                        Protobuf idl to thrift, and vice versa.
                    </Text>
                    <Text mt={3} fontSize={[1, 2, 3]}>
                        This tool makes protobuf and thrift transform to each
                        other, but only supports syntaxes that are supported by
                        both language, following the rules by{' '}
                        <Link
                            target="_blank"
                            rel="noopener"
                            href="https://github.com/YYCoder/protobuf-thrift#caveat"
                        >
                            github
                        </Link>
                        .
                        <Button
                            ml={3}
                            onClick={onClickExample}
                            css={{
                                cursor: 'pointer'
                            }}
                            color="background"
                        >
                            example
                        </Button>
                    </Text>
                    <Flex mt={4}>
                        <Box>
                            <Heading fontSize={[1, 2, 3]}>Contact me:</Heading>
                        </Box>
                        <Box ml={3}>
                            <Box>Wechat: markey_yuan</Box>
                            <Box>Email: markeyyuan@gmail.com</Box>
                            <Box>
                                Github:{' '}
                                <Link
                                    href="https://github.com/YYCoder"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    YYCoder
                                </Link>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
                <Box width={1 / 2}>
                    <Box py={3}>
                        <Flex mx={2} mb={4}>
                            <Box width={1 / 2}>
                                <Label pb={1} htmlFor="useSpaceIndent">
                                    useSpaceIndent:
                                </Label>
                            </Box>
                            <Box width={1 / 2}>
                                <Label>
                                    <Checkbox
                                        id="useSpaceIndent"
                                        name="useSpaceIndent"
                                        checked={useSpaceIndent}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            setUseSpaceIndent(e.target.checked);
                                        }}
                                    />
                                </Label>
                            </Box>
                        </Flex>
                        <Flex mx={2} mb={4}>
                            <Box width={1 / 2}>
                                <Label pb={1} htmlFor="indentSpace">
                                    indentSpace:
                                </Label>
                            </Box>
                            <Box width={1 / 2}>
                                <Input
                                    id="indentSpace"
                                    name="indentSpace"
                                    type="number"
                                    value={indentSpace}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setIndentSpace(
                                            parseInt(e.target?.value)
                                        );
                                    }}
                                />
                            </Box>
                        </Flex>
                        <Flex mx={2} mb={4}>
                            <Box width={1 / 2}>
                                <Label pb={1} htmlFor="fieldCase">
                                    fieldCase:
                                </Label>
                            </Box>
                            <Box width={1 / 2}>
                                <Select
                                    id="fieldCase"
                                    name="fieldCase"
                                    value={fieldCase}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLSelectElement>
                                    ) => {
                                        setFieldCase(e.target?.value);
                                    }}
                                >
                                    <option>camelCase</option>
                                    <option>snakeCase</option>
                                    <option>kababCase</option>
                                    <option>pascalCase</option>
                                    <option>screamingSnakeCase</option>
                                </Select>
                            </Box>
                        </Flex>
                        <Flex mx={2} mb={4}>
                            <Box width={1 / 2}>
                                <Label pb={1} htmlFor="nameCase">
                                    nameCase:
                                </Label>
                            </Box>
                            <Box width={1 / 2}>
                                <Select
                                    id="nameCase"
                                    name="nameCase"
                                    value={nameCase}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLSelectElement>
                                    ) => {
                                        setNameCase(e.target?.value);
                                    }}
                                >
                                    <option>camelCase</option>
                                    <option>snakeCase</option>
                                    <option>kababCase</option>
                                    <option>pascalCase</option>
                                    <option>screamingSnakeCase</option>
                                </Select>
                            </Box>
                        </Flex>
                        <Flex mx={2} mb={4}>
                            <Box width={1 / 2}>
                                <Label pb={1} htmlFor="syntax">
                                    syntax:
                                </Label>
                            </Box>
                            <Box width={1 / 2}>
                                <Select
                                    id="syntax"
                                    name="syntax"
                                    value={pbSyntax}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLSelectElement>
                                    ) => {
                                        setPbSyntax(parseInt(e.target?.value));
                                    }}
                                >
                                    <option>3</option>
                                    <option>2</option>
                                </Select>
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}
