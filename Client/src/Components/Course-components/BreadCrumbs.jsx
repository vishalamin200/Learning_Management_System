import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BreadCrumbs = ({secondLast,last,current}) => {
  return (

    <div className="text-md breadcrumbs py-6">
        <ul>
            <li>
                <Link to={secondLast?.path}>
                    <p>{secondLast?.name}</p>
                </Link>
            </li>
            <li>
                <Link to={last?.path}>
                    <p>{last?.name}</p>
                </Link>
            </li>
            <li>
                <p className=''>{current}</p>
            </li>
        </ul>
    </div>  
    )
}

BreadCrumbs.propTypes = {
    secondLast:PropTypes.object,
    last:PropTypes.object,
    current:PropTypes.string,
}

export default BreadCrumbs