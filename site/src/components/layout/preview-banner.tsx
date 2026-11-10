import { site } from "@/content/site";

export function PreviewBanner() {
  if (!site.previewBanner) return null;
  return (
    <div className="bg-amber-100 px-4 py-2 text-center text-[13px] text-amber-900">
      Preview: names, logos, numbers, and certifications are placeholders. Replace them before launch.
    </div>
  );
}
