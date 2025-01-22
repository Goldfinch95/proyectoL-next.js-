import SideNav from "../ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="d-flex flex-column flex-md-row overflow-hidden-md">
    <div className=" flex-shrink-0 w-md-25">
      <SideNav />
    </div>
    <div className="flex-grow-1 overflow-auto-md">
      {children}
    </div>
  </div>
    );
  }