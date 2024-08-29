import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types'
 
export default function CourseRating({averageRating}) {
 
    return (
        <Stack spacing={1}>
            <Rating name="half-rating-read" defaultValue={averageRating} precision={0.5} readOnly size='small'/>
        </Stack>
    );
}

CourseRating.propTypes = {
    averageRating:PropTypes.number
}