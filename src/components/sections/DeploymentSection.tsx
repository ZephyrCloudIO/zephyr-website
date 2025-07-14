import { platforms } from '@/data/platforms';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ShineBorder } from '../magicui/shine-border';
import { Card, CardFooter, CardHeader } from '../ui/card';
import {
  FeatureContent,
  FeatureDescription,
  FeatureHeader,
  FeatureSection,
  FeatureTitle,
} from './FeatureSection';

export const DeploymentSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <FeatureSection className="bg-neutral-900">
      <FeatureContent
        highlightColumn="right"
        className="md:grid-cols-2 lg:grid-cols-12 lg:gap-16"
      >
        <FeatureHeader className="text-left">
          <FeatureTitle className="text-4xl">
            To the edge in under a second
          </FeatureTitle>

          <FeatureDescription>
            Just adding a single line of code "withZephyr" is often all it takes
            to start deploying directly to the edge
          </FeatureDescription>
        </FeatureHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {platforms.map((platform, idx) => (
            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              key={platform.title}
            >
              <Card
                key={`${platform.title}-${idx}`}
                className="py-0 relative gap-0"
              >
                <AnimatePresence>
                  {hoveredIdx === idx && (
                    <ShineBorder
                      shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
                    />
                  )}
                </AnimatePresence>

                <CardHeader
                  className="rounded-t-xl flex justify-center items-center flex-1 py-6"
                  style={{
                    backgroundColor: platform.backgroundColor || '#171717',
                  }}
                >
                  {platform.logos.map((logo, logoIdx) => (
                    <div key={logoIdx} className="flex items-center gap-2">
                      {logoIdx > 0 && (
                        <span className="text-base text-neutral-400 select-none">
                          +
                        </span>
                      )}

                      <div className="flex justify-center items-center rounded-full border border-dashed border-neutral-600 p-3">
                        <img
                          src={logo}
                          alt={`${platform.title} logo ${logoIdx + 1}`}
                          className="object-contain w-10 h-10"
                        />
                      </div>
                    </div>
                  ))}
                </CardHeader>

                <CardFooter className="p-6">
                  <span className="text-base font-bold">{platform.title}</span>
                </CardFooter>
              </Card>
            </a>
          ))}

          <div className="md:col-span-2 flex justify-center mt-4">
            <a
              href="https://docs.zephyr-cloud.io/recipes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-emerald-700 transition-colors text-sm font-semibold"
            >
              See all examples
            </a>
          </div>
        </div>
      </FeatureContent>
    </FeatureSection>
  );
};
