import lightGlow from './assets/light-glow.svg';
import medGlow from './assets/med-glow.svg';
import boldGlow from './assets/bold-glow.svg';
import './assets/button.css';

export default function TopRightGlowButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="button-rectangle">
        {/* <div className="top-layer" /> */}
        <div className="button-children">
          {' '}
          <p className="font-outfit-light antialiased font-thin md:text-sm text-xs tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 via-zinc-400 to-zinc-100">
            {children}
          </p>
        </div>{' '}
      </div>
    </div>
  );
}
