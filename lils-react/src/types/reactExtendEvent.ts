interface CustomEvent extends React.MouseEvent<HTMLElement> {
  target: {
    className: string;
  };
}
