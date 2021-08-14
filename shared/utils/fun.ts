export function debounceFn(cb: Function, d: number = 300) {
    let timer;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            cb(args);
        }, d);
        return;
    };
}
