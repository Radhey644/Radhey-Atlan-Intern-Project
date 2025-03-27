export interface Query {
  id: string;
  name: string;
  sql: string;
}

export interface TableData {
  columns: string[];
  rows: Record<string, any>[];
}

export interface QueryHistoryItem {
  id: string;
  query: string;
  timestamp: number;
}