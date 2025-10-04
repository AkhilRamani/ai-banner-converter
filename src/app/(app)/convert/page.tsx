import { Sidebar } from "@/components/shared/sidebar";
import { MainContent } from "@/components/shared/main-content";

export default function HomePage() {
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col p-8 min-h-[90vh] bg-background/60 rounded-tl-2xl overflow-auto">
        <MainContent />
      </div>
    </>
  );
}
