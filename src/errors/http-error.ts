export class httpError extends Error {
    
    constructor(message: string | undefined,public statusCode: number) {
        super(message);
        
    }
}   
export class ForbiddenError extends httpError {
    constructor() {
        super('Forbidden',403);
    }
}

export class NotfoundError extends httpError {
    constructor() {
        super('Not Found',404);
    }
}