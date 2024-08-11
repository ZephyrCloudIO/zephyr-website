import './assets/button.css';

export type GlowingButtonProps = {
  className?: string;
  children?: string;
  textClassName?: string;
};
export default function GlowingButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <div className="button-rectangle">
        <div className="top-layer"></div>
        <div className="button-children">
          {' '}
          <p className="font-outfit-light antialiased font-thin text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 via-zinc-400 to-zinc-100">
            {children}
          </p>
        </div>{' '}
      </div>
    </div>
  );
}
