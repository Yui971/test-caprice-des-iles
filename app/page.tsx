import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryNav from '@/components/CategoryNav';
import MenuSection from '@/components/MenuSection';
import ReviewCTA from '@/components/ReviewCTA';
import Footer from '@/components/Footer';
import menuData from '@/data/menu.json';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />

      <div id="menu" className="bg-[#FAF5E6]">
        <CategoryNav />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
          {menuData.categories.map((category) => (
            <MenuSection
              key={category.id}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              category={category as any}
            />
          ))}
        </div>
      </div>

      <ReviewCTA />
      <Footer />
    </>
  );
}
