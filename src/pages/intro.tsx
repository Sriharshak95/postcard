import { Link } from "react-router-dom";

const Intro: React.FC = () => {
  return (
    <nav className="py-4 relative">
      <ul className="space-y-2">
        <Link
          to={"/intros/"}
          className="block px-4 py-2 border-1 rounded-lg border-yellow-800 bg-indian-post hover:bg-gray-100 cursor-pointer relative"
        >
          <div className="flex text-[12px]">
            <div className="pr-4">
              {false ? (
                <img
                  className="rounded-full"
                  src={
                    "https://pbs.twimg.com/profile_images/1540904475665506304/DfWfyaLE_normal.jpg"
                  }
                  alt="from"
                />
              ) : (
                <span className="font-medium">@seebiscut</span>
              )}
            </div>
            <div className="flex-1">
              should talk to
            </div>
            <div className="pl-4">
              {false ? (
                <img
                  className="rounded-full"
                  src={
                    "https://pbs.twimg.com/profile_images/1540904475665506304/DfWfyaLE_normal.jpg"
                  }
                  alt="to"
                />
              ) : (
                <span className="font-medium">@harshaunknownu</span>
              )}
            </div>
          </div>
          <div className="absolute h-full w-1 bg-gray-400 left-1/2 top-0 transform -translate-x-1/2"></div>
          <div className="absolute h-4 w-4 rounded-full bg-gray-400 border-2 border-white left-1/2 top-2 transform -translate-x-1/2"></div>
        </Link>
        <Link
          to={"/intros/"}
          className="block px-4 py-2 border-1 rounded-lg border-yellow-800 bg-indian-post hover:bg-gray-100 cursor-pointer relative"
        >
          <div className="flex text-[12px]">
            <div className="pr-4">
              {false ? (
                <img
                  className="rounded-full"
                  src={
                    "https://pbs.twimg.com/profile_images/1540904475665506304/DfWfyaLE_normal.jpg"
                  }
                  alt="from"
                />
              ) : (
                <span className="font-medium">@seebiscut</span>
              )}
            </div>
            <div className="flex-1">
              should talk to
            </div>
            <div className="pl-4">
              {false ? (
                <img
                  className="rounded-full"
                  src={
                    "https://pbs.twimg.com/profile_images/1540904475665506304/DfWfyaLE_normal.jpg"
                  }
                  alt="to"
                />
              ) : (
                <span className="font-medium">@harshaunknownu</span>
              )}
            </div>
          </div>
          <div className="absolute h-full w-1 bg-gray-400 left-1/2 top-0 transform -translate-x-1/2"></div>
          <div className="absolute h-4 w-4 rounded-full bg-gray-400 border-2 border-white left-1/2 top-2 transform -translate-x-1/2"></div>
        </Link>
      </ul>
    </nav>
  );
};

export default Intro;
