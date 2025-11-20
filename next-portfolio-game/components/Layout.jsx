import BottomNav from "@/components/BottomNav";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
};

export default Layout;

