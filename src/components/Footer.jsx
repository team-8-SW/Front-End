import React from "react"; 
import { Link } from "react-router-dom";

import { IoIosHelpCircle,IoMdSettings } from "react-icons/io";
import { IoShieldHalf } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-[#00000099] py-6 mt-10 text-[12px]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Footer Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6">
          {/* Column 1 */}
          <div>
            <ul className="space-y-3">
              <li><Link to="https://about.linkedin.com" className="hover:underline">About</Link></li>
              <li><Link to="https://www.linkedin.com/legal/professional-community-policies" className="hover:underline">Professional Community Policies</Link></li>
              <li><Link to="https://www.linkedin.com/legal/privacy-policy" className="hover:underline">Privacy & Terms</Link></li>
              <li><Link to="https://business.linkedin.com/sales-solutions?trk=flagship_nav&veh=li-footer-lss-control&src=li-footer" className="hover:underline">Sales Solutions</Link></li>
              <li><Link to="https://about.linkedin.com/transparency" className="hover:underline">Safety Center</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <ul className="space-y-3">
              <li><Link to="https://www.linkedin.com/accessibility" className="hover:underline">Accessibility</Link></li>
              <li><Link to="https://careers.linkedin.com/" className="hover:underline">Careers</Link></li>
              <li><Link to="https://www.linkedin.com/help/linkedin/answer/a1342443/" className="hover:underline">Ad Choices</Link></li>
              <li><Link to="https://mobile.linkedin.com/" className="hover:underline">Mobile</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <ul className="space-y-3">
              <li><Link to="https://business.linkedin.com/talent-solutions?trk=flagship_nav&veh=li-footer-lts-control&src=li-footer" className="hover:underline">Talent Solutions</Link></li>
              <li><Link to="https://business.linkedin.com/marketing-solutions?trk=n_nav_lms_f&src=li-footer" className="hover:underline">Marketing Solutions</Link></li>
              <li><Link to="https://business.linkedin.com/marketing-solutions/ads?trk=n_nav_ads_f" className="hover:underline">Advertising</Link></li>
              <li><Link to="https://business.linkedin.com/small-business?&src=li-footer" className="hover:underline">Small Business</Link></li>
            </ul>
          </div>

          {/* Column 4 (Help & Settings) */}
          <div className="space-y-3 text-[14px]">
            <div className="flex items-center gap-2 text-[14px] text-[#00000099]">
              <IoIosHelpCircle size={20} />
              <div>
                <Link to="https://www.linkedin.com/help/linkedin?trk=d_flagship3_profile_view_base" className="hover:underline text-[#00000099] font-semibold">Questions?</Link>
                <p>Visit our Help Center</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <IoMdSettings size={20} />
              <div>
                <Link to="https://www.linkedin.com/mypreferences/d/categories/account" className="hover:underline text-[#00000099] font-semibold">Manage your account and privacy</Link>
                <p>Go to your Settings</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <IoShieldHalf size={20} />
              <div>
                <Link to="https://www.linkedin.com/help/linkedin/answer/a1339724" className="hover:underline text-[#00000099] font-semibold">Recommendation transparency</Link>
                <p>Learn more about Recommended Content</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 border-t pt-4">
          <p>LinkedIn Corporation © 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;