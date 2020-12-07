import React from "react";
import { GetStaticProps } from "next";
import { getAllPostsForHome } from "lib/api";
import LayoutPage from "components/ui/layout-page";
import { I18nProps } from "next-rosetta";
import { MyLocale } from "i18n/index";
import Blog from "components/ui/blog";

interface HomePageProps {
  preview: boolean;
  allPosts: any;
}

const HomePage: React.FC<HomePageProps> = ({ allPosts }) => {
  return (
    <LayoutPage>
      <section className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="flex flex-row flex-wrap mx-auto">
          {allPosts.map((blog) => (
            <Blog key={blog.slug} {...blog} />
          ))}
        </div>
      </section>
    </LayoutPage>
  );
};

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (context) => {
  const { preview = { preview: null } } = context;
  const allPosts = (await getAllPostsForHome(preview)) || [];
  const locale = context.locale || context.defaultLocale;
  const { table = {} } = await import(`../i18n/${locale}`);
  return { props: { table, allPosts, preview } }; // Passed to `/pages/_app.tsx`
};

export default HomePage;