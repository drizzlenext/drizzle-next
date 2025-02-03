import {
  DashboardContent,
  DashboardHeader,
  DashboardLayout,
  DashboardSidebar,
} from "@/components/ui/dashboard-layout";

export function DashboardLayoutDemo() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardSidebar />
      <DashboardContent>
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="p-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
            soluta optio vel dolorum voluptatum ipsum, quam quidem animi nam qui
            eveniet, sapiente hic corrupti quibusdam dolor itaque blanditiis
            tenetur dolorem!
          </div>
        ))}
      </DashboardContent>
    </DashboardLayout>
  );
}
