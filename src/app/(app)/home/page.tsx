import { Sidebar } from "@/components/shared/sidebar";
import { MainContent } from "@/components/shared/main-content";

export default function HomePage() {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col h-full p-8 ml-96 min-h-[90vh]">
        <MainContent />
      </div>
    </>
  );
}
