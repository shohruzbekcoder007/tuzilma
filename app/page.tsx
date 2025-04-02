import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import OrgChart from "@/components/org-chart"

export default function Home() {
  return (
    <>
      <Header />
    
    <div className="min-h-screen p-4 md:p-8 lg:p-12 bg-gray-100">
      <div className=" mx-auto">
        {/* <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Davlat Tashkiloti Rahbariyati</h1> */}
        {/* <p className="text-lg text-center text-muted-foreground mb-12">
          Tashkilotimiz rahbariyati va xodimlari haqida ma'lumot
        </p> */}
        <OrgChart />
      </div>
    </div>

    <Footer />
    
    </>
  )
}

