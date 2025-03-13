export type IInputProps = {
    type: string;
    id: string;
    value?: string;
    placeholder?: string;
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  