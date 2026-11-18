import type { Project } from './projects';

// English copy for each case. Fields left out fall back to the Russian original;
// `stackInfo` follows the order of the project's `stack`.
export type ProjectTranslation = Partial<Pick<Project, 'category' | 'description' | 'result' | 'tasks' | 'challenge' | 'linkLabel'>> & {
    stackInfo?: string[];
};

export const projectsEn: Record<string, ProjectTranslation> = {
    'fabrika-erp': {
        category: 'ERP system / Food production',
        description: 'Custom ERP for a bakery and ready-meal kitchen: coffee-shop orders, production planning, multi-warehouse inventory, recipe cards, invoices, couriers and real-time margin.',
        result: 'A custom ERP for a bakery and ready-meal kitchen in Astana replaced an off-the-shelf system and order-taking over WhatsApp. The whole cycle, from a coffee shop placing an order to flour leaving the warehouse, now runs in one system: orders turn into a production plan automatically, ingredients are written off by recipe cards, and the owner sees revenue, cost and margin in real time.',
        tasks: [
            'Role-based PWA: separate interfaces for coffee-shop managers, the kitchen, couriers, the accountant and admins, with flexible permissions.',
            'Order intake with cut-offs: the main order for tomorrow closes at 22:00, plus urgent same-day top-ups, with server-side time checks in the local timezone.',
            'Production plan: an automatic daily summary of items across all orders for the kitchen, and order tracking from “In preparation” to “Delivered”.',
            'Inventory: stock across several warehouses, goods receipts, transfers, stock-takes and write-offs, with printing and Excel export for audits.',
            'Recipe cards: the composition of every product and semi-finished item, so raw materials are written off automatically based on actual orders.',
            'Financial reporting: reconciliation statements with customers and suppliers, stock movement, and a cost-vs-revenue report with margin.',
            'Documents: bulk printing of invoices on 58/80 mm receipt printers and A4 summaries via server-side PDF generation.',
            'Courier module: a daily delivery route and photo proof of handover, with automatic image compression.',
            'Production infrastructure: own VPS, zero-downtime blue/green deploys, a watchdog, automatic backups and external uptime monitoring.',
        ],
        challenge: 'The kitchen supplies baked goods and ready meals to 50+ outlets. Accounting ran in a boxed system, orders came in over WhatsApp, and there was no reporting on deliveries at all. The boxed software was built for everyone at once, and bending the kitchen’s workflow around it was painful. The owner needed a tool that fits exactly how this business works.',
        stackInfo: [
            'App Router, Server Actions and a standalone build for a self-hosted server.',
            'PostgreSQL + Auth + Row Level Security for role-based access.',
            'Responsive admin panel and mobile accounts.',
            'Installable on phones, offline mode and push notifications for orders.',
            'Storage for product photos and courier photo reports.',
            'Server-side generation of invoices and reports for printing.',
            'Self-hosted, blue/green deploys via systemd and rate limiting in nginx.',
        ],
    },
    'pastry-studio': {
        category: 'B2B portal / Food production',
        description: 'Wholesale B2B ordering portal for 70+ partner outlets: orders from a phone before the cut-off, two-way integration with the accounting system (1C), Telegram notifications and analytics.',
        result: 'Outlets place orders from their phones before 21:00, every order goes straight into 1C, the accounting system, and the kitchen’s consolidated sheet builds itself. 70+ outlets order through the portal every day, and nobody re-types orders by hand anymore.',
        tasks: [
            'Mobile ordering PWA: order intake closes at 21:00, after that the system won’t accept an order.',
            'Two-way integration with 1C accounting: orders flow into the database automatically and statuses flow back to the portal.',
            'Roles and access: a barista sees their own coffee shop, a manager sees their chain of outlets, the office and admins have separate accounts.',
            'Order adjustments: an admin can change an order only by giving a reason, which is stored in the history, so the client sees what changed and why.',
            'Telegram notifications: managers learn about new orders and important changes instantly.',
            'Analytics: sales filtered by period and outlet, CSV exports for accounting.',
            'Demo mode: a separate environment for showing the portal to clients without touching the production database.',
        ],
        challenge: 'Partner coffee shops sent their orders over WhatsApp, and collecting them from chats was a mess. Everything after that was manual: orders were re-entered into 1C, and a staff member put together the summary for the kitchen. The goal was a portal where outlets place orders themselves before the cut-off, orders go straight into 1C, and the kitchen summary is generated automatically.',
        stackInfo: [
            'App Router, SSR and API routes for server logic.',
            'PostgreSQL + Auth + Row Level Security for a multi-tenant architecture.',
            'Utility-first, mobile-first styling.',
            'REST API for sending orders to 1C and receiving statuses back.',
            'Automated notifications about order statuses (sent to 1C, errors).',
            'Hosting with Edge Functions and auto-deploys from GitHub.',
        ],
    },
    mycook: {
        category: 'Online store / Food delivery',
        description: 'Food delivery store as a PWA: dish builder, address validation, phone-number discounts, Web Push and a custom CRM instead of paid services.',
        result: 'An own online store with an admin panel instead of a monthly fee for third-party services. Customers install it on their phone like an app, build a dish in the configurator and check out delivery on the site. The order is saved to the CRM and at the same time opens in WhatsApp as a ready-made message: the customer just taps “Send”, and the manager has nothing left to clarify.',
        tasks: [
            'PWA: the store installs to the home screen, with pull-to-refresh and a floating cart, just like a native app.',
            'Dish builder: modifiers with instant price recalculation.',
            'Delivery address: suggestions and validation through an address lookup API.',
            'Phone-number discounts: a personal discount is applied as soon as the customer enters their number.',
            'WhatsApp orders without the Business API: the site builds a ready message with items, address and time, and the customer sends it with one tap. No monthly fee, no template approval. If the connection drops, the order is stored on the device and reaches the CRM once the internet is back.',
            'Web Push: customers subscribe in the cart, and the admin sends promos and news straight to their phone screen, no messenger broadcasts needed.',
            'Custom CRM: a private admin panel for orders, catalog and statuses; changes through Supabase are visible to everyone instantly.',
        ],
        challenge: 'Orders came in only through WhatsApp chats: the customer listed dishes, and the manager clarified the contents, address and time. The owner wanted customers to build the order on the site themselves and the manager to receive it complete, without changing the channel everyone was used to.',
        stackInfo: [
            'App Router, SSR and API routes for a fast app.',
            'PostgreSQL database for the catalog and orders.',
            'Native-like experience and push notifications.',
            'Reliable hosting with automatic deploys from GitHub.',
        ],
    },
    'urban-origin': {
        category: 'Landing page / Merch manufacturing',
        description: 'Landing page for a merch and corporate uniform manufacturer in Almaty: an order quiz-calculator, a catalog of 31 models, leads with UTM tags in Bitrix24 and conversions for Meta and Google Ads.',
        result: 'A redesign of the landing page for a garment factory that makes merch and uniforms wholesale from 50 units. Instead of a “name and phone” form, the client answers three questions: what to make, how many and by when. The manager gets a ready request in Bitrix24, and Meta and Google ads learn from real leads, not clicks.',
        tasks: [
            'A two-step quiz-calculator: products, quantity and deadline first, then contacts. Requests under 50 units are flagged as low priority right away.',
            'Lead analytics: every lead goes to Google Ads and Meta with its own ID, a WhatsApp click counts as a separate conversion, and first-visit UTM tags and gclid/fbclid are saved with the request.',
            'Catalog: 31 models in four categories, each with its own swipeable gallery.',
            'A “sample first, then the run” block and a “how it usually goes” vs “with Urban Origin” comparison answer a buyer’s main fears.',
            'Tabs for four audiences: IT companies, retail chains, schools and universities, events.',
            'Production videos load only when scrolled into view, so the first screen opens fast.',
            'SEO: headings for merch and corporate apparel searches, LocalBusiness markup for search engines.',        ],
        stackInfo: [
            'Static build: the page arrives as ready HTML and opens fast even on mobile data.',
            'Quiz leads reach the CRM through a server-side /api/lead together with the answers and UTM tags.',
            'Lead and Contact events with the request ID to optimize Instagram and Facebook ads.',
            'Two conversions: a quiz lead and a WhatsApp click.',
            'Background production videos without loading the site’s own server.',
            'Own server with automatic HTTPS.',
        ],
    },
};
