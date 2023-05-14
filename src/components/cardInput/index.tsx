const CardInput: React.FC<{
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  onFocus?: (e: any) => void;
  value: string;
  type: string;
  placeholder?: string;
  className?: string;
  name: string;
  maxLength: number;
}> = (props) => {
  const defaultClassName = `text-[14px] border-b-2 bg-transparent border-black focus:border-transparent focus:ring-0 focus:outline-none`;
  return (
    <input
      name={props.name}
      className={
        props.className
          ? defaultClassName + " " + props.className
          : defaultClassName
      }
      maxLength={props.maxLength}
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
