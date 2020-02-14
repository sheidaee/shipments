export interface IProps {
  placeholder?: string;
  value: Date | null;
  name: string;
  callback?(field: string, value: any): void;
  formatNumber?: number;
}
