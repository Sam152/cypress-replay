type LogEntry = { message: string; context: any };

export default class Logger implements LoggerInterface {
    private readonly logs: Array<LogEntry>;

    constructor() {
        this.logs = [];
    }

    push(message: string, context?: any): void {
        this.logs.push({ message, context });
    }

    getAll(): Array<LogEntry> {
        return [...this.logs];
    }
}

export interface LoggerInterface {
    push(message: string, context?: any): void;
    getAll(): Array<LogEntry>;
}
