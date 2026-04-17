import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
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
      // Les identifiants doivent être configurés via des variables d'environnement
      // ou remplacés directement par vos clés EmailJS.
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
      // Réinitialiser le statut après quelques secondes
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-dbz-light dark:bg-dbz-dark transition-colors duration-300 relative">
      <div className="absolute inset-0 halftone opacity-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-4 uppercase italic transform -skew-x-6 drop-shadow-[4px_4px_0px_#F85B1A]">
            {t('sections.contact')}
          </h2>
          <p className="text-xl text-slate-800 dark:text-slate-200 max-w-2xl mx-auto font-bold uppercase italic">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="manga-card p-6 border-dbz-blue">
              <div className="flex items-start gap-4">
                <div className="p-4 border-2 border-black dark:border-white bg-dbz-blue text-white shadow-manga">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-black dark:text-white mb-1 uppercase italic">{t('contact.email_label')}</h3>
                  <p className="text-slate-800 dark:text-slate-300 font-bold">{portfolioData.email}</p>
                </div>
              </div>
            </div>

            <div className="manga-card p-6 border-dbz-orange">
              <div className="flex items-start gap-4">
                <div className="p-4 border-2 border-black dark:border-white bg-dbz-orange text-white shadow-manga">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-black dark:text-white mb-1 uppercase italic">{t('contact.radar_label')}</h3>
                  <div className="flex gap-4 mt-2">
                    {portfolioData.socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="p-2 border-2 border-black dark:border-white bg-dbz-yellow text-black hover:bg-dbz-orange transition-all shadow-manga"
                        aria-label={social.name}
                      >
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="manga-card p-8 space-y-4 border-black dark:border-white"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="user_name" className="block text-sm font-black text-black dark:text-white mb-2 uppercase italic tracking-widest">{t('contact.form.name')}</label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                className="w-full px-4 py-3 border-4 border-black dark:border-white bg-slate-50 dark:bg-slate-800 text-black dark:text-white focus:bg-dbz-yellow focus:text-black outline-none transition-all font-bold"
                placeholder={t('contact.form.name_placeholder')}
              />
            </div>
            <div>
              <label htmlFor="user_email" className="block text-sm font-black text-black dark:text-white mb-2 uppercase italic tracking-widest">{t('contact.form.email')}</label>
              <input
                type="email"
                id="user_email"
                name="user_email"
                required
                className="w-full px-4 py-3 border-4 border-black dark:border-white bg-slate-50 dark:bg-slate-800 text-black dark:text-white focus:bg-dbz-yellow focus:text-black outline-none transition-all font-bold"
                placeholder={t('contact.form.email_placeholder')}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-black text-black dark:text-white mb-2 uppercase italic tracking-widest">{t('contact.form.message')}</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-3 border-4 border-black dark:border-white bg-slate-50 dark:bg-slate-800 text-black dark:text-white focus:bg-dbz-yellow focus:text-black outline-none transition-all font-bold"
                placeholder={t('contact.form.message_placeholder')}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className={`w-full py-4 font-black text-2xl border-4 border-black dark:border-white shadow-manga transition-all flex items-center justify-center gap-2 group uppercase italic transform active:translate-y-1 active:shadow-manga disabled:opacity-70 disabled:cursor-not-allowed ${
                status === 'success' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : status === 'error' 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-dbz-orange hover:bg-dbz-blue'
              } text-white`}
            >
              {isSending ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  {t('contact.form.sending', 'ENVOI...')}
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle size={24} />
                  {t('contact.form.success', 'ENVOYÉ !')}
                </>
              ) : status === 'error' ? (
                <>
                  <AlertCircle size={24} />
                  {t('contact.form.error', 'ERREUR')}
                </>
              ) : (
                <>
                  {t('contact.form.submit')}
                  <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
