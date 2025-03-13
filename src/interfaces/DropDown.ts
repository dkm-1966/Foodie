export interface IDropDownMenuProps {
    title: string;
    params: string[];
    selector: (value: string) => void;
    id: string;
  }