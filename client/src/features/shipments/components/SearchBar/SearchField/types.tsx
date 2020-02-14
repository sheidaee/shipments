export interface ISearchField {
  name?: string;
  caption: string;
  Field: any;
  value: string | null;
  handleChange: (e: any) => any;
  items?: object[],
  callback?(field: string, value: any): void;
  props?: any;
}
