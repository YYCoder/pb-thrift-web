import chalk from 'chalk';
import cp from 'child_process';
import fs from 'fs/promises';
import id from 'nanoid';
import path from 'path';
import { TaskOptions, TaskType } from '../../shared/types';

export const config = {
    bodyParser: {
        sizeLimit: '2mb'
    }
};

const info = (...str: string[]) => {
    const d = new Date();
    const time = `${d.toUTCString()}`;
    console.log(`${chalk.green(time)} [${uuid}]:`, ...str);
};
const err = (...str: string[]) => {
    const d = new Date();
    const time = `${d.toUTCString()}`;
    console.error(`${chalk.red(time)} [${uuid}]:`, ...str);
};

// use a global variable directly, for log functions, as we don't need to worry about concurrency problem currently
let uuid: string;

export default async function handler(req, res) {
    uuid = id.nanoid(20);

    info(`req start ${req.url}, data = ${JSON.stringify(req.body)}`);

    // 1. validate params first
    const { valid, reason } = checkParams(req);
    if (!valid) {
        res.status(400).json({
            content: '',
            errTips: reason
        });
        return;
    }

    // 2. init temp files
    const {
        content = '',
        taskType = TaskType.PROTO2THRIFT,
        useSpaceIndent = false,
        indentSpace = 4,
        fieldCase = 'camelCase',
        nameCase = 'camelCase',
        syntax = 3
    } = req.body;
    const opt = {
        taskType,
        useSpaceIndent,
        indentSpace,
        fieldCase,
        nameCase,
        syntax
    };

    // use temporary file to avoid shell command injection
    const timestamp = Date.now();
    const inputExt =
        opt.taskType === TaskType.PROTO2THRIFT ? 'proto' : 'thrift';
    const outputExt =
        opt.taskType === TaskType.PROTO2THRIFT ? 'thrift' : 'proto';
    const tmpName = path.join(process.cwd(), `tmps/${timestamp}_tmp`);
    const tempInput = `${tmpName}.${inputExt}`;
    const tempOutput = `${tmpName}.${outputExt}`;
    let resContent: string;
    try {
        await fs.writeFile(tempInput, content);
        info(
            `successfully create file ${tempInput}, and write request content to it`
        );
    } catch (error) {
        const errTips = `failed to create file ${tempInput}: ${error.message}`;
        err(errTips);
        res.status(500).json({
            content: '',
            errTips
        });
        try {
            await fs.unlink(tempInput);
        } catch {}
        return;
    }

    // 3. do the transformation
    try {
        resContent = await doTransform(opt, tempInput, tempOutput);
    } catch (error) {
        res.status(500).json({
            content: '',
            errTips: error.message
        });
        // clear temp files
        try {
            await fs.unlink(tempInput);
            await fs.unlink(tempOutput);
        } catch {}
        return;
    }

    // 4. clear temp file
    try {
        await fs.unlink(tempInput);
        await fs.unlink(tempOutput);
        info(`successfully deleted ${tempInput} and ${tempOutput}`);
    } catch (error) {
        err(`failed to delete ${tempInput} or ${tempOutput}:`, error.message);
        return;
    }

    res.status(200).json({
        content: resContent,
        errTips: ''
    });
}

async function doTransform(
    opt: TaskOptions,
    tempInput: string,
    tempOutput: string
): Promise<string> {
    let data: Buffer;
    const {
        taskType,
        useSpaceIndent,
        indentSpace,
        fieldCase,
        nameCase,
        syntax
    } = opt;

    const task =
        taskType === TaskType.PROTO2THRIFT ? 'proto2thrift' : 'thrift2proto';
    const outputPath = path.parse(tempOutput);
    const command = `protobuf-thrift -t ${task} -syntax ${syntax} -use-space-indent ${
        useSpaceIndent ? 1 : 0
    } -indent-space ${indentSpace} -name-case ${nameCase} -field-case ${fieldCase} -i ${tempInput} -o ${
        outputPath.dir
    } -r 0`;

    info(`start executing command ${command}`);
    try {
        cp.execSync(command);
        info('transform successfully');
    } catch (err) {
        throw new Error(`transform failed, error ${err}`);
    }

    info(
        `execute command succeed, start read output from tmp output file ${tempOutput}`
    );
    try {
        data = await fs.readFile(tempOutput);

        return data.toString();
    } catch (error) {
        const errTips = `failed to read file ${tempOutput}: ${error.message}`;
        err(errTips);
        throw new Error(errTips);
    }
}

function checkParams(req): { reason: string; valid: boolean } {
    let reason: string;
    const {
        content = '',
        taskType = TaskType.PROTO2THRIFT,
        // useSpaceIndent = false,
        // indentSpace = 4,
        // fieldCase = 'camelCase',
        // nameCase = 'camelCase',
        syntax = 3
    } = req.body;

    if (req.method !== 'POST') {
        reason = `invalid request method ${req.method}`;
        info(reason);
        return {
            reason,
            valid: false
        };
    }
    if (typeof content !== 'string') {
        reason = `invalid request content type ${typeof req.body?.content}`;
        info(reason);
        return {
            reason,
            valid: false
        };
    }
    if (content.length === 0) {
        reason = 'empty content';
        info(reason);
        return {
            reason,
            valid: false
        };
    }
    if (!(taskType in TaskType)) {
        reason = `invalid taskType ${taskType}, must be one of ${Object.values(
            TaskType
        )}`;
        info(reason);
        return {
            reason,
            valid: false
        };
    }
    if (syntax !== 2 && syntax !== 3) {
        reason = `invalid protobuf syntax ${syntax}, must be intiger 2 or 3`;
        info(reason);
        return {
            reason,
            valid: false
        };
    }

    return {
        reason: '',
        valid: true
    };
}
