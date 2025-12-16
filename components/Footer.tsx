
import React from 'react';
import { Instagram, Twitter, Linkedin, Github, Mail, Facebook, Send } from 'lucide-react';
import { SocialLink } from '../types';
import InteractiveCat from './InteractiveCat';
import { useLanguage } from '../LanguageContext';

const iconMap: Record<string, React.ComponentType<any>> = {
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Facebook,
  Telegram: Send // Using Send icon for Telegram as it resembles the paper plane logo
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { profile } = useLanguage();

  return (
    <footer id="contact" className="bg-neutral-50 dark:bg-neutral-950 py-6 md:pt-8 md:pb-6 border-t border-neutral-300 dark:border-neutral-900 transition-colors duration-300">
      <div className="w-full px-4 md:px-12">
        
        {/* Main Footer Area with Cat */}
        <div className="flex flex-row justify-between items-end mb-6 md:mb-8 gap-2 md:gap-8">
          
          {/* Contact Info Left */}
          <div className="flex flex-col items-start">
            <h3 className="text-2xl md:text-5xl font-semibold text-neutral-900 dark:text-white mb-4 md:mb-6 transition-colors">Let's work together.</h3>
            
            <div className="flex flex-wrap items-center gap-y-4 gap-x-6">
              <a 
                href={`mailto:${profile.email}`} 
                className="text-lg md:text-xl text-neutral-800 dark:text-neutral-400 hover:text-black dark:hover:text-white border-b border-neutral-400 dark:border-neutral-800 hover:border-black dark:hover:border-white pb-1 transition-all"
              >
                {profile.email}
              </a>

              <div className="flex gap-2">
                {profile.socials.map((social: SocialLink) => {
                  const Icon = iconMap[social.iconName] || Mail;
                  return (
                    <a 
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                      aria-label={social.platform}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          
            <div className="relative flex-shrink-0 z-10 translate-y-[30px] md:translate-y-[44px]">
                <InteractiveCat />
            </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-4 md:pt-6 border-t border-neutral-300 dark:border-neutral-900 text-neutral-600 dark:text-neutral-600 text-xs md:text-sm transition-colors">
          <p>&copy; {currentYear} {profile.name}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
