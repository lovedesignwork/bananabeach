import { FAQ } from '@/types';

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'What should I wear?',
    answer: 'Wear comfortable swimwear or light clothing. We recommend rash guards or UV-protective clothing for sun protection. Water shoes or sandals are ideal for beach activities. Don\'t forget a hat and sunglasses!',
    category: 'Preparation',
  },
  {
    id: '2',
    question: 'Is there a weight limit?',
    answer: 'Weight limits vary by activity. For snorkeling and water sports: 20-120 kg. For kayaking and paddleboarding: 25-110 kg. This is for safety reasons and equipment capacity.',
    category: 'Requirements',
  },
  {
    id: '3',
    question: 'What is the age limit?',
    answer: 'Most beach activities are suitable for ages 4-80. Snorkeling requires a minimum age of 8 years. Children under 18 must be accompanied by a parent or guardian.',
    category: 'Requirements',
  },
  {
    id: '4',
    question: 'Is hotel transfer included?',
    answer: 'Yes! We offer complimentary round-trip hotel transfers for most packages. Transfer is available from Phuket, Kata, Karon, Patong, and nearby areas.',
    category: 'Logistics',
  },
  {
    id: '5',
    question: 'What happens if it rains?',
    answer: 'Light rain usually doesn\'t affect our beach activities. In case of heavy rain, strong winds, or rough seas, water activities may be temporarily suspended for safety. We\'ll reschedule or refund as needed.',
    category: 'Weather',
  },
  {
    id: '6',
    question: 'Do I need prior experience?',
    answer: 'No prior experience is needed! Our professional guides will provide full safety briefings and instructions for snorkeling and water sports. We\'ve safely guided thousands of first-time visitors.',
    category: 'Experience',
  },
  {
    id: '7',
    question: 'Is it safe?',
    answer: 'Absolutely! We use quality equipment that\'s inspected daily. All our guides are professionally trained in water safety and first aid. We\'ve had zero major incidents since opening.',
    category: 'Safety',
  },
  {
    id: '8',
    question: 'Can I bring my camera or phone?',
    answer: 'Yes! We recommend a waterproof camera or phone case for water activities. Our staff can take photos and videos for you. Please secure all devices when in the water.',
    category: 'Preparation',
  },
  {
    id: '9',
    question: 'Is food included?',
    answer: 'Meal is included with select VIP and full-day packages. Other packages don\'t include food, but you can purchase meals and refreshments at our beachside restaurant.',
    category: 'Logistics',
  },
  {
    id: '10',
    question: 'What time should I arrive?',
    answer: 'Please arrive 15-30 minutes before your scheduled time slot for check-in and safety briefing. Time slots are: 8AM, 10AM, 1PM, and 3PM.',
    category: 'Logistics',
  },
  {
    id: '11',
    question: 'Can I cancel or reschedule?',
    answer: 'Yes, you can cancel or reschedule up to 24 hours before your booking for a full refund. Cancellations within 24 hours are non-refundable.',
    category: 'Booking',
  },
  {
    id: '12',
    question: 'Do I need to know how to swim?',
    answer: 'Basic swimming ability is recommended for snorkeling and water sports. For beach-only packages, swimming is not required. Life jackets are provided for those who need them.',
    category: 'Experience',
  },
];

export function getFAQsByCategory(category: string): FAQ[] {
  return faqs.filter(faq => faq.category === category);
}

export function getFAQCategories(): string[] {
  return [...new Set(faqs.map(faq => faq.category))];
}
