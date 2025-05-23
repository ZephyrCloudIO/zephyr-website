import { Button } from '@/components/ui/button';
import type React from 'react';
import { useState } from 'react';
import CodeEditor from './code-editor';
import TerminalWindow, { type Command } from './terminal-window';

const frameworks = [
  'Rspack + Re.Pack + React Native',
  'React + Rspack',
  'React + Webpack + Module Federation',
  'React + Vite',
  'Qwik + Vite',
];

type FrameworkName = (typeof frameworks)[number];
type FrameworkDetails = {
  lines: number[];
  docsLink: string;
  exampleLink: string;
  installCommand: Command[];
};

const frameworkExamples: Partial<Record<FrameworkName, FrameworkDetails>> = {
  'Rspack + Re.Pack + React Native': {
    lines: [1, 21],
    docsLink: 'https://docs.zephyr-cloud.io/recipes/repack-mf',
    exampleLink: 'https://github.com/ZephyrCloudIO/zephyr-repack-example',
    installCommand: [
      {
        type: 'command' as const,
        content: 'install zephyr-repack-plugin',
      },
    ],
  },
  'React + Rspack': {
    lines: [6, 11],
    docsLink:
      'https://docs.zephyr-cloud.io/general/get-started#start-from-scratch',
    exampleLink:
      'https://github.com/ZephyrCloudIO/zephyr-examples/blob/main/examples/create-mf-app-rspack/rspack.config.js',
    installCommand: [
      {
        type: 'command' as const,
        content: 'install zephyr-rspack-plugin',
      },
    ],
  },
  'React + Webpack + Module Federation': {
    lines: [2, 6],
    docsLink: 'https://docs.zephyr-cloud.io/recipes/nx-mf-app',
    exampleLink:
      'https://github.com/ZephyrCloudIO/zephyr-examples/blob/main/examples/create-default-webpack-mf/app1/webpack.config.js',
    installCommand: [
      {
        type: 'command' as const,
        content: 'install zephyr-webpack-plugin',
      },
    ],
  },
  'React + Vite': {
    lines: [3, 6],
    docsLink: 'https://docs.zephyr-cloud.io/recipes/react-vite',
    exampleLink:
      'https://github.com/ZephyrCloudIO/zephyr-examples/blob/main/examples/react-vite-ts/vite.config.ts',
    installCommand: [
      {
        type: 'command' as const,
        content: 'install vite-plugin-zephyr',
      },
    ],
  },
  'Qwik + Vite': {
    lines: [5, 18],
    docsLink: 'https://docs.zephyr-cloud.io/',
    exampleLink:
      'https://github.com/ZephyrCloudIO/zephyr-examples/blob/main/examples/qwik-1.5/vite.config.ts',
    installCommand: [
      {
        type: 'command' as const,
        content: 'install vite-plugin-zephyr',
      },
    ],
  },
};

const DeploymentSection: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState(
    'Rspack + Re.Pack + React Native',
  );

  const deploymentOutput = [
    { type: 'command' as const, content: 'run build' },
    {
      type: 'output' as const,
      content: 'deploying....',
      label: 'ZEPHYR',
      labelColor: 'bg-[#FFFAC2] text-black',
    },
    {
      type: 'output' as const,
      content: 'uploading assets to edge....',
      label: 'ZEPHYR',
      labelColor: 'bg-[#FFFAC2] text-black',
    },
    {
      type: 'output' as const,
      content: 'application_id: team-green.Zephyr_Cloud_Id_Staging_Main_Zack_C',
      label: 'ZEPHYR',
      labelColor: 'bg-[#ACD7FF] text-black',
    },
    {
      type: 'output' as const,
      content:
        'deployed to https://zephyr-cloud-io-staging-env.zehyr-cloud.com',
      label: 'ZEPHYR',
      labelColor: 'bg-[#ACD7FF] text-black',
    },
  ];

  const frameworks = [
    'Rspack + Re.Pack + React Native',
    'React + Rspack',
    'React + Webpack + Module Federation',
    'React + Vite',
    'Qwik + Vite',
  ];

  return (
    <section className="py-24 bg-black border-2 rounded-lg border-[rgba(255,255,255,0.1)] bg-gradient-to-b from-[#2E335A]/10 from-10% via-[#1C1B33]/5 via-70% to-[#2E335A]/10 to-90%">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-[#808080] bg-clip-text text-transparent">
          Deploy with one command
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Deploying to different cloud providers is as simple as &apos;npm run
          build&apos; with Zephyr.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {frameworks.map(framework => (
            <button
              type="button"
              key={framework}
              onClick={() => setSelectedFramework(framework)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedFramework === framework
                  ? 'bg-[#2A2A2A] text-white'
                  : 'bg-[#1A1A1A] text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
              }`}
            >
              {framework}
            </button>
          ))}
        </div>

        <div
          key={selectedFramework}
          className="space-y-4 max-w-4xl mx-auto opacity-0 animate-fade-in"
          style={{ '--animation-delay': '0ms' } as React.CSSProperties}
        >
          <TerminalWindow
            title="Terminal"
            commands={
              frameworkExamples[selectedFramework]?.installCommand ?? []
            }
            showCopyButton={true}
          />

          <CodeEditor
            framework={selectedFramework}
            highlightedLines={frameworkExamples[selectedFramework]?.lines}
          />

          <TerminalWindow
            title="Terminal"
            commands={deploymentOutput}
            showCopyButton={false}
          />
        </div>

        <div className="flex justify-center gap-4 mt-12">
          <a
            href={frameworkExamples[selectedFramework]?.docsLink}
            aria-label="Zephyr Documentation"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button> Documentation</Button>
          </a>
          <a
            href={frameworkExamples[selectedFramework]?.exampleLink}
            aria-label="View this Example"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant={'outline'}>View this Example</Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DeploymentSection;
