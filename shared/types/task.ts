/* eslint-disable no-unused-vars */

export enum TaskType {
    PROTO2THRIFT = 1,
    THRIFT2PROTO = 2
}

export enum Task {
    PROTO2THRIFT = 3,
    THRIFT2PROTO = 4
}

export const CaseType = new Set([
    'camelCase',
    'snakeCase',
    'kababCase',
    'pascalCase',
    'screamingSnakeCase'
]);

export type TaskOptions = {
    taskType: TaskType;
    useSpaceIndent: boolean;
    indentSpace: number;
    fieldCase: string;
    nameCase: string;
    syntax: number;
};
