import PropTypes from 'prop-types';

const MyCourseSkeletonTemplate = ({ role = 'USER' }) => {
    return (
        <div className="relative m-5 h-[21rem] w-80 animate-pulse rounded-xl border border-gray-200 bg-white p-2 shadow-md md:w-72">
            {/* Course Image Skeleton */}
            <div className="inset-2 h-40 w-full rounded-xl bg-gray-200" />

            {/* Course Details */}
            <div className="mx-2 mt-4 flex flex-col gap-3">
                {/* Offered By */}
                <div className="h-4 w-32 rounded-md bg-gray-200" />

                {/* Course Title */}
                <div className="h-5 w-52 rounded-md bg-gray-300" />
                <div className="h-5 w-36 rounded-md bg-gray-300" />

                {/* Instructor/Admin View */}
                {(role === 'ADMIN' || role === 'INSTRUCTOR') && (
                    <>
                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-6 rounded bg-gray-200" />
                            <div className="h-4 w-24 rounded bg-gray-200" />
                            <div className="h-4 w-8 rounded bg-gray-200" />
                        </div>

                        {/* Price */}
                        <div className="mt-2 flex items-center gap-x-2">
                            <div className="h-4 w-14 rounded bg-gray-300" />
                            <div className="h-4 w-10 rounded bg-gray-200 line-through" />
                        </div>
                    </>
                )}

                {/* User View */}
                {role === 'USER' && (
                    <>
                        <div className="h-3 w-full rounded bg-gray-200" />
                        <div className="flex justify-between text-sm">
                            <div className="h-4 w-24 rounded bg-gray-200" />
                            <div className="flex flex-col items-end gap-1">
                                <div className="h-4 w-16 rounded bg-gray-200" />
                                <div className="h-3 w-24 rounded bg-gray-200" />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

MyCourseSkeletonTemplate.propTypes = {
    role: PropTypes.oneOf(['ADMIN', 'INSTRUCTOR', 'USER']),
};

export default MyCourseSkeletonTemplate;
