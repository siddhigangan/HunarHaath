import React from "react";

const faqs = [
  {
    question: "What is HunarHaath?",
    answer:
      "HunarHaath is an online marketplace connecting artisans with customers worldwide, offering unique handcrafted products.",
  },
  {
    question: "How do I register as a seller?",
    answer:
      "Click on 'Sell on HunarHaath' , sign up with your details, and upload your product images to start selling.",
  },
  {
    question: "Is there a registration fee for sellers?",
    answer:
      "No, registering as a seller is free.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Since our products are handmade, we only accept returns for damaged or incorrect items.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us via email at 'hunarhaathh@gmail.com' or through our Contact Us page.",
  },
  {
    question: "Can I sell multiple types of handicrafts?",
    answer:
        "Yes, you can list multiple products from different categories as long as they meet our guidelines."
  },
];

export default function Faqs() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-serif text-craft-forest mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <h2 className="text-lg font-semibold text-craft-forest">{faq.question}</h2>
            <p className="text-gray-700 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
