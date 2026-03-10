export interface CommandHistory {
  command: string;
  output: string | string[];
  type: 'success' | 'error' | 'system' | 'ascii';
}