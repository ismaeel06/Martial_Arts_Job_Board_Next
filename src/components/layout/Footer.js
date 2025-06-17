import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/icon.svg"
                alt="MartialArtsJobsBoard.com"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="font-bold text-xl">MartialArtsJobsBoard</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Where Schools Hire & Instructors Find Work
            </p>
            <Link 
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-block"
            >
              <Image
                src="/instagram-icon.svg"
                alt="Follow us on Instagram"
                width={34}
                height={34}
              />
            </Link>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/find-jobs" className="text-gray-400 hover:text-[#D88A22] transition-colors">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link href="/post-job" className="text-gray-400 hover:text-[#D88A22] transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-[#D88A22] transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#D88A22] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#D88A22] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-[#D88A22] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-[#D88A22] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-8">
          <p className="text-center text-gray-500">
            © {currentYear} MartialArtsJobsBoard.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
