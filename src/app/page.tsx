import { TryTheLookHero } from "@/components/home/TryTheLookHero";
import { ClothingRailSection } from "@/components/home/ClothingRailSection";
import { SneakerPerspectiveSection } from "@/components/home/SneakerPerspectiveSection";
import { FeaturedSneakerSection } from "@/components/home/FeaturedSneakerSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CuratedDrops } from "@/components/home/CuratedDrops";
import { EditorialBanners } from "@/components/home/EditorialBanners";
import { BrandEditorial } from "@/components/home/BrandEditorial";
import { CommunityGrid } from "@/components/home/CommunityGrid";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SectionReveal } from "@/components/animations/SectionReveal";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] flex flex-col">
      {/* 1. Signature Hero: TRY THE LOOK Interactive Runway (Reference 00.0s – 05.5s) */}
      <TryTheLookHero />

      {/* 2. Signature Rail: Suspended Horizontal Clothing Collection Strip (Reference 05.5s – 08.0s) */}
      <ClothingRailSection />

      {/* 3. Signature Featured Sneaker Detail & Purchasing Interface (Reference 13.5s – 16.5s) */}
      <FeaturedSneakerSection />

      {/* 4. Signature 3D Perspective Footwear Gallery Orbit (Reference 11.5s – 13.5s) */}
      <SneakerPerspectiveSection />

      {/* 5. Category Architecture */}
      <SectionReveal>
        <CategoryGrid />
      </SectionReveal>

      {/* 6. Seasonal Best Sellers & Curated Drops */}
      <SectionReveal>
        <CuratedDrops />
      </SectionReveal>

      {/* 7. Editorial Campaign Banners */}
      <SectionReveal>
        <EditorialBanners />
      </SectionReveal>

      {/* 8. Brand Editorial Manifesto & Atelier Craftsmanship */}
      <SectionReveal>
        <BrandEditorial />
      </SectionReveal>

      {/* 9. Curated Community Looks */}
      <SectionReveal>
        <CommunityGrid />
      </SectionReveal>

      {/* 10. Private Atelier Newsletter Dispatch */}
      <SectionReveal>
        <NewsletterSection />
      </SectionReveal>
    </main>
  );
}
