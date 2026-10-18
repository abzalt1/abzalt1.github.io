import type { StackItem } from '@/data/projects';

export default function StackList({ stack }: { stack: StackItem[] }) {
    return (
        <div className="w-full md:w-auto">
            <h4 className="text-xs font-semibold uppercase mb-3 tracking-widest opacity-50">Стек проекта</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-bold uppercase pb-2">
                {stack.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 group relative cursor-help w-fit">
                        <i className={`${item.icon} text-lg`}></i> {item.name}
                        <div className="absolute bottom-full left-0 md:left-1/2 md:-translate-x-1/2 mb-2 w-48 p-3 bg-black text-white text-xs font-medium normal-case shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20 text-center pointer-events-none">
                            {item.info}
                            <div className="absolute top-full left-4 md:left-1/2 md:-translate-x-1/2 -mt-1 border-4 border-transparent border-t-black "></div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
