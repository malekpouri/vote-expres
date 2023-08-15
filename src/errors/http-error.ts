export class httpError extends Error {
    
    constructor(message: string | undefined,public statusCode: number) {
        super(message);
        
    }
}   