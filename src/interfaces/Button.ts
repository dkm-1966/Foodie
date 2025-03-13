export interface IButtonProps {
    clickHandler: () => void;
    children: React.ReactNode; 
    type?: "submit" | "button" | "reset";
  }
 
