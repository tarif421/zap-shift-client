import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiArrowUpRight } from "react-icons/fi";

const Faq = () => {
  // প্রথম FAQ টি ডিফল্টভাবে ওপেন থাকবে
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does this posture corrector work?",
      answer:
        "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders.",
    },
    {
      question: "Is it suitable for all ages and body types?",
      answer:
        "Yes, our product is designed with adjustable straps to comfortably fit various body types and can be used by individuals of different age groups seeking posture support.",
    },
    {
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "Regular use helps alleviate strain on your back muscles, reduces slouching, and trains your body to maintain natural spinal alignment over time.",
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer:
        "This model focuses on ergonomic support and physical alignment. Please check specific product variants if you are looking for electronic sensor features.",
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer:
        "You can sign up with your email address on our notification prompt to receive an instant alert as soon as the item is available.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#f3f4f6] py-16 px-4">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003b36] mb-3">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      {/* FAQ Accordion List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-300 border ${
                isOpen
                  ? "bg-white border-[#00665d]/40 shadow-md"
                  : "bg-white border-transparent shadow-sm hover:border-gray-200"
              }`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="font-bold text-[#003b36] text-base md:text-lg">
                  {faq.question}
                </span>
                <span className="text-[#003b36] text-xl ml-4">
                  {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </button>

              {/* Answer Content */}
              {isOpen && (
                <div className="px-6 pb-6 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* See More FAQ's Button */}
      <div className="max-w-3xl mx-auto flex justify-center  mt-10">
        <button className="flex items-center gap-3 bg-[#bbf7d0] text-[#003b36] font-semibold px-6 py-3.5 rounded-full shadow hover:bg-[#a3f4c0] transition duration-300">
          <span>See More FAQ's</span>
          <span className="w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center text-sm">
            <FiArrowUpRight />
          </span>
        </button>
      </div>
    </section>
  );
};

export default Faq;