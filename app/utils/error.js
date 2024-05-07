export class GlobalError extends Error {
    constructor(message) {
        super(message);
        this.name = 'GlobalError';
    }
}

export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
    }
}
