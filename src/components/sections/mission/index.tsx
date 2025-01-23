import separateTop from '@/images/separator-pointing-down.svg';
import separateBottom from '@/images/separator-pointing-up.svg';
import hexagon from '@/images/hexagons-combined.svg';
import './mission.css';

export default function Mission() {
  return (
    <section className="relative h-[calc(100vh-10vh)]">
      <img src={separateTop} className="absolute top-0"></img>
      <img src={hexagon} className="absolute z-10"></img>
      <div className="absolute z-20 top-[20%] w-full">
        {' '}
        <div className="py-2 z-20">
          {' '}
          <div className="flex md:flex-row flex-col items-center py-6  justify-between">
            {' '}
            <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-[#808080] bg-clip-text text-transparent tracking-wider spa">
              Focus on code,
              <br /> not operations.
            </h2>
            <p className="text-md text-gray-500">
              Move to Zephyr Cloud without refactoring your application.
            </p>
          </div>
        </div>
        <div className="py-10">
          <div className="flex justify-between">
            {Missions.map(item => (
              <div key={item.title} className="flex flex-col gap-4">
                <h3 className="text-7xl font-outfit-light text-zinc-50 font-light">
                  {item.title}
                </h3>
                <p className="text-xl font-outfit-light text-gray-500 tracking-wide">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <img className="absolute bottom-0" src={separateBottom}></img>
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
