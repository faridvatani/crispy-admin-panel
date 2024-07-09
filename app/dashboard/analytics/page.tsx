import { BarChartViews } from "@/components/feat/BarChartViews";

export default function Analytics() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
      </div>
      <div className="flex min-h-fit w-full flex-col items-center justify-center">
        <BarChartViews />
      </div>
    </main>
  );
}
