import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

const SERVICE_IDS = [
  'cad-modeling',
  '3d-rendering',
  'product-design',
  'industrial-design',
  'medical-device-modeling',
  'engineering-visualization',
];

export function generateStaticParams() {
  return SERVICE_IDS.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const title = id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${title} | Services — Red Shadow Designs`,
    description: `${title} services by Red Shadow Designs — precision engineering and 3D rendering studio in Islamabad, Pakistan.`,
    alternates: { canonical: `https://www.redshadowdesigns.com/services/${id}` },
    openGraph: {
      title: `${title} | Red Shadow Designs`,
      url: `https://www.redshadowdesigns.com/services/${id}`,
    },
  };
}


export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Format the ID into a readable title
  const title = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="min-h-screen bg-[#060912] pb-24">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-[#0a0a0a]">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop" 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-lighten"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060912] via-[#060912]/50 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-6 lg:px-8 pb-16">
          <Link href="/#services" className="inline-flex items-center gap-2 text-[#00d4ff] hover:text-white transition-colors mb-8 font-mono text-sm uppercase tracking-widest w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <div className="inline-flex mb-4 px-4 py-1 rounded-full border border-[rgba(124,58,237,0.3)] bg-[rgba(124,58,237,0.08)] text-[#d8b4fe] uppercase tracking-[0.16em] text-[0.66rem] w-fit">
            Service Details
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-mono tracking-tight text-white mb-6">
            {title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Main Description */}
          <div className="lg:col-span-2 space-y-8 text-white/70 text-lg leading-relaxed">
            <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
            <p>
              This is the detailed overview for our <strong className="text-[#00d4ff]">{title}</strong> service. We leverage industry-leading software and deep mechanical engineering expertise to deliver solutions that go far beyond standard visualizations. 
            </p>
            <p>
              Whether we are building fully parametric CAD assemblies for manufacturing, or generating photorealistic marketing renders, every pixel and tolerance is scrutinized to ensure it meets real-world constraints.
            </p>
          </div>

          {/* Sidebar / Deliverables */}
          <div className="bg-[#0a0f1a] rounded-3xl p-8 border border-[rgba(255,255,255,0.05)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-fit">
            <h3 className="text-2xl font-bold text-white mb-6">Key Deliverables</h3>
            <ul className="space-y-4">
              {[
                "Production-ready STEP/STL Files",
                "Photorealistic Marketing Renders",
                "Kinematic Assembly Analysis",
                "Design for Manufacturing (DFM)",
                "Full Source File Handover"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70">
                  <CheckCircle2 className="w-6 h-6 text-[#7c3aed] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/#contact" className="flex items-center justify-center w-full py-4 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-bold hover:scale-[1.02] transition-transform">
                Request a Quote
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
