"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Feature {
    text: string;
    icon: string;
    available: boolean;
}

interface Plan {
    id: string;
    name: string;
    price: string;
    period: string;
    popular: boolean;
    features: Feature[];
    buttonText: string;
}

export default function Pricing() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const plans: Plan[] = [
        {
            id: 'basic',
            name: 'Basic',
            price: '$100',
            period: 'One-Time Payment',
            popular: false,
            features: [
                { text: 'Full Source Code', icon: '✅', available: true },
                { text: 'Self-Hosted (Run it yourself)', icon: '✅', available: true },
                { text: 'Pay OpenAI API separately', icon: '⚠️', available: true },
                { text: 'No server setup or support', icon: '❌', available: false }
            ],
            buttonText: 'Get Started'
        },
        {
            id: 'pro',
            name: 'Pro',
            price: '$150',
            period: 'One-Time Payment',
            popular: true,
            features: [
                { text: 'Full Source Code', icon: '✅', available: true },
                { text: 'We set up & deploy everything for you', icon: '✅', available: true },
                { text: 'Runs on your PC or server (self-hosted)', icon: '✅', available: true },
                { text: 'You pay OpenAI API separately', icon: '⚠️', available: true }
            ],
            buttonText: 'Get Pro'
        },
        {
            id: 'cloud',
            name: 'Cloud',
            price: '$20',
            period: 'Per Month',
            popular: false,
            features: [
                { text: 'Hosted on Our Server', icon: '✅', available: true },
                { text: 'No Setup Required', icon: '✅', available: true },
                { text: 'Just Pay & Use', icon: '✅', available: true },
                { text: 'No Source Code Access', icon: '❌', available: false }
            ],
            buttonText: 'Subscribe'
        }
    ];

    const handleCardHover = (planId: string): void => {
        setHoveredCard(planId);
    };

    const handleCardLeave = (): void => {
        setHoveredCard(null);
    };

    const handleButtonClick = (planId: string): void => {
        alert("Join Waitlist and we will contact you soon!")
    };


    return (
        // <section className="bg-gray-50 py-20 px-6 mt-16" id="pricing">
        //     <div className="max-w-6xl mx-auto">
        //         {/* Header */}
        //         <div className="text-center mb-16">
        //             <h2 className="text-5xl font-bold text-gray-900 mb-6">
        //                 Simple, Transparent Pricing
        //             </h2>
        //             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        //                 Choose the plan that fits your needs. No hidden fees, just straightforward pricing.
        //             </p>
        //         </div>

        //         {/* Pricing Cards */}
        //         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        //             {plans.map((plan: Plan) => (
        //                 <div
        //                     key={plan.id}
        //                     className={`relative transition-all duration-300 ${plan.popular ? 'md:scale-105' : ''
        //                         }`}
        //                     onMouseEnter={() => handleCardHover(plan.id)}
        //                     onMouseLeave={handleCardLeave}
        //                 >
        //                     {/* Popular Badge */}
        //                     {plan.popular && (
        //                         <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
        //                             <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
        //                                 Most Popular
        //                             </div>
        //                         </div>
        //                     )}

        //                     {/* Card */}
        //                     <div className={`
        //         relative h-full bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300
        //         ${plan.popular
        //                             ? 'border-purple-200 shadow-purple-100'
        //                             : 'border-gray-100 hover:border-gray-200'
        //                         }
        //         ${hoveredCard === plan.id
        //                             ? 'shadow-2xl -translate-y-2'
        //                             : 'hover:shadow-xl hover:-translate-y-1'
        //                         }
        //       `}>

        //                         {/* Plan Header */}
        //                         <div className="text-center mb-8">
        //                             <h3 className="text-2xl font-bold text-gray-900 mb-4">
        //                                 {plan.name}
        //                             </h3>
        //                             <div className="mb-2">
        //                                 <span className={`text-5xl font-bold ${plan.popular ? 'text-purple-600' : 'text-gray-900'
        //                                     }`}>
        //                                     {plan.price}
        //                                 </span>
        //                             </div>
        //                             <p className="text-gray-500 font-medium">
        //                                 {plan.period}
        //                             </p>
        //                         </div>

        //                         {/* Features */}
        //                         <ul className="space-y-4 mb-8">
        //                             {plan.features.map((feature: Feature, index: number) => (
        //                                 <li key={index} className="flex items-start gap-3">
        //                                     <span className="text-lg flex-shrink-0 mt-0.5">
        //                                         {feature.icon}
        //                                     </span>
        //                                     <span className={`text-gray-700 leading-relaxed ${feature.available ? '' : 'text-gray-500'
        //                                         }`}>
        //                                         {feature.text}
        //                                     </span>
        //                                 </li>
        //                             ))}
        //                         </ul>

        //                         {/* CTA Button */}
        //                         <button
        //                             onClick={() => handleButtonClick(plan.id)}
        //                             className={`
        //             w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 cursor-pointer
        //             ${plan.popular
        //                                     ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
        //                                     : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
        //                                 }
        //             ${hoveredCard === plan.id ? 'scale-105' : ''}
        //             active:scale-95
        //           `}
        //                         >
        //                             {plan.buttonText}
        //                         </button>

        //                         {/* Subtle Glow Effect for Popular Plan */}
        //                         {plan.popular && (
        //                             <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 rounded-2xl -z-10 transition-opacity duration-300" />
        //                         )}
        //                     </div>
        //                 </div>
        //             ))}
        //         </div>

        //         {/* Bottom CTA */}
        //         <div className="text-center mt-16">
        //             <p className="text-gray-600 mb-6 text-lg">
        //                 Need a custom solution? We're here to help.
        //             </p>
        //             <Link href="/contact">
        //                 <button
        //                     className="bg-white cursor-pointer text-gray-900 px-8 py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
        //                 >
        //                     Contact Sales
        //                 </button>
        //             </Link>
        //         </div>
        //     </div>
        // </section>
        <section className='h-screen flex items-center justify-center'>
            <h1 className='text-2xl font-bold'>Coming Soon!</h1>
        </section>
    );
}
