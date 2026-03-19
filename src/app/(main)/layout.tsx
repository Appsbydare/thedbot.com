import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}
