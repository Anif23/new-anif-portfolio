import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Linkedin, Github, MessageCircle, MapPin, Send, Check, Clock } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { CONTACT } from '../../data/content';
import emailjs from "@emailjs/browser";

export function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const onSubmit = async (
    e: FormEvent
  ) => {

    e.preventDefault();

    try {
      setStatus("sending");
      await emailjs.send(

        import.meta.env
          .VITE_EMAIL_SERVICE_ID,

        import.meta.env
          .VITE_EMAIL_TEMPLATE_ID,

        {
          name:
            form.name,

          email:
            form.email,

          subject:
            form.subject,

          message:
            form.message
        },

        import.meta.env
          .VITE_EMAIL_PUBLIC_KEY

      );
      setStatus("sent");

      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

      setTimeout(() => {
        setStatus("idle");
      }, 3000)
    }
    catch (error) {
      console.log(error);
      setStatus("idle");
    }
  }

  const links = [
    { icon: Mail, label: t('contact.email_label'), href: `mailto:${CONTACT.email}`, value: CONTACT.email, color: '#3b82f6' },
    { icon: Linkedin, label: t('contact.linkedin_label'), href: CONTACT.linkedin, value: 'LinkedIn', color: '#0a66c2' },
    { icon: Github, label: t('contact.github_label'), href: CONTACT.github, value: 'GitHub', color: '#8b5cf6' },
    { icon: MessageCircle, label: t('contact.whatsapp_label'), href: CONTACT.whatsapp, value: 'WhatsApp', color: '#25d366' },
  ];

  return (
    <section id="contact" className="relative section-padding py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/15 blur-[100px]" />
      </div>

      <div className="container-max">
        <SectionHeading eyebrow="Get in Touch" title={t('contact.title')} subtitle={t('contact.subtitle')} />

        <div className="grid lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            <div className="glass-card rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-70" />
              <div className="relative">
                <span className="block w-3 h-3 rounded-full bg-green-500" />
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />
              </div>
              <div>
                <div className="text-sm font-semibold text-green-400">{t('contact.availability')}</div>
                <div className="text-xs text-[var(--text-secondary)]">{t('contact.availability_desc')}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-4 flex flex-col gap-2 group relative overflow-hidden"
                >
                  <div
                    className="absolute -top-8 -end-8 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-50 transition-opacity"
                    style={{ backgroundColor: link.color }}
                  />
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center glass"
                    style={{ color: link.color }}
                  >
                    <link.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                      {link.label}
                    </div>
                    <div className="text-sm font-medium truncate">{link.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="glass-card rounded-2xl p-4 flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                  {t('contact.location_label')}
                </div>
                <div>{t('contact.location_value')}</div>
              </div>
            </div>

            {/* <div className="glass-card rounded-2xl p-4 flex items-center gap-3 text-xs text-[var(--text-secondary)]">
              <Clock className="w-4 h-4 text-purple-400 shrink-0" />
              {t('contact.response_time')}
            </div> */}
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 glass-strong rounded-3xl p-6 sm:p-8 flex flex-col gap-4 relative overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70" />
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[var(--text-secondary)]">{t('contact.form_name')}</label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  required
                  type="text"
                  className="px-4 py-3 rounded-xl glass bg-transparent text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[var(--text-secondary)]">{t('contact.form_email')}</label>
                <input
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                  type="email"
                  className="px-4 py-3 rounded-xl glass bg-transparent text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                  placeholder="john@company.com"
                  dir="ltr"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[var(--text-secondary)]">{t('contact.form_subject')}</label>
              <input
                value={form.subject}
                onChange={(e) =>
                  setForm({ ...form, subject: e.target.value })
                }
                required
                type="text"
                className="px-4 py-3 rounded-xl glass bg-transparent text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
                placeholder="Job opportunity / Collaboration"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs font-medium text-[var(--text-secondary)]">{t('contact.form_message')}</label>
              <textarea
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                required
                rows={5}
                className="px-4 py-3 rounded-xl glass bg-transparent text-sm focus:ring-2 focus:ring-blue-500/50 outline-none transition-all resize-none flex-1"
                placeholder="Tell me about the opportunity..."
              />
            </div>
            <motion.button
              type="submit"
              disabled={status !== 'idle'}
              whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              className="shimmer-btn inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 disabled:opacity-70 transition-opacity"
            >
              {status === 'sent' ? (
                <>
                  <Check className="w-4 h-4" />
                  {t('contact.form_sent')}
                </>
              ) : status === 'sending' ? (
                <motion.span
                  className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <>
                  <Send className="w-4 h-4 rtl:-scale-x-100" />
                  {t('contact.form_send')}
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
