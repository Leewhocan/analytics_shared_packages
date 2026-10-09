// Общие типы для API: запросы, ответы, ошибки.

import { LogLevel, WriteStatus } from "./constants";
import { EventBase, LogEvent, MetricEvent, ErrorEvent } from "./events";

// Ответ бэка, когда что-то пошло не так (500 и т.п.)
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
}

// База события без project_id — он уходит в query, а не в тело
type EventPayloadBase = Omit<EventBase, "project_id">;

// Тело запроса на создание события-ошибки
export interface CreateErrorPayload extends EventPayloadBase {
  level: LogLevel;
  message: string;
  payload: Record<string, unknown>;
}

// Тело запроса на создание лог-события
export interface CreateLogPayload extends EventPayloadBase {
  level: LogLevel;
  message: string;
}

// Тело запроса на создание метрик-события
export interface CreateMetricPayload extends EventPayloadBase {
  name: string;
  value: number;
  tags: Record<string, string>;
}

// Ответ на создание любого события
export interface CreateEventResponse {
  event_id: string;
  status: WriteStatus;
}

// Пагинация — используется и в query, и в ответе
export interface Pagination {
  page: number;
  size: number;
}

// Мета ответа списка: пагинация плюс общее количество
export interface ResponseMeta extends Pagination {
  total: number;
}

// Общий фильтр для GET-запросов событий. Здесь project_id уже в query
export interface EventQuery extends Pagination {
  project_id: string;
}

// Фильтр для логов — можно сузить по level
export interface LogQuery extends EventQuery {
  level?: LogLevel;
}

// Фильтр для метрик — можно сузить по name
export interface MetricQuery extends EventQuery {
  name?: string;
}

// Пока совпадает с EventQuery, отдельный тип — на будущее
export type ErrorQuery = EventQuery;

// Ответ списка логов
export interface LogListResponse extends ResponseMeta {
  items: LogEvent[];
}

// Ответ списка ошибок
export interface ErrorListResponse extends ResponseMeta {
  items: ErrorEvent[];
}

// Ответ списка метрик
export interface MetricListResponse extends ResponseMeta {
  items: MetricEvent[];
}
