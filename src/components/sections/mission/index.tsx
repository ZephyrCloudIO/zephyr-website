import separateTop from '@/images/separator-pointing-down.svg';
import separateBottom from '@/images/separator-pointing-up.svg';
import hexagon from '@/images/hexagons-combined.svg';
import './mission.css';

export default function Mission() {
  return (
    <section className="relative h-[calc(100vh-10vh)]">
      <img src={separateTop} className="absolute top-0"></img>
      <img src={hexagon} className="absolute z-10"></img>
      <div className="absolute z-20 top-[20%]">
        {' '}
        <div className="py-2 z-20">
          {' '}
          <div className="flex md:flex-row flex-col items-center py-6  justify-between">
            {' '}
            <h2 className="text-6xl font-outfit-light text-zinc-300 leading-[1.2]">
              Focus on features,
              <br /> not DevOps.
            </h2>
            <div className="md:w-1/2">
              {' '}
              <p className="text-xl leading-[1.4] text-zinc-300">
                We raised $3M in Seed round to further tackle deployment
                complexity for micro-frontend and many more.
              </p>
            </div>
          </div>
        </div>
        <div className="py-10">
          <div className="flex justify-between">
            {Missions.map(item => (
              <div key={item.title} className="flex flex-col gap-4">
                <h3 className="text-7xl font-outfit-light text-zinc-50 font-light">
                  {item.title}
                </h3>
                <p className="text-xl font-outfit-light text-zinc-50 tracking-wide">
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
    title: '$3M',
    content: 'Raised in Seed round',
  },
];
