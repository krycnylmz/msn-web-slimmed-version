import Link from "next/link";
import Slider from "@/components/Slider";

export default function Home() {



  const sliderContents = [
    {
      title: "'Yazık kadıncağız boyum uzayacak sandı! Ancak bu kadar oldu'",
      source: "Haberler.com",
      sourceIcon: "",
      image: "/images/slide1.jpeg",
    },
    {
      title: "Emekliye 8'li destek müjdesi! Refah paketi ile giderler düşecek gelirleri artacak",
      source: "Haberler.com",
      sourceIcon: "",
      image: "/images/slide2.jpeg",
    },
    {
      title: "1183 yaşındaki porsuk ağacını kestiler!",
      source: "Haberler.com",
      sourceIcon: "",
      image: "/images/slide3.jpeg",
    },
    {
      title: "Ukrayna artık kimseyi dinlemiyor... Rusya’nın can damarı petrolü vurdu",
      source: "Haberler.com",
      sourceIcon: "",
      image: "/images/slide4.jpeg",
    },
  ];



  return (
    <div className=" ">
      {/* slider-top-nav */}
      <div className="flex flex-row items-center gap-2 py-2">
        <div className="flex flex-row items-center gap-2">
          <img
            className="w-8 h-8"
            src="//img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kKVy.img"
            alt="Parçalı bulutlu"
          />
          BUCA / 19°C
          <span>|</span>
        </div>
        <ul className="flex flex-row gap-3">
          <li className=" text-sm font-semibold hover:underline transition-all cursor-pointer">
            {" "}
            <Link href="/">SPOR</Link>{" "}
          </li>
          <li className=" text-sm font-semibold hover:underline transition-all cursor-pointer">
            {" "}
            <Link href="/">FİNANS</Link>{" "}
          </li>
          <li className=" text-sm font-semibold hover:underline transition-all cursor-pointer">
            {" "}
            <Link href="/">HABER</Link>{" "}
          </li>
          <li className=" text-sm font-semibold hover:underline transition-all cursor-pointer">
            {" "}
            <Link href="/">EĞLENCE</Link>{" "}
          </li>
          <li className=" text-sm font-semibold hover:underline transition-all cursor-pointer">
            {" "}
            <Link href="/">ASTROLOJİ</Link>{" "}
          </li>
          <li className=" text-sm font-semibold hover:underline transition-all cursor-pointer">
            {" "}
            <Link href="/">OTOMOBİL</Link>{" "}
          </li>
          <li className=" text-sm font-semibold hover:underline transition-all cursor-pointer">
            {" "}
            <Link href="/">YAŞAM</Link>{" "}
          </li>
          <li className=" text-sm font-semibold hover:underline transition-all cursor-pointer">
            {" "}
            <Link href="/">HAVA DURUMU</Link>{" "}
          </li>
          <li className=" text-sm font-semibold hover:underline transition-all cursor-pointer">
            {" "}
            <Link href="/">VİDEO</Link>{" "}
          </li>
          <li className=" text-sm font-semibold hover:underline transition-all cursor-pointer">
            {" "}
            <Link href="/">GÜNDELİK OYUNLAR</Link>{" "}
          </li>
        </ul>
      </div>
      <div className="w-full flex flex-row bg-lime-400 gap-4">
        {/* slider */}
        <div className="w-full sm:w-1/2">
          <Slider slides={sliderContents} />
        </div>
        <div className="w-full sm:w-1/2 bg-red-600">denene</div>
      </div>
    </div>
  );
}
