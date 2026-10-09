import { LogLevel } from "./constants";
export interface EventBase {
    event_id: string;
    project_id: string;
    timestamp: string;
}
export interface ErrorEvent extends EventBase {
    level: LogLevel;
    message: string;
    payload: Record<string, object>;
}
export interface LogEvent extends EventBase {
    level: LogLevel;
    message: string;
}
export interface MetricEvent extends EventBase {
    name: string;
    value: number;
    tags: Record<string, string>;
}
//# sourceMappingURL=events.d.ts.map