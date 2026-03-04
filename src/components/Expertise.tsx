'use client';

export default function Expertise() {
    const skills = [
        { icon: 'ri-reactjs-fill', name: 'React' },
        { icon: 'ri-nextjs-fill', name: 'Next.js' },
        { icon: 'ri-javascript-fill', name: 'JS (ES6+)' },
        { icon: 'ri-html5-fill', name: 'HTML5' },
        { icon: 'ri-window-fill', name: 'Webflow' },
        { icon: 'ri-layout-masonry-fill', name: 'Tilda Pro' },
        { icon: 'ri-server-fill', name: 'REST API' },
        { icon: 'ri-git-merge-fill', name: 'Git' }
    ];

    return (
        <section id="expertise" className="grid grid-cols-1 md:grid-cols-12 gap-0 grid-border bg-white dark:bg-black scroll-mt-8 fade-in-section overflow-hidden">
            <div className="col-span-1 md:col-span-12 p-6 md:p-12">
                <h2 className="text-2xl font-bold uppercase mb-12 tracking-tighter">Core Expertise</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex flex-col items-center gap-4 group">
                            <i className={`${skill.icon} text-6xl group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300`}></i>
                            <span className="text-xs font-bold uppercase tracking-widest">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
