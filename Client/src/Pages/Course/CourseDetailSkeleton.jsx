import HomeLayout from "../../Layouts/HomeLayout";


const CourseDetailSkeleton = () => {
    return (
        <HomeLayout>
            <div className="h-fit w-full animate-pulse pt-12 md:pt-16">
                {/* Shimmer Effect Style */}
                <style>
                    {`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .skeleton-box {
                    position: relative;
                    overflow: hidden;
                    background-color: #374151; /* gray-700 */
                }
                .skeleton-box::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    transform: translateX(-100%);
                    background-image: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0,
                        rgba(255, 255, 255, 0.05) 20%,
                        rgba(255, 255, 255, 0.1) 60%,
                        rgba(255, 255, 255, 0)
                    );
                    animation: shimmer 2s infinite;
                }
                .light-skeleton { background-color: #e5e7eb; } /* gray-200 for bottom section */
                `}
                </style>

                {/* Header Section (Dark) */}
                <div className="h-fit w-full bg-[#1B2124] px-5 pb-16 pt-16 md:px-20">
                    {/* Breadcrumbs Placeholder */}
                    <div className="skeleton-box mb-8 h-4 w-48 rounded opacity-50" />

                    {/* Mobile Image Placeholder */}
                    <div className="mb-6 flex flex-col items-center justify-center md:hidden">
                        <div className="skeleton-box h-48 w-full max-w-sm rounded-lg" />
                    </div>

                    <div className="flex justify-between">
                        <div className="flex w-full flex-col gap-y-8 pt-5 md:max-w-[60%]">
                            {/* courseTitle Placeholder */}
                            <div className="space-y-3">
                                <div className="skeleton-box h-10 w-full rounded-md" />
                                <div className="skeleton-box h-10 w-3/4 rounded-md" />
                            </div>

                            {/* Category/Introduction Placeholder */}
                            <div className="skeleton-box h-6 w-32 rounded-full opacity-60" />

                            {/* Price & Discount Placeholder */}
                            <div className="mt-2 flex items-center gap-x-3">
                                <div className="skeleton-box h-8 w-24 rounded-md" />
                                <div className="skeleton-box h-6 w-20 rounded-md opacity-40" />
                                <div className="skeleton-box h-6 w-28 rounded-md bg-green-900/30" />
                            </div>

                            {/* Button Placeholder (Enroll/Buy Now) */}
                            <div className="flex gap-x-8">
                                <div className="skeleton-box h-12 w-48 rounded-lg bg-[#E97862]/20" />
                            </div>
                        </div>

                        {/* Desktop Image Placeholder */}
                        <div className="hidden flex-col pt-5 md:flex">
                            <div className="skeleton-box h-56 w-96 rounded-lg shadow-2xl" />
                        </div>
                    </div>
                </div>

                {/* Extra Info Section (Light) */}
                <div className="flex w-full flex-wrap justify-between gap-x-8 gap-y-5 bg-white px-5 py-8 shadow-md md:gap-x-28 md:gap-y-0 md:px-20">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex flex-col gap-y-3">
                            <div className="light-skeleton mx-auto h-5 w-20 rounded" />
                            <div className="light-skeleton mx-auto h-4 w-16 rounded opacity-60" />
                        </div>
                    ))}
                </div>

                {/* About Course Section */}
                <div className="mx-5 mb-28 mt-8 flex h-fit flex-col gap-y-7 pb-12 md:mx-20 md:mt-16 md:w-[60%]">
                    <div className="flex h-fit items-center gap-x-5 md:h-12 md:gap-x-8">
                        <div className="h-12 w-2 bg-[#E97862] opacity-50" />
                        <div className="light-skeleton h-8 w-64 rounded-md" />
                    </div>

                    {/* Description Text Placeholders */}
                    <div className="space-y-4">
                        <div className="light-skeleton h-4 w-full rounded" />
                        <div className="light-skeleton h-4 w-full rounded" />
                        <div className="light-skeleton h-4 w-full rounded" />
                        <div className="light-skeleton h-4 w-5/6 rounded" />
                        <div className="light-skeleton h-4 w-4/6 rounded" />
                    </div>
                </div>
            </div>
        </HomeLayout>
    
    );
};

export default CourseDetailSkeleton;