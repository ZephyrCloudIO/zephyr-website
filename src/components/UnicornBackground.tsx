import UnicornScene from 'unicornstudio-react';

export function UnicornBackground({ onLoad }: { onLoad?: () => void }) {
  return (
    <UnicornScene
      projectId="xcqTpy33ZfkBvoKk52Jd"
      sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
      width="100%"
      height="900px"
      onLoad={onLoad}
    />
  );
}
