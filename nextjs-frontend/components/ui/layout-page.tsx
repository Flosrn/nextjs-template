import React, { useState } from "react";
import Header from "components/ui/header";
// import MobileMenu from "components/ui/mobile-menu";
import GithubDarkmodeDesign from "components/ui/github-darkmode-design";
import Footer from "components/ui/footer";
import SidebarMenu from "components/ui/sidebar-menu";

export interface LayoutPageProps {
  children: React.ReactNode;
}
const LayoutPage: React.FC<LayoutPageProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log("isOpen : ", isOpen);
  return (
    <div>
      <div className="relative z-10 bg-white dark:bg-gray-900 lg:w-full mt-20">
        <Header openHandler={() => setIsOpen(!isOpen)} />
        {/* <MobileMenu isOpen={isOpen} openHandler={() => setIsOpen(false)} /> */}
        <SidebarMenu isOpen={isOpen} openHandler={() => setIsOpen(false)} />
        <GithubDarkmodeDesign isOpen={isOpen} />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default LayoutPage;
