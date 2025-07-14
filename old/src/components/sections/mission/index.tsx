import separateTop from '@/images/separator-pointing-down.svg';
import separateBottom from '@/images/separator-pointing-up.svg';
import './mission.css';

export default function Mission() {
  return (
    <section
      className="container relative px-4 overflow-hidden"
      aria-label="Mission and Statistics"
    >
      <div className="absolute inset-0 w-full h-full">
        <img
          src={separateTop}
          className="absolute top-0 w-full object-cover"
          alt="Decorative top section separator"
          loading="lazy"
        />
      </div>
      <div className="relative z-20 mt-24 w-full">
        <div className="py-2">
          <div className="flex md:flex-row flex-col items-center py-4 md:py-6 gap-4 md:gap-8 justify-between">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left mb-2 md:mb-4 bg-gradient-to-r from-white to-[#808080] bg-clip-text text-transparent tracking-wider">
              Focus on code,
              <br /> not operations.
            </h1>
            <p className="text-md md:text-md text-gray-500 text-center md:text-left max-w-xs md:max-w-none">
              Move to Zephyr Cloud without refactoring your application.
            </p>
          </div>
        </div>
        <div className="sm:p-32 p-32 border-2 rounded-lg border-white/10 bg-gradient-to-b from-[#2E335A]/10 from-10% via-[#1C1B33]/5 via-70% to-[#2E335A]/10 to-90%">
          <div className="flex flex-col md:flex-row gap-8 md:gap-4 md:justify-between">
            {Missions.map(item => (
              <div
                key={item.title}
                className="flex flex-col gap-2 md:gap-4 items-center"
                itemScope
                itemType="https://schema.org/Statistic"
              >
                <h2
                  className="sm:text-4xl text-5xl font-outfit-light text-zinc-50 font-light text-center"
                  itemProp="value"
                >
                  {item.title}
                </h2>
                <p
                  className="text-lg md:text-xl font-outfit-light text-gray-500 tracking-wide text-center md:text-left"
                  itemProp="description"
                >
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <img
        className="absolute bottom-0 w-full object-cover"
        src={separateBottom}
        alt="Decorative bottom section separator"
        loading="lazy"
      />
    </section>
  );
}

const Missions = [
  {
    title: '95%',
    content: 'Avg. time saved',
  },
  {
    title: '0.3 sec',
    content: 'Avg. time to deploy',
  },
  {
    title: '1 line',
    content: 'Of code to get started',
  },
];
