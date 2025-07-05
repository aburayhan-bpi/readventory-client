const Card = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow hover:shadow-md transition flex items-start gap-4 h-full">
    <div className="text-indigo-600 dark:text-indigo-400 mt-1">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
    </div>
  </div>
);
export default Card;
