'use client';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { href: 'https://t.me/abzalt1', label: 'Telegram', icon: 'ri-telegram-fill' },
        { href: 'https://wa.me/77081901222', label: 'WhatsApp', icon: 'ri-whatsapp-fill' },
        { href: 'https://instagram.com/abzalt1', label: 'Instagram', icon: 'ri-instagram-fill' },
    ];

    return (
        <footer className="max-w-7xl mx-auto px-6 md:px-16 py-8 md:py-12 relative z-10">
            <hr className="swiss-divider mb-8" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                {/* Left: copyright */}
                <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                    © {currentYear} abzalt1.dev
                </p>

                {/* Center: social links */}
                <div className="flex gap-6">
                    {socialLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity flex items-center gap-2"
                        >
                            <i className={`${link.icon} text-base`}></i>
                            <span className="hidden md:inline">{link.label}</span>
                        </a>
                    ))}
                </div>

                {/* Right: tagline */}
                <p className="text-xs font-bold uppercase tracking-widest opacity-40">
                    Almaty, KZ
                </p>
            </div>
        </footer>
    );
}
