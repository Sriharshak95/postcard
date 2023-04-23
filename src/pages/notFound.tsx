import {Link} from 'react-router-dom';
import withPostCardWrapper from '../components/hoc';
const NotFound:React.FC = () => {
    return (<>
        <p>Lost your way?</p>
        <Link to="/main" className='underline'>Home</Link>
    </>)
}

export default withPostCardWrapper(NotFound);