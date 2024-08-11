import { useEffect, useRef, useState } from 'react';
import ValuePropositionCard from './card';
import type { Options } from '@/types';
import cloudUpload from '@/images/lotti/cloud-upload.json';

export default function ValueProposition() {
  const ref = useRef<HTMLDivElement | null>(null);

  const [hover, setHover] = useState(false);
  const cloudUploadOptions: Options = {
    loop: true,
    autoplay: hover,
    animationData: cloudUpload,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  // TODO: set all lottie properties correctly

  useEffect(() => {
    const el = ref.current;

    if (el) {
      el.addEventListener('mouseenter', () => setHover(true));
      el.addEventListener('mouseleave', () => setHover(false));
    }
  }, [ref]);

  return (
    <section className="flex md:flex-row flex-col-reverse font-outfit pt-5 pb-20  justify-between items-center w-full">
      <div className="pr-4">
        <div className="flex flex-col md:grid md:grid-cols-6 md:grid-rows-4 space-y-10 ">
          <div className="md:col-span-3 md:row-start-1 md:col-start-2 md:px-16">
            <ValuePropositionCard
              divRef={ref}
              text="Auto-deploy on build"
              lottieOptions={cloudUploadOptions}
            />
          </div>
          <div className="md:col-span-3 md:row-start-2 md:col-start-3 md:px-6">
            <ValuePropositionCard
              divRef={ref}
              text="Manage dependencies for micro-frontends"
              lottieOptions={cloudUploadOptions}
            />
          </div>
          <div className="md:col-span-3 md:row-start-3 md:col-start-1 md:px-4">
            {' '}
            <ValuePropositionCard
              divRef={ref}
              text="Bring visibility to federated applications"
              lottieOptions={cloudUploadOptions}
            />
          </div>
          <div className="md:col-span-3 md:col-start-4 md:px-2 md:row-start-4">
            <ValuePropositionCard
              divRef={ref}
              text="Version rollback and roll-forward"
              lottieOptions={cloudUploadOptions}
            />
          </div>
        </div>
      </div>
      <div className="items-start py-6 flex gap-8 md:px-10 md:w-[calc(90vw-40vw)] flex-col">
        <div className="flex flex-col gap-4  font-outfit-medium">
          {' '}
          {ValueTitle.map(item => (
            <h2
              className="md:text-5xl text-4xl text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 via-zinc-100 to-zinc-500 font-outfit-light font-light"
              key={item}
            >
              {item}
            </h2>
          ))}
        </div>
        <div className="pl-2">
          <p className="text-zinc-100/80 md:text-sm text-base tracking-wide font-light">
            Bring the power of modern deployment to your cloud.
          </p>
        </div>
      </div>
    </section>
  );
}

const ValueTitle = ['Your Cloud.', 'Your Platform.', 'Your Framework.'];
