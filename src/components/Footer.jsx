import Link from "next/link";
import {
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 px-6 md:px-16 py-14">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-gray-800">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Legal<span className="text-blue-500">Ease</span>
            </h2>

            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              LegalEase connects individuals and businesses with trusted legal
              professionals. Get expert guidance, legal consultation, and
              reliable representation tailored to your needs.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div>
                <h4 className="text-white text-xl font-bold">500+</h4>
                <p className="text-xs">Cases</p>
              </div>

              <div>
                <h4 className="text-white text-xl font-bold">50+</h4>
                <p className="text-xs">Lawyers</p>
              </div>

              <div>
                <h4 className="text-white text-xl font-bold">98%</h4>
                <p className="text-xs">Success</p>
              </div>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Practice Areas
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/family-law"
                  className="hover:text-white transition"
                >
                  Family Law
                </Link>
              </li>

              <li>
                <Link
                  href="/corporate-law"
                  className="hover:text-white transition"
                >
                  Corporate Law
                </Link>
              </li>

              <li>
                <Link
                  href="/property-law"
                  className="hover:text-white transition"
                >
                  Property Law
                </Link>
              </li>

              <li>
                <Link
                  href="/criminal-defense"
                  className="hover:text-white transition"
                >
                  Criminal Defense
                </Link>
              </li>

              <li>
                <Link
                  href="/immigration-law"
                  className="hover:text-white transition"
                >
                  Immigration Law
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/services" className="hover:text-white transition">
                  Services
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-white transition"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact Us
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-500" />
                <span>+880 1234-567890</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />
                <span>support@legalease.com</span>
              </div>

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/consultation"
              className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white text-sm font-medium transition"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6">
          <p className="text-sm text-gray-500">
            © 2026 <span className="text-white">LegalEase</span>. All rights
            reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-blue-600 text-white transition"
            >
              <FaTwitter size={16} />
            </a>

            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-blue-600 text-white transition"
            >
              <FaLinkedinIn size={16} />
            </a>

            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 hover:bg-blue-600 text-white transition"
            >
              <FaInstagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;