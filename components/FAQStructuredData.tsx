import React from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQStructuredDataProps {
    faqs?: FAQItem[];
}

const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({ faqs }) => {
    const defaultFAQs: FAQItem[] = [
        {
            question: "How to register Muslim marriage online in West Bengal?",
            answer: "Visit mmrburwan.com, create an account, fill the online application form with groom and bride details, upload required documents (Aadhaar card, age proof, joint photo), and submit. You'll receive an acknowledgement slip. Visit the office with original documents for final registration."
        },
        {
            question: "What documents are required for nikah registration in Murshidabad?",
            answer: "Required documents: 1) Aadhaar cards of both bride and groom, 2) Age proof (10th admit card or voter ID), 3) Three copies of joint colored passport size photos, 4) Printed acknowledgement slip from online application."
        },
        {
            question: "How long does Muslim marriage registration take?",
            answer: "Online application can be completed in 15-20 minutes. After submitting documents at the office, same-day registration is available. Certificate is issued immediately upon verification."
        },
        {
            question: "What is the fee for nikah registration in Burwan?",
            answer: "Please contact the office at +91-9732688698 or +91-9647724532 for current fee structure and payment details."
        },
        {
            question: "Is nikah registration mandatory in West Bengal?",
            answer: "Yes, Muslim marriage registration is legally required in West Bengal under the Muslim Marriage Registration Act. It provides legal proof of marriage and is essential for various official purposes."
        },
        {
            question: "Which areas does MMR Burwan serve?",
            answer: "MMR Burwan serves all 21 blocks of Murshidabad district including Burwan, Berhampore, Farakka, Raghunathganj, Sagardighi, Samserganj, Suti, Beldanga, Hariharpara, Naoda, Bharatpur, Kandi, Khargram, Bhagawangola, Jiaganj, Lalgola, Nabagram, Domkal, Jalangi, and Raninagar."
        },
        {
            question: "Can I download my nikah certificate online?",
            answer: "Yes, once your marriage is registered and certificate is issued, you can download it from your dashboard at mmrburwan.com. You can also verify any certificate using the verification feature."
        },
        {
            question: "What is a nikah nama?",
            answer: "Nikah nama is the official Islamic marriage contract document. It contains details of the bride, groom, witnesses, mahr (dower), and other marriage terms. MMR Burwan provides government-approved nikah nama as part of the registration process."
        }
    ];

    const faqData = faqs || defaultFAQs;

    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default FAQStructuredData;
