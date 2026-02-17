import { Skeleton } from "@/components/shared/Skeleton";

export default function Loading() {
    return (
        <div className="w-full space-y-20 pb-20">
            {/* Hero Skeleton */}
            <section className="relative w-full bg-white overflow-hidden py-12 md:py-20">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <Skeleton className="h-20 w-3/4 md:h-32" />
                            <Skeleton className="h-6 w-1/2" />
                            <div className="flex flex-col gap-4 max-w-[280px]">
                                <Skeleton className="h-12 w-full rounded-full" />
                                <Skeleton className="h-12 w-full rounded-full" />
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <Skeleton className="h-[400px] w-full rounded-2xl" />
                        </div>
                    </div>
                    <div className="mt-12">
                        <Skeleton className="h-[400px] md:h-[600px] w-full rounded-2xl" />
                    </div>
                </div>
            </section>

            {/* Forensic Services Skeleton */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="mb-12 space-y-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-64" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-[32px] p-6 space-y-6">
                                <Skeleton className="h-14 w-14 rounded-full" />
                                <div className="space-y-3">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6" />
                                </div>
                                <Skeleton className="h-40 w-full rounded-2xl" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Intro Skeleton */}
            <section className="py-20 overflow-hidden">
                <div className="container mx-auto px-4 md:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Skeleton className="h-[500px] w-full rounded-2xl" />
                        </div>
                        <div className="space-y-6">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-12 w-3/4" />
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                            <Skeleton className="h-12 w-40 rounded-full" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
