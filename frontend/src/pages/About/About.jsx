import watch1 from "../../assets/watch1.jpg";
import watch2 from "../../assets/watch2.jpg";
import watch3 from "../../assets/watch3.jpg";
// import master from "../../assets/master.jpg";
// import signature from "../../assets/signature.png";

const About = () => {
  const craftsmanshipData = [
    {
      title: "Hand-Finishing",
      desc: "Polished edges and hand-beveled bridges crafted to perfection.",
      img: watch1,
    },
    {
      title: "Material Innovation",
      desc: "Advanced ceramics and alloys engineered for endurance.",
      img: watch2,
    },
    {
      title: "Precision Calibration",
      desc: "Chronometer-certified accuracy tested across all positions.",
      img: watch3,
    },
  ];

  return (
    <div className="bg-[#0b1220] text-white">

      {/* ===== HERO SECTION ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm tracking-widest text-blue-400 mb-4">
            — ESTABLISHED 1903
          </p>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            A Legacy of <br />
            <span className="text-gray-300">Excellence.</span>
          </h1>

          <p className="mt-6 text-gray-400 leading-relaxed">
            Our story begins in the heart of the Swiss Jura mountains,
            where the ticking of time became a language of its own.
            For over a century, Horologue has defined the zenith of
            precision watchmaking, blending masterful techniques
            with contemporary innovation.
          </p>

          <button className="mt-8 text-blue-400 hover:underline">
            The History →
          </button>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg aspect-[4/3]">
          <img
            src={watch2}
            alt="Watch craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-center text-2xl font-semibold mb-16">
          Our Journey Through Time
        </h2>

        <div className="space-y-12 border-l border-gray-700 pl-8">
          {[
            {
              year: "1903",
              title: "The First Spark in Neuchâtel",
              desc: "Julien Horologue opens his first atelier, specializing in high-precision escapements.",
            },
            {
              year: "1924",
              title: "Mastering the Seas",
              desc: "Creation of the Navigator I, the most accurate marine chronometer of its era.",
            },
            {
              year: "1958",
              title: "The Celestial Movement",
              desc: "Breakthrough triple-axis tourbillon achieving perfect balance from all angles.",
            },
            {
              year: "2024",
              title: "Modern Renaissance",
              desc: "Introduction of Eternal Series blending high-tech ceramics with hand-finished heritage.",
            },
          ].map((item, i) => (
            <div key={i} className="relative">
              <span className="absolute -left-[38px] top-1 w-4 h-4 bg-blue-500 rounded-full"></span>
              <p className="text-blue-400 font-semibold">{item.year}</p>
              <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
              <p className="text-gray-400 mt-2 max-w-xl">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CRAFTSMANSHIP (CARD IMAGE AUTO ADJUST) ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold mb-6">
          The Art of Hand- <br />Craftsmanship
        </h2>

        <p className="text-gray-400 max-w-2xl mb-12">
          Every Horologue timepiece undergoes over 200 hours of meticulous
          hand-assembly. True luxury lives in the details only the human
          hand can perfect.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {craftsmanshipData.map((card, i) => (
            <div
              key={i}
              className="bg-[#101a2f] rounded-xl overflow-hidden"
            >
              {/* IMAGE AUTO SIZE */}
              <div className="aspect-[4/3] w-full">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-gray-400 text-sm mt-2">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== MASTER HOROLOGIST ===== */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-xl overflow-hidden aspect-[3/4]">
          {/* <img
            src={master}
            alt="Master Horologist"
            className="w-full h-full object-cover"
          /> */}
        </div>

        <div>
          <p className="text-blue-400 tracking-widest text-sm mb-3">
            THE HUMAN ELEMENT
          </p>

          <h2 className="text-3xl font-bold mb-4">
            Meet Master Horologist, <br /> Elias Thorne
          </h2>

          <blockquote className="text-gray-300 italic border-l-4 border-blue-500 pl-4 mb-6">
            “A watch is not just a tool to measure time.
            It is a heart that beats in unison with its wearer.”
          </blockquote>

          <p className="text-gray-400">
            With over 30 years of experience in complication assembly,
            Elias Thorne oversees every masterpiece that leaves our
            atelier, ensuring uncompromised precision.
          </p>

          <div className="mt-6">
            {/* <img
              src={signature}
              alt="Signature"
              className="h-12"
            /> */}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="text-center py-20 border-t border-gray-800">
        <h2 className="text-2xl font-semibold mb-6">
          Ready to experience the legacy?
        </h2>

        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 px-6 py-3 rounded-lg">
            Explore Collections
          </button>
          <button className="border border-gray-600 px-6 py-3 rounded-lg">
            Find a Boutique
          </button>
        </div>
      </section>

    </div>
  );
};

export default About;
