const colors = [
  "bg-red-600",
  "bg-green-700",
  "bg-yellow-800",
  "bg-gray-700",
  "bg-red-600",
  "bg-green-800",
  "bg-green-600",
  "bg-red-700",
  "bg-yellow-900",
  "bg-gray-900",
];

export const colorByText = (text: string) => {
  const sanitizedLetter = text.toUpperCase();
  const charCode = sanitizedLetter.charCodeAt(0);

  const colorIndex = (charCode * 12) % colors.length;
  const color = colors[colorIndex];

  return color;
};
