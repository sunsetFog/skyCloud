export class ExtendableError extends Error {
    code;

    message;

    stack;

    constructor(message, ...args) {
        // @ts-ignore
        super(message, ...args);

        // this.name = this.constructor.name;
        // @ts-ignore
        if (Error.captureStackTrace) {
            // @ts-ignore
            Error.captureStackTrace(this, ExtendableError);
        } else {
            // @ts-ignore
            this.stack = new Error(message, ...args).stack;
        }

        this.message = message;
    }
}
export default ExtendableError;
