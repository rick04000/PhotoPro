import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-10 border-b bg-background px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            {/* Invoice Header Skeleton */}
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <div className="space-y-2">
                <Skeleton className="h-12 w-32" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
              <div className="space-y-1 text-right">
                <Skeleton className="h-10 w-32 ml-auto" />
                <Skeleton className="h-4 w-24 ml-auto" />
              </div>
            </div>

            <div className="my-6 h-[1px] w-full bg-muted" />

            {/* Invoice Info Skeleton */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <div>
                  <Skeleton className="h-6 w-40" />
                  <div className="mt-2 space-y-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              </div>
              <div className="space-y-2 md:text-right">
                <div className="grid grid-cols-2 gap-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24 ml-auto" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24 ml-auto" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24 ml-auto" />
                </div>
              </div>
            </div>

            {/* Invoice Items Skeleton */}
            <div className="mt-8 rounded-md border">
              <div className="border-b bg-muted/50 p-3">
                <div className="grid grid-cols-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                  <Skeleton className="h-4 w-16 ml-auto" />
                  <Skeleton className="h-4 w-16 ml-auto" />
                </div>
              </div>
              <div className="space-y-3 p-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="grid grid-cols-4">
                    <Skeleton className="h-4 w-full max-w-[200px]" />
                    <Skeleton className="h-4 w-8 mx-auto" />
                    <Skeleton className="h-4 w-16 ml-auto" />
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </div>
                ))}
              </div>
            </div>

            {/* Totals Skeleton */}
            <div className="mt-6 flex justify-end">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="h-[1px] w-full bg-muted" />
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-20 font-medium" />
                  <Skeleton className="h-5 w-16 font-medium" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-20 font-medium" />
                  <Skeleton className="h-5 w-16 font-medium" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
