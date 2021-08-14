/* eslint-disable no-unused-vars */

export enum TaskType {
    PROTO2THRIFT = 1,
    THRIFT2PROTO = 2
}

export type TaskOptions = {
    taskType: TaskType;
    useSpaceIndent: boolean;
    indentSpace: number;
    fieldCase: string;
    nameCase: string;
    syntax: number;
};
