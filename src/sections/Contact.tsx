import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Share2, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);
    setStatus('idle');

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id',
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key'
      );

      setStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-medium uppercase tracking-wider text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800/60 px-3.5 py-1 rounded-full mb-3 inline-block"
          >
            &gt; ./contact --open-channel
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-4 tracking-tight"
          >
            {t('sections.contact')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-600 dark:text-stone-400 max-w-xl mx-auto text-base sm:text-lg"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-start">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-4 font-mono"
          >
            <div className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-stone-200/90 dark:border-stone-800">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200/50 dark:border-orange-800/50">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">
                    // {t('contact.email_label')}
                  </h3>
                  <a 
                    href={`mailto:${portfolioData.email}`}
                    className="text-sm sm:text-base font-bold text-stone-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1 group font-mono"
                  >
                    <span>{portfolioData.email}</span>
                    <ArrowUpRight size={16} className="text-stone-400 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-stone-200/90 dark:border-stone-800">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50">
                  <Share2 size={22} />
                </div>
                <div className="w-full">
                  <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
                    // {t('contact.social_label')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-white dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700 hover:border-orange-500/40 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm"
                        aria-label={social.name}
                      >
                        <social.icon size={13} />
                        <span>{social.name.toLowerCase()}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form with Terminal Window Styling */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 glass-card rounded-2xl shadow-sm overflow-hidden border border-stone-200/90 dark:border-stone-800"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-stone-100/90 dark:bg-stone-900/90 border-b border-stone-200/80 dark:border-stone-800/80 font-mono text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span>
              </div>
              <span>send_message.sh</span>
              <span className="text-[10px] text-orange-600 dark:text-orange-400 font-bold">POST</span>
            </div>

            <form
              ref={formRef}
              className="p-6 sm:p-8 space-y-4"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="user_name" className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                  <span className="text-orange-500 mr-1">&gt;</span>{t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 text-stone-900 dark:text-white placeholder-stone-400 text-sm font-mono focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder={t('contact.form.name_placeholder')}
                />
              </div>

              <div>
                <label htmlFor="user_email" className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                  <span className="text-orange-500 mr-1">&gt;</span>{t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 text-stone-900 dark:text-white placeholder-stone-400 text-sm font-mono focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  placeholder={t('contact.form.email_placeholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 uppercase tracking-wider mb-2">
                  <span className="text-orange-500 mr-1">&gt;</span>{t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white/80 dark:bg-stone-900/80 text-stone-900 dark:text-white placeholder-stone-400 text-sm font-mono focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder={t('contact.form.message_placeholder')}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`w-full py-3.5 px-6 rounded-xl font-mono font-semibold text-xs sm:text-sm shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                  status === 'success' 
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20' 
                    : status === 'error' 
                      ? 'bg-rose-600 text-white shadow-rose-500/20' 
                      : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5'
                }`}
              >
                {isSending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>$ {t('contact.form.sending')}</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>$ {t('contact.form.success')}</span>
                  </>
                ) : status === 'error' ? (
                  <>
                    <AlertCircle size={16} />
                    <span>$ {t('contact.form.error')}</span>
                  </>
                ) : (
                  <>
                    <span>$ {t('contact.form.submit')}</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

