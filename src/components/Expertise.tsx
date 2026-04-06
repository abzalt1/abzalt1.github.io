'use client';

export default function Expertise() {
    const skills = [
        { icon: 'ri-reactjs-fill', name: 'React' },
        { icon: 'ri-nextjs-fill', name: 'Next.js' },
        { icon: 'ri-javascript-fill', name: 'JS (ES6+)' },
        { icon: 'ri-tailwind-css-fill', name: 'Tailwind CSS' },
        { icon: 'ri-window-fill', name: 'Webflow' },
        { icon: 'ri-layout-masonry-fill', name: 'Tilda Pro' },
        { icon: 'ri-server-fill', name: 'API Integrations' },
        { icon: 'ri-triangle-fill', name: 'Vercel' },
        { icon: 'ri-git-merge-fill', name: 'Git' }
    ];

    return (
        <section id="expertise" className="grid grid-cols-1 md:grid-cols-12 gap-0 grid-border bg-white dark:bg-black scroll-mt-8 fade-in-section overflow-hidden">
            <div className="col-span-1 md:col-span-12 p-10 md:p-20">
                <h2 className="text-2xl font-bold uppercase mb-16 tracking-tighter">Core Expertise</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16 md:gap-16 text-center justify-items-center">
                    {skills.map((skill, index) => (
                        <div 
                            key={index} 
                            className={`flex flex-col items-center gap-4 group ${
                                index === skills.length - 1 ? 'col-span-2 md:col-span-1' : ''
                            }`}
                        >
                            <i className={`${skill.icon} text-6xl group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300`}></i>
                            <span className="text-xs font-bold uppercase tracking-widest">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
