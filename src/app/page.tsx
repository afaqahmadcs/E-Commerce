import { TryTheLookHero } from "@/components/home/TryTheLookHero";
import { ClothingRailSection } from "@/components/home/ClothingRailSection";
import { SneakerPerspectiveSection } from "@/components/home/SneakerPerspectiveSection";
import { FeaturedSneakerSection } from "@/components/home/FeaturedSneakerSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CuratedDrops } from "@/components/home/CuratedDrops";
import { BrandEditorial } from "@/components/home/BrandEditorial";
import { CommunityGrid } from "@/components/home/CommunityGrid";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8F7F4] flex flex-col">
      {/* 1. Signature Hero: TRY THE LOOK (Reference 00.0s – 05.5s) */}
      <TryTheLookHero />

      {/* 2. Signature Rail: Horizontal Clothing Collection Strip (Reference 05.5s – 08.0s) */}
      <ClothingRailSection />

      {/* 3. Signature Featured Sneaker Purchasing Interface (Reference 13.5s – 16.5s) */}
      <FeaturedSneakerSection />

      {/* 4. Signature 3D Perspective Footwear Gallery (Reference 11.5s – 13.5s) */}
      <SneakerPerspectiveSection />

      {/* 5. Category Architecture */}
      <CategoryGrid />

      {/* 6. Seasonal Best Sellers & Curated Drops */}
      <CuratedDrops />

      {/* 7. Brand Editorial Manifesto */}
      <BrandEditorial />

      {/* 8. Curated Community Looks */}
      <CommunityGrid />
    </main>
  );
}
