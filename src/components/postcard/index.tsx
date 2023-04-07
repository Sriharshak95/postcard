import PostImage from '../../assets/stamp.png';
const PostCard: React.FC<{ children: JSX.Element }> = (props) => {
  return (<>
    <div className="max-w-1/2 bg-indian-post rounded-lg overflow-hidden border-4 border-dashed border-yellow-800 h-96" >
      <div className="flex justify-end text-black font-bold px-4 py-2">
        <img src={PostImage} alt="Stamp" className="h-16 w-16" />
      </div>
      <div className="flex h-3/4">
        <div className="w-2/5 border-r border-gray-500 px-6 py-4"></div>
        <div className="w-3/5 px-6 py-4">
          {props.children}
        </div>
      </div>
    </div>
  </>
  );
};

export default PostCard;
