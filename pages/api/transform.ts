export const config = {
    bodyParser: {
        sizeLimit: '2mb',
    },
}

export default function handler(req, res) {
    console.log(`req start ${req.url}, data = ${JSON.stringify(req.body)}`);

    let content, errTips: string
    if (req.method === 'POST') {
        if (typeof req.body?.content !== 'string') {
            errTips = `invalid request content type ${typeof req.body?.content}`;
            console.log(errTips)
            res.status(400).json({
                content, errTips,
            });
        }
        if (req.body?.content?.length > 0) {
            console.log(req.body);
            // TODO: 调用 node 命令行模块执行命令转换
            content = req.body?.content;
        }
    } else {
        errTips = `invalid request method ${req.method}`
        res.status(400).json({
            content, errTips,
        });
    }

    res.status(200).json({
        content,
        errTips: '',
    });
}
