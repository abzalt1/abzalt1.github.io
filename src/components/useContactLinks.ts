// No prefilled text: a canned "Здравствуйте! Хочу обсудить..." makes people send it as-is,
// while an empty chat nudges them to describe their task in the first message.
const LINKS = {
  telegram: 'https://t.me/abzalt1',
  whatsapp: 'https://wa.me/77081901222',
};

export default function useContactLinks() {
  return LINKS;
}
