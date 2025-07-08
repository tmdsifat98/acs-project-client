// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Sadia Khan",
    image: "https://i.pravatar.cc/100?img=1",
    rating: 5,
    review: "This platform helped me a lot! The courses are high quality and instructors are very friendly.",
  },
  {
    name: "Rahim Uddin",
    image: "https://i.pravatar.cc/100?img=2",
    rating: 4,
    review: "The UI is clean and easy to navigate. Loved the overall experience.",
  },
  {
    name: "Fatema Akter",
    image: "https://i.pravatar.cc/100?img=3",
    rating: 5,
    review: "Awesome platform! Live classes are very interactive.",
  },
];

const StudentReview = () => {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Students Say</h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 4000 }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mx-auto max-w-xl">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold">{review.name}</h3>
                <div className="text-yellow-400 my-2">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{review.review}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default StudentReview;
