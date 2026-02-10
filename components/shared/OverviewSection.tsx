type Props = {
  heading: string;
  description: string[];
  image: string;
};

export default function OverviewSection({ heading, description, image }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-6">
      <img src={image} alt={heading} className="rounded-lg" />

      <div>
        <h2 className="text-xl font-semibold mb-3">{heading}</h2>

        {description.map((text, i) => (
          <p key={i} className="text-gray-600 text-sm leading-relaxed mb-3">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}
