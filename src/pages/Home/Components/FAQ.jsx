const faqData = [
  {
    question: "What is ACS Future School?",
    answer: "ACS Future School is an online education platform that offers high-quality courses from industry experts across various subjects.",
  },
  {
    question: "Are the courses free or paid?",
    answer: "We offer both free and paid courses. You can filter them based on your preference while browsing.",
  },
  {
    question: "Will I get a certificate after completing a course?",
    answer: "Yes! You will receive a certificate after successfully completing any of our certified courses.",
  },
  {
    question: "How do I join live classes?",
    answer: "You can join live classes from your dashboard. Just go to the 'Live Classes' section and click the join button.",
  },
];

const FAQ = () => {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

        <div className="join join-vertical w-full space-y-2">
          {faqData.map((faq, index) => (
            <div key={index} className="collapse collapse-arrow bg-base-100 dark:bg-gray-700 rounded-box">
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-lg font-medium">
                {faq.question}
              </div>
              <div className="collapse-content text-gray-600">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
