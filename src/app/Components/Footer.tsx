const Footer = () => {
    return (
      <footer className="bg-gray-100 text-gray-600 py-8 border-t border-gray-300">
        <div className="container mx-auto px-6">
          {/* Footer Content */}
          <div className="flex flex-col md:flex-row justify-between gap-8">
            {/* Left Section */}
            <div className="max-w-sm">
              <h2 className="text-2xl font-bold text-indigo-600">MORENT</h2>
              <p className="mt-2 text-gray-500">
                Our vision is to provide convenience and help increase your sales
                business.
              </p>
            </div>
  
            {/* Middle Section */}
            <div className="grid grid-cols-2 gap-8 md:gap-16 md:flex md:space-x-16">
              {/* About */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">About</h3>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      How it works
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      Featured
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      Partnership
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      Business Relation
                    </a>
                  </li>
                </ul>
              </div>
  
              {/* Community */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Community</h3>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      Events
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      Podcast
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      Invite a friend
                    </a>
                  </li>
                </ul>
              </div>
  
              {/* Socials */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Socials</h3>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      Discord
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-indigo-600">
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          {/* Footer Bottom */}
          <div className="border-t border-gray-300 mt-8 pt-6 text-sm flex flex-col md:flex-row justify-between">
            <p>©2022 MORENT. All rights reserved</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-indigo-600">
                Privacy & Policy
              </a>
              <a href="#" className="hover:text-indigo-600">
                Terms & Condition
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  