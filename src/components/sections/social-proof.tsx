import Image from "next/image";

const STATS = [
  { value: "50+", label: "Manufacturers Advised" },
  { value: "$2M+", label: "Revenue Influenced" },
  { value: "200+", label: "Restaurant Accounts Opened" },
  { value: "15+", label: "Years in Foodservice" },
];

export function SocialProof() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background image with overlay */}
      <Image
        src="/social-proof-bg.jpg"
        alt="Artisan cheese and fruit board"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#6FB7F2] to-[#95E1BF] bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-[#E0C5AC] font-bilo">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
