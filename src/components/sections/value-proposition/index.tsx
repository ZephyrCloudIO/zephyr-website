import graphyBackground from '@/images/graphy.png';
import value1 from '@/images/value-proposition/icon1.svg';
import value2 from '@/images/value-proposition/icon2.svg';
import value3 from '@/images/value-proposition/icon3.svg';
import value4 from '@/images/value-proposition/icon4.svg';
import { useRef } from 'react';
import ValuePropositionCard from './card';

export default function ValueProposition() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cards = [
    {
      text: 'Manage dependencies for micro-frontends',
      image: (
        <div
          className="w-12 h-12 flex p-1 bg-cover bg-center bg-no-repeat rounded-full border-2 border-[#E79294] items-center justify-center"
          style={{ backgroundImage: `url(${graphyBackground})` }}
          role="img"
          aria-label="Efficiently manage and update dependencies across all your micro-frontend applications"
        >
          <img src={value1} className="w-8 h-8" alt="Dependency Management" />
        </div>
      ),
    },
    {
      text: 'Generate live preview links in seconds',
      image: (
        <div
          className="w-12 h-12 flex p-1 bg-cover bg-center bg-no-repeat rounded-full border-2 border-[#5DD0A8] items-center justify-center"
          style={{ backgroundImage: `url(${graphyBackground})` }}
          role="img"
          aria-label="Live Preview Icon"
        >
          <img
            src={value2}
            className="w-6 h-6"
            alt="Instantly create and share live preview environments for your applications"
          />
        </div>
      ),
    },
    {
      text: 'Version roll-back and roll-forward',
      image: (
        <div
          className="w-12 h-12 flex p-1 bg-cover bg-center bg-no-repeat rounded-full border-2 border-[#E3B28F] items-center justify-center"
          style={{ backgroundImage: `url(${graphyBackground})` }}
          role="img"
          aria-label="Version Control Icon"
        >
          <img
            src={value3}
            className="w-8 h-8"
            alt="Seamlessly manage application versions with instant rollback and forward capabilities"
          />
        </div>
      ),
    },
    {
      text: 'Auto deploy on build',
      image: (
        <div
          className="w-12 h-12 flex p-1 bg-cover bg-center bg-no-repeat rounded-full border-2 border-[#946AE3] items-center justify-center"
          style={{ backgroundImage: `url(${graphyBackground})` }}
          role="img"
          aria-label="Auto Deploy Icon"
        >
          <img
            src={value4}
            className="w-8 h-8"
            alt="Automated deployment pipeline that triggers on successful builds"
          />
        </div>
      ),
    },
  ];

  return (
    <section
      className="container flex md:flex-row flex-col-reverse font-outfit pb-20 justify-start items-center w-full relative mb-24 sm:px-4 py-24"
      aria-label="Platform Features and Benefits"
    >
      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div className="relative md:grid md:grid-cols-12 gap-6 text-base flex flex-col md:space-y-0 space-y-4 px-4">
          {cards.map((card, index) => (
            <div
              key={card.text}
              className="col-start-auto col-end-10 md:w-max transform hover:-translate-y-1 transition-transform duration-300 justify-self-end"
            >
              <ValuePropositionCard
                // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                divRef={el => (cardRefs.current[index] = el)}
                text={card.text}
                icon={card.image}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="items-start py-8 flex gap-8 md:px-4 md:w-[70%] flex-col relative z-10 px-4">
        <div className="flex flex-col gap-4 font-outfit-medium w-full">
          {ValueTitle.map(item => (
            <h2
              className="text-4xl text-center md:text-start md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-zinc-100 to-zinc-500 font-outfit-light font-light"
              key={item}
            >
              {item}
            </h2>
          ))}
        </div>
        <div className="pl-2">
          <p className="text-zinc-100/80 md:text-sm text-base tracking-wide font-light">
            Bring the power of modern cloud platforms to your cloud.
            <span className="sr-only">
              Zephyr Cloud enables you to build and deploy applications with
              complete control over your infrastructure.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

const ValueTitle = ['Your Cloud.', 'Your Platform.', 'Your Framework.'];
