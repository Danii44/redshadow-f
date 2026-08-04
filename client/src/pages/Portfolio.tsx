'use client';

/**
 * Portfolio.tsx - Portfolio Page
 */

import { motion } from 'framer-motion';
import PortfolioEnhanced from '@/components/PortfolioEnhanced';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <PortfolioEnhanced />
    </div>
  );
}
