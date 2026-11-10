import { PreviewBanner } from "@/components/layout/preview-banner";
import { FocusedFooter } from "@/components/layout/site-footer";
import { FocusedHeader } from "@/components/layout/site-header";

export default function FocusedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PreviewBanner />
      <FocusedHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <FocusedFooter />
    </>
  );
}
