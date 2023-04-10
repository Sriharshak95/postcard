const CardInput: React.FC<{
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  onFocus?: (e: any) => void;
  value: string;
  type: string;
  placeholder?: string;
  className?: string;
}> = (props) => {
  const defaultClassName = `text-[15px] border-b-2 bg-indian-post border-black focus:border-transparent focus:ring-0 focus:outline-none`;
  return (
    <input
      className={
        props.className
          ? defaultClassName + " " + props.className
          : defaultClassName
      }
      type={props.type}
      value={props.value}
      onClick={props.onChange}
      onChange={props.onChange}
      onFocus={props.onFocus}
      placeholder={props.placeholder ? props.placeholder : ""}
    />
  );
};

export default CardInput;
