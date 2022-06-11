import fetch from 'cross-fetch';
import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Box } from 'rebass';
import { ChangeOptions, PageHeader, PageMain } from '../shared/components';
import { protobuf, thrift } from '../shared/consts/idl-example';
import { Task, TaskType } from '../shared/types';

function HomePage() {
    const [taskType, setTaskType] = useState<TaskType>(TaskType.PROTO2THRIFT);
    const [isError, setIsError] = useState<boolean>(false);
    const [raw, setRaw] = useState<string>('');
    const [transformed, setTransformed] = useState<string>('');
    const optionRef = useRef<ChangeOptions>(null);
    const timerRef = useRef<any>(null);
    const wasmRef = useRef<any>(null);

    useEffect(() => {
        initWASM();
    }, []);

    const initWASM = async (retryCount: number = 0) => {
        if (retryCount >= 3 || wasmRef.current) return;
        try {
            const go = new Go(); // Defined in wasm_exec.js
            const WASM_URL = '/pb-thrift.wasm';
            const resp = await fetch(WASM_URL);
            const bytes = await resp.arrayBuffer();
            const wasm = await WebAssembly.instantiate(bytes, go.importObject);
            go.run(wasm.instance);
        } catch (e) {
            console.error('Instantiate wasm failed, error:', e);
            setTimeout(() => {
                initWASM(retryCount + 1);
            }, 1000);
        }
    };
    const handleOptsChange = (opts: ChangeOptions) => {
        optionRef.current = opts;
        if (raw) transform(raw);
    };
    const handleClickExample = () => {
        let raw = '';
        if (taskType === TaskType.PROTO2THRIFT) {
            raw = protobuf;
        } else {
            raw = thrift;
        }
        setRaw(raw);
        if (raw) transform(raw);
    };
    const handleValChange = (val: string) => {
        clearTimeout(timerRef.current);
        setRaw(val);

        if (!val) {
            setIsError(false);
            setTransformed('');
        } else {
            timerRef.current = setTimeout(() => {
                transform(val);
            }, 300);
        }
    };
    const handleSwap = () => {
        if (taskType === TaskType.PROTO2THRIFT) {
            setTaskType(TaskType.THRIFT2PROTO);
        } else {
            setTaskType(TaskType.PROTO2THRIFT);
        }
    };
    const transform = async (content: string) => {
        const { pbSyntax, nameCase, fieldCase, useSpaceIndent, indentSpace } =
            optionRef.current ?? {};
        // use the WASM to transform first, if not present, use API
        if (!window.transform) {
            doTransformByAPI(content);
            return;
        }

        let task = Task.PROTO2THRIFT;
        if (taskType === TaskType.THRIFT2PROTO) {
            task = Task.THRIFT2PROTO;
        }
        try {
            const result = window.transform({
                rawContent: content,
                useSpaceIndent: useSpaceIndent,
                indentSpace: `${indentSpace}`,
                fieldCase: fieldCase,
                nameCase: nameCase,
                task: task,
                syntax: pbSyntax
            });

            console.log(result);

            if (!result) {
                throw new Error('WASM panic, try API to get error msg');
            }
            const { msg, res } = result;

            if (msg) {
                setTransformed(msg);
                setIsError(true);
                return;
            }
            setTransformed(res);
            setIsError(false);
        } catch (e) {
            console.error(e);
            // use API as a fallback
            doTransformByAPI(content);
        }
    };
    const doTransformByAPI = async (val: string) => {
        const { pbSyntax, nameCase, fieldCase, useSpaceIndent, indentSpace } =
            optionRef.current ?? {};
        try {
            const resp = await fetch('/api/transform', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nameCase,
                    fieldCase,
                    useSpaceIndent,
                    indentSpace,
                    taskType,
                    syntax: pbSyntax,
                    content: val
                })
            });

            const data = await resp.json();
            if (resp.status === 200 && resp.ok && data.errTips === '') {
                setTransformed(data.content);
                setIsError(false);
            } else {
                setTransformed(
                    `error occured, please try again, response status: ${resp.status} message: \n\n${data.errTips}`
                );
                setIsError(true);
            }
        } catch (err) {
            setTransformed(
                'network error occured, please try again later, or send me an message'
            );
        }
        return;
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                transition: 'background .2s ease'
            }}
            px={2}
            py={2}
            bg="background"
        >
            <PageHeader
                onChange={handleOptsChange}
                onClickExample={handleClickExample}
            />
            <PageMain
                raw={raw}
                transformed={transformed}
                taskType={taskType}
                isError={isError}
                onSwap={handleSwap}
                onChange={handleValChange}
            />
            <ToastContainer />
        </Box>
    );
}

export default HomePage;
