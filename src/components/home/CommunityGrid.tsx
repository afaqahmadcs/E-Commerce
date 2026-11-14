import Image from "next/image";
import { Camera } from "lucide-react";

export function CommunityGrid() {
  const posts = [
    {
      id: "post-1",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      handle: "@marcus.v",
      look: "Look 01 / Heavyweight Knit",
    },
    {
      id: "post-2",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      handle: "@elena_noir",
      look: "Look 04 / Studio Day",
    },
    {
      id: "post-3",
      image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
      handle: "@kenzo.style",
      look: "LUKA 5 / Archival Court",
    },
    {
      id: "post-4",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      handle: "@sora_collective",
      look: "Boxy Combed Tee / Ivory",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F8F7F4] border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 text-center">
        <div className="flex items-center justify-center space-x-2 text-brand-muted text-xs font-mono uppercase tracking-widest mb-2">
          <Camera className="w-4 h-4 text-brand-accent" />
          <span>CURATED BY YOU</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-text font-normal tracking-tight">
          @AFAQSUPPLY
        </h2>
        <p className="text-xs text-brand-muted mt-2 max-w-sm mx-auto">
          Tag #AfaqSupply on social media to be featured in our seasonal lookbook.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-brand-card shadow-sm hover:shadow-lg transition-all"
            >
              <Image
                src={post.image}
                alt={post.handle}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-left text-white">
                <p className="text-xs font-mono font-semibold">{post.handle}</p>
                <p className="text-[10px] text-neutral-300 font-sans mt-0.5">{post.look}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

