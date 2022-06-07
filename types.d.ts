/* eslint-disable no-unused-vars */
declare const Go;

type TransformParams = {
    rawContent: string;
    useSpaceIndent: boolean;
    indentSpace?: string;
    fieldCase: string;
    nameCase: string;
    task: number;
    syntax?: number;
};

type TransformResp = {
    msg: string;
    res: string;
};

interface Window {
    transform(params: TransformParams): TransformResp;
}
