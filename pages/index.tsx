import { Input, Label, Radio, Select } from '@rebass/forms';
import { Box, Flex, Heading } from 'rebass';
import style from './style.module.css';

function HomePage() {
    return (
        <div className={style.main}>
            <div className={style.header}>
                <Box
                    // as='form'
                    onSubmit={(e) => e.preventDefault()}
                    py={3}
                >
                    <Flex mx={2} mb={2}>
                        <Box width={1 / 2} px={5}>
                            <Label pb={1} htmlFor="name">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue="Jane Doe"
                            />
                        </Box>
                        <Box width={1 / 2} px={5}>
                            <Flex mx={2} mb={2}>
                                <Box width={1 / 2}>
                                    <Label pb={1} htmlFor="location">
                                        Location
                                    </Label>
                                </Box>
                                <Box width={1 / 2}>
                                    <Select
                                        id="location"
                                        name="location"
                                        defaultValue="NYC"
                                    >
                                        <option>NYC</option>
                                        <option>DC</option>
                                        <option>ATX</option>
                                        <option>SF</option>
                                        <option>LA</option>
                                    </Select>
                                </Box>
                            </Flex>
                        </Box>
                    </Flex>
                    <Flex mx={2} mb={2}>
                        <Box width={1 / 2}>
                            <Heading fontSize={[5, 6, 7]} color="primary">
                                pb-thrift
                            </Heading>
                            <div className={style.mainTitle}></div>
                            <div className={style.subTitle}>
                                protobuf idl to thrift, and vice versa
                            </div>
                            <div className={style.instruction}>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Possimus nemo earum provident
                                fuga illum fugiat, praesentium ab nihil
                                accusamus dolor in ad eaque. Eos maiores
                                corporis dolor atque nobis accusantium?
                            </div>
                        </Box>
                        <Box width={1 / 2}>
                            <Box
                                as="form"
                                onSubmit={(e) => {
                                    console.log(e);
                                }}
                                py={3}
                            >
                                <Flex mx={2} mb={4}>
                                    <Box width={1 / 2}>
                                        <Label pb={1} htmlFor="useSpaceIndent">
                                            useSpaceIndent:
                                        </Label>
                                    </Box>
                                    <Box width={1 / 2}>
                                        <Radio
                                            id="useSpaceIndent"
                                            name="useSpaceIndent"
                                            value="0"
                                            defaultChecked
                                        />
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
                                            placeholder="4"
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
                                            defaultValue="camelCase"
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
                                            defaultValue="camelCase"
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
                                    <Box width={1 / 3}>
                                        <Label pb={1} htmlFor="syntax">
                                            protobuf syntax:
                                        </Label>
                                    </Box>
                                    <Box width={1 / 3}>
                                        <Radio
                                            name="syntax"
                                            id="syntax"
                                            value="3"
                                            defaultChecked
                                        />
                                        3
                                        <Radio
                                            name="syntax"
                                            id="syntax"
                                            value="2"
                                        />
                                        2
                                    </Box>
                                </Flex>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </div>
        </div>
    );
}

export default HomePage;
