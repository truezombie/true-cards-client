export interface MenuItemProps {
  id: string | number;
  text: string | JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  icon?: JSX.Element;
  link?: string;
}
