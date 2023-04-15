import {Link} from 'react-router-dom';
const NotFound:React.FC = () => {
    return (<>
        <p>Lost your way?</p>
        <Link to="/" className='underline'>Home</Link>
    </>)
}

export default NotFound;