// VideoSection.jsx or .tsx
import Wrapper from '../Wrapper/Wrapper';
import '../Section/Section.scss';
import Video from '../Video/Video';

export default function VideoSection() {
  return (
    <Wrapper>
      <section className="mt-10" id="action">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <h3 className="mx-3 min-w-80 text-center text-3xl font-bold text-sunflower-800 dark:text-sunflower-100 md:text-left md:text-4xl">
            Zobacz naszą aplikację w akcji!
          </h3>
          <p className="mx-3 text-center text-sunflower-600 dark:text-sunflower-300 md:text-left xl:max-w-4xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            cupiditate aperiam laborum eius, soluta quo nobis temporibus eos
            aliquid enim nesciunt dolorum fuga unde omnis ex iusto quam eligendi
            asperiores.
          </p>
        </div>
        <Video />
      </section>
    </Wrapper>
  );
}
