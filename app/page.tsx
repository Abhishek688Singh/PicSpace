import { NavbarDemo } from "@/components/navbar";
import { VortexDemoSecond } from "@/components/vortex";
import Image from "next/image";

export default function Home() {
  return (
    <section>
      {/* <div className="sticky top-0 z-50 bg-white">
        <NavbarDemo />
      </div> */}

      <div>
        <VortexDemoSecond />
        {/* Other page content here */}
      </div>
    </section>
  );
}
