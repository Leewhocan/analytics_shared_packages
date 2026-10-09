import { LogLevel, WriteStatus } from "./constants";
import { EventBase, LogEvent, MetricEvent, ErrorEvent } from "./events";
export interface ApiErrorResponse {
    statusCode: number;
    message: string;
}
type EventPayloadBase = Omit<EventBase, "project_id">;
export interface CreateErrorPayload extends EventPayloadBase {
    level: LogLevel;
    message: string;
    payload: Record<string, unknown>;
}
export interface CreateLogPayload extends EventPayloadBase {
    level: LogLevel;
    message: string;
}
export interface CreateMetricPayload extends EventPayloadBase {
    name: string;
    value: number;
    tags: Record<string, string>;
}
export interface CreateEventResponse {
    event_id: string;
    status: WriteStatus;
}
export interface Pagination {
    page: number;
    size: number;
}
export interface ResponseMeta extends Pagination {
    total: number;
}
export interface EventQuery extends Pagination {
    project_id: string;
}
export interface LogQuery extends EventQuery {
    level?: LogLevel;
}
export interface MetricQuery extends EventQuery {
    name?: string;
}
export type ErrorQuery = EventQuery;
export interface LogListResponse extends ResponseMeta {
    items: LogEvent[];
}
export interface ErrorListResponse extends ResponseMeta {
    items: ErrorEvent[];
}
export interface MetricListResponse extends ResponseMeta {
    items: MetricEvent[];
}
export {};
//# sourceMappingURL=api.d.ts.map