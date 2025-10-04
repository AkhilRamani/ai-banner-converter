import { Sidebar } from "@/components/shared/sidebar";
import { HomePage } from "@/components/pages/home/home.page";

export default function Page() {
  return (
    <>
      <div className="flex-1 flex flex-col p-8 max-w-7xl mx-auto min-h-[90vh] rounded-tl-2xl overflow-auto">
        <HomePage />
      </div>
    </>
  );
}
