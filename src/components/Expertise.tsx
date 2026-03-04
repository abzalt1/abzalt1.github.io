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
        <section id="expertise" className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24 scroll-mt-8 fade-in-section">
            <hr className="swiss-divider mb-12 md:mb-16" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                {/* Left: heading */}
                <div className="md:col-span-4">
                    <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-none">
                        Core<br />Expertise
                    </h2>
                </div>

                {/* Right: skill grid */}
                <div className="md:col-span-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                        {skills.map((skill, index) => (
                            <div key={index} className="flex flex-col items-start gap-3">
                                <i className={`${skill.icon} text-3xl md:text-4xl`}></i>
                                <span className="text-xs font-bold uppercase tracking-widest opacity-70">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
