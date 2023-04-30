import { Link } from "react-router-dom";

const Intro: React.FC = () => {
  return (
    <nav className="py-4 relative">
    <Link to="/main" className="text-[14px] hover:text-amber-500">
      <i className="fa-solid fa-address-card" /> Create
    </Link>
      <div className="timeline mt-2">
        <li className="block px-4 py-2 border-1 mb-5 rounded-lg bg-gray-300 relative">
          <div className="flex text-[14px]">This intro was created on Tuesday 4.55pm</div>
          <p className="text-right text-[12px] mt-2 text-slate-500"><i className="fa-regular fa-clock"></i> tuesday 4.55pm</p>
        </li>
        <div className="timeline-divider"></div>
        <li className="block px-4 py-2 border-1 mb-5 rounded-lg bg-gray-300 relative">
          <div className="flex text-[14px]">intro link was viewed on 29 April by @harshaunknownu</div>
          <p className="text-right text-[12px] mt-2 text-slate-500"><i className="fa-regular fa-clock"></i> wednesday 12.55pm</p>
        </li>
        <div className="timeline-divider"></div>
        <li className="block px-4 py-2 border-1 mb-5 rounded-lg bg-gray-300 relative">
          <div className="flex text-[14px]">Harsha has said thanks to Girish</div>
          <p className="text-right text-[12px] mt-2 text-slate-500"><i className="fa-regular fa-clock"></i> friday 8am</p>
        </li>
        <div className="timeline-divider"></div>
        <li className="block px-4 py-2 border-1 rounded-lg bg-gray-300 relative">
          <div className="flex text-[14px]">Nilesh has said thanks to Girish</div>
          <p className="text-right text-[12px] mt-2 text-slate-500"><i className="fa-regular fa-clock"></i> yesterday 1.00pm</p>
        </li>
      </div>
    </nav>
  );
};

export default Intro;
