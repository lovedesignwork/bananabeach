'use client';

import { motion } from 'framer-motion';
import { Section, Container } from '@/components/craft';
import { 
  Shield, 
  Waves, 
  Heart, 
  Shirt, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Baby,
  Umbrella,
  Camera,
  Droplets,
  Wind,
  Sun
} from 'lucide-react';

export default function SafetyPage() {
  return (
    <main className="pt-20">
      <Section className="bg-gradient-to-b from-primary to-primary-dark py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Shield className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4 font-[family-name:var(--font-heading)]">Beach & Water Safety</h1>
            <p className="text-white/70">Your safety is our top priority. Please read this information carefully before your visit to Banana Beach.</p>
          </motion.div>
        </Container>
      </Section>

      <Section className="bg-white py-12">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Quick Requirements */}
            <div className="grid md:grid-cols-3 gap-4 mb-10">
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-5 text-center">
                <Waves className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-slate-800 mb-1">Swimming Ability</h3>
                <p className="text-2xl font-bold text-primary">Required</p>
                <p className="text-xs text-slate-500 mt-1">For water activities</p>
              </div>
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-5 text-center">
                <Baby className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-slate-800 mb-1">Minimum Age</h3>
                <p className="text-2xl font-bold text-primary">4 Years</p>
                <p className="text-xs text-slate-500 mt-1">With adult supervision</p>
              </div>
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-5 text-center">
                <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-primary mb-1">Boat Departure</h3>
                <p className="text-2xl font-bold text-primary">On Time</p>
                <p className="text-xs text-slate-500 mt-1">Arrive 15 min early</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <h2 className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                Health & Swimming Requirements
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 not-prose mb-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    You CAN Participate If:
                  </h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      You are in good general health
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      You can swim (for water activities)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      You are at least 4 years old (with guardian)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      You can follow safety instructions
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      You are comfortable in open water
                    </li>
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Water Activities NOT Recommended If:
                  </h3>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      You cannot swim (life jackets available)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      You are pregnant
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      You have heart conditions or cardiovascular problems
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      You are under the influence of alcohol or drugs
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      You have open wounds or skin infections
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      You have ear infections
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">✗</span>
                      You have epilepsy or seizure disorders
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 not-prose mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">Medical Conditions - Please Inform Us</h3>
                    <p className="text-sm text-amber-700 mb-2">
                      If you have any of the following conditions, please inform our staff before water activities:
                    </p>
                    <ul className="text-sm text-amber-700 grid md:grid-cols-2 gap-1">
                      <li>• Asthma or breathing difficulties</li>
                      <li>• Diabetes</li>
                      <li>• High blood pressure</li>
                      <li>• Ear or sinus problems</li>
                      <li>• Fear of water or open sea</li>
                      <li>• Allergies to marine life</li>
                    </ul>
                    <p className="text-sm text-amber-700 mt-2">
                      <strong>Final determination of fitness to participate is at the discretion of our safety staff.</strong>
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="flex items-center gap-2">
                <Shirt className="w-6 h-6 text-primary" />
                What to Bring & Wear
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 not-prose mb-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <h3 className="font-semibold text-green-800 mb-3">Recommended</h3>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      <strong>Swimwear</strong> (wear under clothes or bring to change)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Reef-safe sunscreen (SPF 30+)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Sunglasses with strap
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Hat or cap
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Water shoes or sandals
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Towel and change of clothes
                    </li>
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <h3 className="font-semibold text-red-800 mb-3">Not Recommended</h3>
                  <ul className="space-y-2 text-sm text-red-700">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      Expensive jewelry or watches
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      Non-waterproof electronics
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      Heavy makeup or cosmetics
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      Non-reef-safe sunscreen
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-500 mt-0.5" />
                      Large amounts of cash
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="flex items-center gap-2">
                <Umbrella className="w-6 h-6 text-blue-500" />
                Weather & Sea Conditions
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4 not-prose mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                  <Sun className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800 mb-1">Sunny/Calm Sea</h3>
                  <p className="text-xs text-blue-700">Perfect conditions. All activities available.</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                  <Wind className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-amber-800 mb-1">Rough Sea/Rain</h3>
                  <p className="text-xs text-amber-700">Some water activities may be limited.</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-red-800 mb-1">Storm Warning</h3>
                  <p className="text-xs text-red-700">Boat trips cancelled. Full refund or reschedule.</p>
                </div>
              </div>

              <p>
                We monitor weather and sea conditions closely. During monsoon season (May-October), 
                conditions can change quickly. We prioritize your safety and will cancel or 
                reschedule if conditions are unsafe for boat travel.
              </p>

              <h2 className="flex items-center gap-2">
                <Camera className="w-6 h-6 text-purple-500" />
                Personal Belongings
              </h2>
              
              <ul>
                <li><strong>Waterproof Bags:</strong> Available for rent to protect your belongings</li>
                <li><strong>Phones/Cameras:</strong> Use waterproof cases or pouches for water activities</li>
                <li><strong>Glasses:</strong> Use straps to secure sunglasses and prescription glasses</li>
                <li><strong>Valuables:</strong> We recommend leaving valuables at your hotel</li>
              </ul>
              
              <div className="bg-slate-100 rounded-xl p-4 not-prose">
                <p className="text-sm text-slate-600">
                  <strong>Note:</strong> Banana Beach is not responsible for lost, damaged, 
                  or stolen personal items. Please secure your belongings.
                </p>
              </div>

              <h2 className="flex items-center gap-2">
                <Sun className="w-6 h-6 text-amber-500" />
                Tips for a Great Beach Day
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 not-prose mb-8">
                <div className="bg-slate-50 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">Before You Arrive</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Apply reef-safe sunscreen before departure</li>
                    <li>• Eat a light breakfast</li>
                    <li>• Stay hydrated</li>
                    <li>• Bring motion sickness medication if needed</li>
                    <li>• Wear swimwear under your clothes</li>
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">During Your Visit</h3>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Reapply sunscreen every 2 hours</li>
                    <li>• Stay hydrated (water available)</li>
                    <li>• Follow lifeguard instructions</li>
                    <li>• Don&apos;t touch or stand on coral</li>
                    <li>• Enjoy the crystal clear waters!</li>
                  </ul>
                </div>
              </div>

              <h2>Our Safety Standards</h2>
              <p>
                At Banana Beach, safety is our top priority. Our commitment includes:
              </p>
              <ul>
                <li><strong>Licensed Boats:</strong> All speedboats are licensed and regularly inspected</li>
                <li><strong>Trained Crew:</strong> Experienced boat captains and certified lifeguards on duty</li>
                <li><strong>Safety Equipment:</strong> Life jackets, first aid kits, and emergency equipment on all boats</li>
                <li><strong>Insurance:</strong> Comprehensive insurance coverage for all guests</li>
                <li><strong>Emergency Procedures:</strong> Direct communication with coast guard and emergency services</li>
              </ul>

              <h2>Questions?</h2>
              <p>
                If you have any questions about safety requirements or whether you can 
                participate, please contact us before booking:
              </p>
              <ul>
                <li>Email: relax@bananabeachkohhey.com</li>
                <li>Phone: 081 416 7555</li>
                <li>WhatsApp: 081 416 7555</li>
              </ul>
            </div>
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}
