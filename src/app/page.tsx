import Dashboard from "@/components/Dashboard";
import AnimatedBackground from "@/components/AnimatedBackground";
export default function Home() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 md:px-12">
      <AnimatedBackground />
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Syfe Savings Planner
        </h1>
        <p className="mt-2 text-sm md:text-base text-muted-foreground">
          Track your financial goals and build your future
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Dashboard />
      </div>
    </main>
  );
}
