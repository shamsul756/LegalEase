import Appraisals from "@/components/Appraisal";
import Banner from "@/components/Banner";
import ExtraSection from "@/components/Extrasection";
import ServicesFeatures from "@/components/ServicesFeature";
import Link from "next/link";
import BrowseLawyersPage from "./(mainLayout)/events/page";

export default function Home() {
  return (
   <div>
    <Banner/>
    <BrowseLawyersPage/>
    <ExtraSection/>
    <ServicesFeatures/>
    <Appraisals/>
   </div>
  );
}