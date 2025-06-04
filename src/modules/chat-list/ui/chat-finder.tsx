type ChatFinderProps = {
  value: string;
  onChange: (value: string) => void;
};

export const ChatFinder = ({ value, onChange }: ChatFinderProps) => (
  <input
    type="text"
    placeholder="Поиск..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);
