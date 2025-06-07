const SkeletonCourseTemplate = () => {
    return (
        <div className="relative m-5 h-[21rem] w-80 animate-pulse rounded-xl border-none bg-[#FFFFFF] p-2 shadow-lg md:w-72">
            {/* Image Placeholder */}
            <div className="shimmer-bg h-40 w-full rounded-xl bg-gray-300 md:h-36"></div>

            {/* Content Placeholder */}
            <div className="mx-2 mt-4 flex h-[50%] flex-col justify-between">
                {/* Creator name */}
                <div className="shimmer-bg mb-2 h-4 w-32 rounded bg-gray-300"></div>

                {/* Course title (2 lines) */}
                <div className="shimmer-bg mb-1 h-4 w-64 rounded bg-gray-300"></div>
                <div className="shimmer-bg mb-3 h-4 w-56 rounded bg-gray-300"></div>

                {/* Rating */}
                <div className="mb-2 flex items-center gap-x-2">
                    <div className="shimmer-bg h-4 w-8 rounded bg-gray-300"></div>
                    <div className="shimmer-bg h-4 w-20 rounded bg-gray-300"></div>
                    <div className="shimmer-bg h-4 w-12 rounded bg-gray-300"></div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-x-2">
                    <div className="shimmer-bg h-5 w-16 rounded bg-gray-300"></div>
                    <div className="shimmer-bg h-4 w-12 rounded bg-gray-300"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCourseTemplate;
