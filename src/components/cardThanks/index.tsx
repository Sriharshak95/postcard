const SayThanksCards: React.FC<{ src: string }> = ({ src }) => {
  return (
    <div className="bg-white rounded-lg shadow cursor-pointer hover:relative hover:shadow-xl">
      <div className="flex items-center justify-center">
        <img src={src} alt="saythanks" className="" />
      </div>
      <div className="tooltip-text absolute bg-black text-white px-2 py-1 rounded opacity-0 transition duration-300 after:bg-black after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:px-2 after:py-1 after:text-xs after:rounded after:text-center after:opacity-1">
        Coming soon
      </div>
    </div>
  );
};

export default SayThanksCards;
