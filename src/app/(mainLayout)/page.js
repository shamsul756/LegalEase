import Appraisals from "@/components/Appraisal";
import Banner from "@/components/Banner";
import ExtraSection from "@/components/Extrasection";
import ServicesFeature from "@/components/ServicesFeature";
import Stats from "@/components/Stats";

import Image from "next/image";

export default function Home() {
  const stats ={
    totalCases: 300,
    totalClients:5000,
    totalLawyers:10000



  } 
  return (
 <div>
<Banner/>
<ServicesFeature/>
<Stats stats={stats}/>
<ExtraSection/>
<Appraisals/>
 </div>
  );
}
