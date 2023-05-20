const CardInput: React.FC<{
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  onFocus?: (e: any) => void;
  onKeyUp?: (e: any) => void;
  value: string;
  type: string;
  placeholder?: string;
  className?: string;
  name: string;
  maxLength: number;
}> = (props) => {
  const defaultClassName = `text-[14px] border-b placeholder:text-slate-950 bg-transparent border-slate-600 focus:border-transparent focus:ring-0 focus:outline-none`;
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
      autoComplete="off"
      onChange={props.onChange}
      onKeyUp={props.onChange}
      onFocus={props.onFocus}
      placeholder={props.placeholder ? props.placeholder : ""}
    />
  );
};

export default CardInput;
