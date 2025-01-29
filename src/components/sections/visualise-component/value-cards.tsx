/* eslint-disable react/prop-types */
import './value-card.css';

export type ValueCardType = {
  title: string;
  content?: string;
  description?: string;
  graphic: string;
};

export const ValueCard = ({ props }: { props: ValueCardType }) => {
  return (
    <div className="flex group/value-card value-card-background transition-all backdrop-blur-lg md:w-[calc((100vw-19vw)/3)] w-auto md:h-[calc((100vh-10vh)/2)] h-auto  hover:h-[calc(120vh/2)] p-5 flex-col items-center justify-between gap-3 rounded-2xl -[0.4px] -zinc-400/80">
      <img
        src={props.graphic}
        className="md:w-[350px]"
        alt={props.description}
      ></img>
      <div className="md:p-4 p-2 h-full flex-col gap-4 flex items-center ">
        <h4 className="md:text-2xl text-lg w-full  text-start  text-zinc-200">
          {props.title}
        </h4>
        {props.content && (
          <p
            className="text-zinc-400 md:opacity-0 md:group-hover/value-card:opacity-100 duration-500 font-outfit-light tracking-wide"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: props.content }}
          ></p>
        )}
      </div>
    </div>
  );
};
