export interface MenuItemProps {
  id: string;
  text: string | JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  icon?: JSX.Element;
}
