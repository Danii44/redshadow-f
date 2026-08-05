import Link from 'next/link';

export default function ServicePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen pt-32 pb-16 px-6 lg:px-8 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#120524] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00d4ff]/10 blur-[120px] rounded-full -z-10" />

      <div className="text-center max-w-3xl glass-strong p-12 rounded-3xl border border-[rgba(0,212,255,0.2)]">
        <div className="inline-flex mb-6 px-4 py-1 rounded-full border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] text-[#d8b4fe] uppercase tracking-[0.16em] text-[0.66rem]">
          Service Details
        </div>
        <h1 className="text-5xl font-bold text-white mb-6 capitalize">
          {params.id.replace(/-/g, ' ')}
        </h1>
        <p className="text-white/60 mb-12 text-lg">
          This is a placeholder page for the {params.id.replace(/-/g, ' ')} service. We will build out the full detailed content for this specific service next!
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-bold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(124,58,237,0.4)]">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
