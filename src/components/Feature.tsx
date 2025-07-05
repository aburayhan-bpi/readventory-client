const Feature = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex flex-col items-center">
    <div className="text-indigo-500 dark:text-indigo-300 mb-3">{icon}</div>
    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h4>
    <p className="text-base text-gray-600 dark:text-gray-400">{desc}</p>
  </div>
);
export default Feature;
