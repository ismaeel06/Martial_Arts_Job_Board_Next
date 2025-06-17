import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import PricingSection from '@/components/home/PricingSection';
import FeaturedJobsSection from '@/components/home/FeaturedJobsSection';
import CTASection from '@/components/home/CTASection';

export const metadata = {
  title: 'MartialArtsJobsBoard.com | Where Schools Hire & Instructors Find Work',
  description: 'The #1 Job Board for Martial Arts Instructors',
};

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <HowItWorksSection />
      <FeaturedJobsSection />
      <PricingSection />
      <CTASection />
    </MainLayout>
  );
}
