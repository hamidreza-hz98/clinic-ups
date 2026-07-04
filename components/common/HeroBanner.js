export default function HeroBanner({ src, title, description }) {
  return (
    <section>
      <div className="relative bg-gray-900 w-full h-[92vh]">
        <img
          className="w-full h-full object-cover"
          src={src}
          alt="Hero Banner"
        />
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {title && (
        <div className="absolute inset-0 flex flex-col gap-4 px-6 py-4 text-center items-center justify-center">
          <div className="w-auto px-8 py-4 bg-surface bg-opacity-50 backdrop-blur rounded-2xl">
            <h1 className="text-4xl font-bold text-primary">{title}</h1>
            <p className="text-lg mt-2">{description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
