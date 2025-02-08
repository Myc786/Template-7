const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8 border-t border-gray-300">
      <div className="container mx-auto px-6">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="max-w-sm">
            <h2 className="text-2xl font-bold text-indigo-600">MORENT</h2>
            <p className="mt-2 text-gray-500">
              Our vision is to provide convenience and help increase your sales business.
            </p>
          </div>

          {/* Middle Sections */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-16">
            {/* About */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">About</h3>
              <ul className="mt-2 space-y-1">
                <li><a href="#" className="hover:text-indigo-600">How it works</a></li>
                <li><a href="#" className="hover:text-indigo-600">Featured</a></li>
                <li><a href="#" className="hover:text-indigo-600">Partnership</a></li>
                <li><a href="#" className="hover:text-indigo-600">Business Relation</a></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Community</h3>
              <ul className="mt-2 space-y-1">
                <li><a href="#" className="hover:text-indigo-600">Events</a></li>
                <li><a href="#" className="hover:text-indigo-600">Blogs</a></li>
                <li><a href="#" className="hover:text-indigo-600">Podcast</a></li>
                <li><a href="#" className="hover:text-indigo-600">Invite a Friend</a></li>
              </ul>
            </div>
          </div>

          {/* Socials Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Socials</h3>
            <div className="flex space-x-4">
              {/* Social Icons */}
              <a href="#" className="text-gray-600 hover:text-indigo-600"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-600 hover:text-indigo-600"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-600 hover:text-indigo-600"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="text-gray-600 hover:text-indigo-600"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-6 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2024 MORENT. All Rights Reserved</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;