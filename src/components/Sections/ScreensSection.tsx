import '../Section/Section.scss';

export default function ScreensSection() {
  return (
    <section className="mt-10 h-screen" id="screens">
      <div className="bg-image">
        {' '}
        <div className="white-block white-block-right"></div>{' '}
        <div className="white-block white-block-left"></div>
        <div className="p-4 lg:p-10">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl">
            Wiele możliwości
          </p>
          <hr className="mt-4 hidden border-t-2 border-gray-300 sm:block" />
          <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
            Lorem ipsum dolor sit amet.
          </p>
          <hr className="mt-4 hidden border-t-2 border-gray-300 sm:block" />
        </div>
      </div>
    </section>
  );
}
