import { BiLogoTelegram } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";

const Newsletter = () => {
  return (
     <div className="max-w-3xl mx-auto text-center px-4 border-2 rounded py-12 my-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Stay Updated!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Subscribe to our newsletter and never miss new courses, updates, and
          special offers.
        </p>

        <form>
          <div className="w-3/4 mx-auto flex items-center pl-3 justify-between rounded-md border border-primary">
          <MdOutlineMailOutline size={24}/>
            <input
              type="email"
              placeholder="Enter your email"
              className="focus:outline-none w-full mx-2"
              required
            />
            <button
              type="submit"
              className="px-4 py-3 bg-primary flex items-center gap-2 text-white font-semibold rounded-r-md hover:bg-primary/90 transition"
            >
              Subscribe <BiLogoTelegram/>
            </button>
          </div>
        </form>
      </div>
  );
};

export default Newsletter;
