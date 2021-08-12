module.exports = {
    rules: {
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: false
            }
        ],
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                // 跟 vscode 的 source.organizeImports 冲突了，只能关掉
                // source.organizeImports 自动修复 import 是不加尾部 trailingComma 号的
                trailingComma: 'none'
            }
        ], // Prettier 加入 eslint 校验，并以错误展示
        'no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                argsIgnorePattern: '^_', // 以 _ 开头的变量无需校验
                caughtErrors: 'none'
            }
        ]
    },
    plugins: ['prettier'],
    extends: ['next', 'prettier']
};
