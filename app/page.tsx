// app/page.tsx
import { AnalyzerForm } from "./_components/meansure-form";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center p-4 sm:p-8 transition-colors duration-500">
      <AnalyzerForm />
    </div>
  );
}
