import { Skeleton } from "@/components/ui/skeleton";

export default function FormSkeleton() {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="md:w-[600px] p-6 border rounded-lg shadow-md">
        <Skeleton className="h-8 w-1/3 mb-6" />

        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>

        <Skeleton className="h-12 w-full mt-6" />
      </div>
    </div>
  );
}
