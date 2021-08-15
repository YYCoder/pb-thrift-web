import fetch from 'cross-fetch';
import React, { useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Box } from 'rebass';
import { ChangeOptions, PageHeader, PageMain } from '../shared/components';
import { TaskType } from '../shared/types';

function HomePage() {
    const [taskType, setTaskType] = useState<TaskType>(TaskType.PROTO2THRIFT);
    const [isError, setIsError] = useState<boolean>(false);
    const [raw, setRaw] = useState<string>('');
    const [transformed, setTransformed] = useState<string>('');
    const optionRef = useRef<ChangeOptions>(null);
    const timerRef = useRef<any>(null);
    const handleOptsChange = (opts: ChangeOptions) => {
        optionRef.current = opts;
        doTransform(raw);
    };
    const handleValChange = (val: string) => {
        setRaw(val);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            doTransform(val);
        }, 300);
    };
    const handleSwap = () => {
        if (taskType === TaskType.PROTO2THRIFT) {
            setTaskType(TaskType.THRIFT2PROTO);
        } else {
            setTaskType(TaskType.PROTO2THRIFT);
        }
    };
    const doTransform = async (val: string) => {
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
                height: '100%',
                transition: 'background .2s ease'
            }}
            px={2}
            py={2}
            bg="background"
        >
            <PageHeader onChange={handleOptsChange} />
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
