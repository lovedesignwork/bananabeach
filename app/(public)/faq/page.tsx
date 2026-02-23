'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import { ChevronDown, Search, MessageCircle, ArrowRight } from 'lucide-react';
import { FAQSchema } from '@/lib/seo/structured-data';

const faqCategories = [
  {
    category: 'Booking & Reservations',
    questions: [
      {
        question: 'How do I book a beach day experience?',
        answer: 'You can book directly through our website by selecting your preferred package, date, and number of guests. Simply click the "Book Now" button, fill in your details, and complete the payment. You will receive a confirmation email immediately after booking.',
      },
      {
        question: 'Can I modify or cancel my booking?',
        answer: 'Bookings can be modified or cancelled up to 24 hours before your scheduled visit. Please contact our customer service team for assistance. Cancellations made within 24 hours of the activity are non-refundable.',
      },
      {
        question: 'Do I need to print my booking confirmation?',
        answer: 'No, you can show your booking confirmation on your mobile device. Just present your booking reference number or the QR code from your confirmation email.',
      },
      {
        question: 'Is boat transfer included?',
        answer: 'Yes! All packages include complimentary speedboat transfer from Rawai Pier to Banana Beach on Koh Hey (Coral Island). The boat ride takes approximately 15 minutes.',
      },
    ],
  },
  {
    category: 'Safety & Requirements',
    questions: [
      {
        question: 'Is it safe for non-swimmers?',
        answer: 'Yes! Our beach has calm, shallow waters perfect for non-swimmers. Life jackets are available free of charge, and our trained lifeguards are on duty throughout the day.',
      },
      {
        question: 'Are there age restrictions?',
        answer: 'Banana Beach welcomes guests of all ages. Children under 12 must be accompanied by an adult. We have family-friendly facilities and activities suitable for all ages.',
      },
      {
        question: 'What safety equipment is provided?',
        answer: 'We provide life jackets, snorkeling equipment (with some packages), and first aid facilities. Our beach is monitored by trained lifeguards during operating hours.',
      },
      {
        question: 'Can pregnant women visit?',
        answer: 'Yes, pregnant women are welcome to enjoy our beach facilities. However, we recommend consulting with your doctor before participating in water activities or boat transfers.',
      },
    ],
  },
  {
    category: 'The Experience',
    questions: [
      {
        question: 'How long is the beach day experience?',
        answer: 'Our standard beach day runs from 9:00 AM to 4:00 PM, giving you approximately 6-7 hours to enjoy the beach, activities, and meals. Boat transfers depart at scheduled times.',
      },
      {
        question: 'What should I bring?',
        answer: 'Bring swimwear, sunscreen, a towel, sunglasses, and a hat. We recommend reef-safe sunscreen to protect the marine environment. Lockers are available to store your valuables.',
      },
      {
        question: 'Can I bring my own food and drinks?',
        answer: 'Outside food and beverages are not permitted on the beach. Our restaurant offers a wide variety of Thai and international cuisine, and many packages include meals.',
      },
      {
        question: 'Are there water activities available?',
        answer: 'Yes! We offer snorkeling, kayaking, paddleboarding, and banana boat rides. Some activities are included in packages, while others can be booked separately on-site.',
      },
    ],
  },
  {
    category: 'Packages & Pricing',
    questions: [
      {
        question: 'What is included in each package?',
        answer: 'Each package includes boat transfer, beach access, and beach chair/umbrella. Packages vary in meal inclusions, activities, and amenities. Check each package description for full details.',
      },
      {
        question: 'Are there discounts for groups?',
        answer: 'Yes, we offer special rates for groups of 10 or more. Please contact us directly for group pricing and availability.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express) through our secure Stripe payment gateway. Payment is in Thai Baht.',
      },
      {
        question: 'Do you offer refunds for bad weather?',
        answer: 'Yes, if we cancel due to severe weather conditions, you will receive a full refund or can reschedule to another date. Light rain does not typically affect operations.',
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-medium text-slate-800 pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-accent transition-transform flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-slate-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories = faqCategories
    .map((cat) => ({
      ...cat,
      questions: cat.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(
      (cat) =>
        cat.questions.length > 0 &&
        (activeCategory === 'all' || cat.category === activeCategory)
    );

  const allFAQs = useMemo(() => 
    faqCategories.flatMap(cat => cat.questions),
    []
  );

  return (
    <main className="min-h-screen">
      <FAQSchema faqs={allFAQs} />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/Hero%20Image/Beach.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary" />
        
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              Help Center
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-white mb-6">
              Frequently Asked <span className="text-accent">Questions</span>
            </h1>
            <p className="text-lg text-white/70 mb-8">
              Find answers to common questions about your Banana Beach experience
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-accent"
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* FAQ Section */}
      <Section className="bg-slate-50 py-12">
        <Container>
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-slate-600 hover:text-slate-800 border border-slate-200'
              }`}
            >
              All Topics
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.category
                    ? 'bg-primary text-white'
                    : 'bg-white text-slate-600 hover:text-slate-800 border border-slate-200'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="max-w-3xl mx-auto space-y-6">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
              >
                <h2 className="text-lg font-[family-name:var(--font-heading)] text-accent mb-4">
                  {category.category}
                </h2>
                <div>
                  {category.questions.map((item) => (
                    <FAQItem
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                    />
                  ))}
                </div>
              </motion.div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600">No questions found matching your search.</p>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Contact CTA Section */}
      <Section className="bg-white py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-[family-name:var(--font-heading)] text-slate-800 mb-4">
              Still have <span className="text-accent">questions</span>?
            </h2>
            <p className="text-slate-600 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our friendly team is here to help.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-full transition-all shadow-lg hover:shadow-primary/30"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}
