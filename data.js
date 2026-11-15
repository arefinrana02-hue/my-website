/* Digital Skill Academy – content layer.
   All business-specific values are PLACEHOLDERS. Replace before launch. */
window.DSA = {
  site: {
    name: 'Digital Skill Academy',
    tagline: 'Empowering Businesses Through Technology & Digital Skills.',
    email: '', phone: '', whatsapp: '', address: '',
    emailLabel: 'hello@your-domain.example (placeholder)',
    phoneLabel: '+880 0000-000000 (placeholder)',
    whatsappLabel: 'WhatsApp number (placeholder)',
    addressLabel: 'Business address (placeholder), Bangladesh',
    social: { Facebook: '', LinkedIn: '', YouTube: '', Instagram: '' },
    baseUrl: 'https://www.your-domain.example'
  },

  categories: [
    { id: 'web', name: 'Website & Software Development', icon: 'code',
      blurb: 'From marketing sites to custom business platforms, built on modern, maintainable stacks.',
      items: ['Website Design','Website Development','Custom Web Applications','E-commerce Website Development','WordPress Development','Shopify Development','PHP Development','React Development','Next.js Development','Laravel Development','Custom Software Development','ERP Software','CRM Software','Inventory Management Software','Business Automation'],
      tech: ['HTML5','CSS3','JavaScript / TypeScript','React','Next.js','Laravel / PHP','WordPress','Shopify','PostgreSQL / MySQL'],
      features: ['Requirements-driven scope and architecture','Responsive, accessible interfaces','Secure authentication and data handling','Clean, documented, maintainable code'] },
    { id: 'mobile', name: 'Mobile Application Development', icon: 'phone',
      blurb: 'Android, iOS and cross-platform apps designed for real-world usability.',
      items: ['Android App Development','iOS App Development','Cross-Platform App Development','Flutter Development','React Native Development','App UI/UX Design','App Maintenance'],
      tech: ['Flutter','React Native','Kotlin','Swift','Firebase','REST / GraphQL APIs'],
      features: ['Native-feel performance and navigation','Offline and low-bandwidth friendly patterns','Store-ready builds and release guidance','API and backend integration'] },
    { id: 'graphics', name: 'Graphics & Creative Design', icon: 'palette',
      blurb: 'Brand assets and marketing creatives that look consistent everywhere.',
      items: ['Logo Design','Brand Identity Design','Business Card Design','Banner Design','Social Media Design','Brochure Design','Flyer Design','Packaging Design','Presentation Design','Infographic Design'],
      tech: ['Adobe Illustrator','Adobe Photoshop','Adobe InDesign','Figma','Canva (templates)'],
      features: ['Concept directions and revisions','Print-ready and web-ready exports','Consistent brand usage guidance','Editable source files on request'] },
    { id: 'uiux', name: 'UI/UX Design', icon: 'layout',
      blurb: 'Research-informed interfaces that are clear, usable and conversion-focused.',
      items: ['Website UI Design','Mobile App UI Design','UX Research','Wireframing','Prototyping','Design Systems','Dashboard Design'],
      tech: ['Figma','FigJam','Storybook','Maze-style usability testing','Lottie'],
      features: ['User flows and information architecture','Interactive prototypes','Reusable component libraries','Developer-ready handoff'] },
    { id: 'marketing', name: 'Digital Marketing', icon: 'megaphone',
      blurb: 'Measurable growth through search, social, paid and content channels.',
      items: ['Search Engine Optimization (SEO)','Social Media Marketing','Facebook Marketing','Instagram Marketing','Google Ads','YouTube Marketing','Content Marketing','Email Marketing','Lead Generation','Marketing Strategy'],
      tech: ['Google Analytics','Google Search Console','Meta Business Suite','Google Ads','Email platforms'],
      features: ['Channel strategy tied to business goals','Transparent reporting','Content calendars and creative support','Continuous testing and optimization'] },
    { id: 'ai', name: 'AI & Automation Solutions', icon: 'bot',
      blurb: 'Practical AI and workflow automation that removes repetitive work.',
      items: ['AI Chatbot Development','AI Business Automation','AI Integration','Workflow Automation','AI-powered Customer Support','Business Process Automation','AI Content Solutions'],
      tech: ['LLM APIs','Python','n8n / Zapier-style automation','Vector search','Webhooks & REST'],
      features: ['Use-case discovery before tooling','Human-in-the-loop safeguards','Integration with existing systems','Clear data-privacy handling'] },
    { id: 'security', name: 'Cybersecurity & IT Support', icon: 'shield',
      blurb: 'Protect, monitor and maintain the systems your business depends on.',
      items: ['Website Security','Security Auditing','Malware Removal','Website Maintenance','IT Consulting','Technical Support','Data Backup Solutions','Security Monitoring'],
      tech: ['WAF & hardening tools','Vulnerability scanners','Backup tooling','Uptime monitoring','Linux administration'],
      features: ['Risk-based assessment','Documented findings and fixes','Backup and recovery planning','Responsive technical support'] },
    { id: 'cloud', name: 'Domain, Hosting & Cloud Services', icon: 'cloud',
      blurb: 'Reliable hosting, domains and cloud infrastructure, set up properly.',
      items: ['Domain Registration','Web Hosting','VPS Hosting Setup','Cloud Server Management','Website Migration','SSL Installation','Server Configuration','Email Hosting'],
      tech: ['Linux','Nginx / Apache','Cloudflare','AWS / DigitalOcean-class cloud','Docker'],
      features: ['Secure default configuration','Zero-surprise migrations','SSL and DNS management','Monitoring and backups'] },
    { id: 'network', name: 'Networking & Infrastructure', icon: 'network',
      blurb: 'Stable office networks and infrastructure planning for growing teams.',
      items: ['Network Setup','LAN/WAN Configuration','Router Configuration','Server Setup','Network Maintenance','IT Infrastructure Consulting'],
      tech: ['Managed switches & routers','Firewalls','VPN','Windows / Linux servers'],
      features: ['Site survey and planning','Structured, documented configuration','Security-first segmentation','Ongoing maintenance options'] },
    { id: 'data', name: 'Data & Business Solutions', icon: 'database',
      blurb: 'Clean data, automated spreadsheets and reporting that supports decisions.',
      items: ['Data Entry','Data Processing','Data Management','Excel Automation','Database Management','Data Analysis','Business Reporting','Virtual Assistance'],
      tech: ['Microsoft Excel','Power Query','SQL','Python','Google Sheets'],
      features: ['Accuracy-checked workflows','Confidentiality-minded handling','Automated, reusable reports','Clear documentation'] },
    { id: 'video', name: 'Video & Multimedia Services', icon: 'video',
      blurb: 'Edited video, motion and audio for marketing, education and social channels.',
      items: ['Professional Video Editing','Motion Graphics','2D Animation','Promotional Video','Explainer Video','YouTube Video Editing','Audio Editing'],
      tech: ['Adobe Premiere Pro','After Effects','DaVinci Resolve','Audition'],
      features: ['Storyboard and script alignment','Brand-consistent styling','Platform-specific exports','Revision rounds included in scope'] }
  ],

  courses: [
    { title:'Web Development', cat:'Development', icon:'code', level:'Beginner', duration:'12 weeks', desc:'Learn how websites work end to end: structure, styling, interactivity and deployment.', modules:['How the web works','HTML5 & semantic markup','CSS layout (Flexbox & Grid)','JavaScript fundamentals','Responsive design','Deploying your first site'] },
    { title:'Frontend Development', cat:'Development', icon:'layout', level:'Intermediate', duration:'10 weeks', desc:'Build modern interfaces with component-based thinking and professional workflows.', modules:['Modern JavaScript (ES6+)','React fundamentals','State & data fetching','Accessibility basics','Performance basics','Capstone project'] },
    { title:'Backend Development', cat:'Development', icon:'database', level:'Intermediate', duration:'10 weeks', desc:'Design APIs, work with databases and handle authentication safely.', modules:['Server fundamentals','REST API design','Databases & SQL','Authentication & authorization','Validation & security basics','Deploying a backend'] },
    { title:'Full Stack Development', cat:'Development', icon:'zap', level:'Advanced', duration:'20 weeks', desc:'Combine frontend and backend skills into complete, deployable applications.', modules:['Project architecture','Frontend with React/Next.js','Backend & database','Auth & roles','Testing & debugging','Capstone application'] },
    { title:'Programming', cat:'Development', icon:'code', level:'Beginner', duration:'8 weeks', desc:'Build problem-solving foundations with programming logic and core concepts.', modules:['Variables & data types','Control flow','Functions','Data structures','Problem solving','Mini projects'] },
    { title:'Graphics Design', cat:'Design', icon:'palette', level:'Beginner', duration:'10 weeks', desc:'Master design principles and tools to create logos, social creatives and print material.', modules:['Design principles','Color & typography','Logo design','Social media creatives','Print design basics','Portfolio building'] },
    { title:'UI/UX Design', cat:'Design', icon:'layout', level:'Beginner', duration:'10 weeks', desc:'Design usable digital products from research and wireframes to prototypes.', modules:['UX fundamentals','User research','Wireframing','UI design in Figma','Prototyping','Usability testing'] },
    { title:'Digital Marketing', cat:'Marketing', icon:'megaphone', level:'Beginner', duration:'8 weeks', desc:'Understand channels, audiences and measurement for modern online marketing.', modules:['Marketing fundamentals','Social media marketing','Paid advertising basics','Content & email','Analytics & reporting','Campaign project'] },
    { title:'SEO Training', cat:'Marketing', icon:'search', level:'Intermediate', duration:'6 weeks', desc:'Learn keyword research, on-page, technical and content SEO practices.', modules:['How search engines work','Keyword research','On-page SEO','Technical SEO','Content strategy','Reporting'] },
    { title:'Freelancing Training', cat:'Career', icon:'users', level:'Beginner', duration:'6 weeks', desc:'Build a profile, find clients, price your work and deliver professionally.', modules:['Choosing a skill & niche','Profile and portfolio','Finding and pitching clients','Pricing & contracts','Communication & delivery','Growing long-term'] },
    { title:'Microsoft Office', cat:'Productivity', icon:'layout', level:'Beginner', duration:'6 weeks', desc:'Work confidently in Word, Excel and PowerPoint for office and business tasks.', modules:['Word documents','Formatting & templates','Excel basics','PowerPoint presentations','Outlook & collaboration','Practical exercises'] },
    { title:'Advanced Excel', cat:'Productivity', icon:'database', level:'Advanced', duration:'6 weeks', desc:'Go beyond formulas with lookups, pivots, dashboards and automation.', modules:['Advanced formulas','Lookups & dynamic arrays','PivotTables','Dashboards & charts','Power Query','Macro basics'] },
    { title:'Video Editing', cat:'Design', icon:'video', level:'Beginner', duration:'8 weeks', desc:'Edit, color and export videos for social media, YouTube and business use.', modules:['Editing fundamentals','Cuts, pacing & audio','Titles & motion basics','Color correction','Exporting for platforms','Final project'] },
    { title:'AI Tools & Automation', cat:'AI', icon:'bot', level:'Beginner', duration:'6 weeks', desc:'Use AI assistants and no-code automation to save time and improve output.', modules:['AI tools overview','Effective prompting','Automating workflows','Content & research assistants','Responsible AI use','Automation project'] },
    { title:'Cybersecurity Fundamentals', cat:'Security', icon:'shield', level:'Beginner', duration:'8 weeks', desc:'Learn core security concepts, common threats and everyday protection practices.', modules:['Security basics','Common threats','Passwords & authentication','Network security basics','Web security basics','Incident awareness'] },
    { title:'Computer Fundamentals', cat:'Productivity', icon:'phone', level:'Beginner', duration:'4 weeks', desc:'Get comfortable with computers, files, the internet and essential everyday tools.', modules:['Hardware & software','Operating systems','Files & folders','Internet & email','Online safety','Everyday productivity'] }
  ],

  projects: [
    { name:'Retail Storefront (Demo)', cat:'Website Development', icon:'code', tech:['Next.js','Tailwind CSS','Stripe-style checkout'], desc:'A concept e-commerce storefront showing catalog, cart and checkout flows.' },
    { name:'Inventory Manager (Demo)', cat:'Software Development', icon:'database', tech:['React','Node.js','PostgreSQL'], desc:'A concept inventory and order dashboard with roles and reports.' },
    { name:'Fitness Tracker App (Demo)', cat:'Mobile Applications', icon:'phone', tech:['Flutter','Firebase'], desc:'A concept cross-platform app with goals, streaks and reminders.' },
    { name:'Brand Kit Showcase (Demo)', cat:'Branding', icon:'palette', tech:['Illustrator','Figma'], desc:'A concept brand identity: logo, palette, typography and stationery.' },
    { name:'Social Campaign Pack (Demo)', cat:'Graphics Design', icon:'palette', tech:['Photoshop','Illustrator'], desc:'A concept set of social post and banner designs for a product launch.' },
    { name:'Growth Report (Demo)', cat:'Digital Marketing', icon:'megaphone', tech:['Analytics','Search Console'], desc:'A concept monthly marketing report layout with channel insights.' },
    { name:'Analytics Dashboard UI (Demo)', cat:'UI/UX Design', icon:'layout', tech:['Figma','Design System'], desc:'A concept dashboard UI with reusable components and dark mode.' }
  ],

  posts: [
    { title:'A Practical Checklist Before You Build a Business Website', cat:'Web Development', date:'2026-10-02', featured:true, excerpt:'Before choosing technology, answer these planning questions to avoid costly rework.', body:['Most website projects go wrong before a single line of code is written. Start by writing down who the site is for, the single action you want visitors to take, and how you will measure success.','Next, define content early. Pages, service descriptions and calls to action shape the design far more than colors do. Gather real content first and design around it.','Finally, plan for the long term: hosting, backups, security updates and who will maintain the site after launch. A website is a product, not a one-time purchase.'] },
    { title:'How Small Businesses Can Start Using AI Safely', cat:'AI & Automation', date:'2026-09-18', featured:true, excerpt:'Begin with low-risk, high-repetition tasks and keep humans in the loop.', body:['The best first AI use cases are repetitive and low-risk: drafting replies, summarizing documents, or sorting inbound requests. Avoid starting with decisions that affect customers financially or legally.','Always keep a person reviewing outputs, and be careful about what data you paste into external tools. Write a short internal policy describing what may and may not be shared.','Measure the time saved against the time spent reviewing. If the numbers do not work, change the use case rather than forcing the tool.'] },
    { title:'Everyday Cybersecurity Habits Every Team Should Have', cat:'Cybersecurity', date:'2026-09-05', featured:false, excerpt:'Simple habits that prevent the most common incidents.', body:['Use a password manager and unique passwords, and turn on multi-factor authentication for email, banking and admin accounts.','Keep software updated and maintain tested backups stored separately from your main systems. A backup you have never restored is only a hope.','Train your team to pause before clicking links or opening unexpected attachments, and agree who to tell when something looks wrong.'] },
    { title:'SEO Basics: What Actually Matters for a New Site', cat:'Digital Marketing', date:'2026-08-21', featured:false, excerpt:'Focus on useful content, clear structure and technical fundamentals first.', body:['Search engines reward pages that answer a real question clearly. Start with the questions your customers ask and write helpful pages for each.','Make sure titles, headings and descriptions are unique and descriptive, pages load quickly on mobile, and the site can be crawled without errors.','SEO compounds slowly. Track impressions and clicks in Search Console and improve pages steadily rather than chasing shortcuts.'] },
    { title:'Choosing Between Native and Cross-Platform Apps', cat:'Software & Applications', date:'2026-08-08', featured:false, excerpt:'A short decision guide based on budget, performance needs and team skills.', body:['Cross-platform frameworks like Flutter and React Native let one team ship to both stores and are often the right choice for business apps.','Choose native when you need deep device features, the highest possible performance, or platform-specific experiences.','Whatever you pick, invest in design and testing on real devices; framework choice matters less than product quality.'] },
    { title:'Is Freelancing Right for You? A Realistic Starting Plan', cat:'Freelancing', date:'2026-07-25', featured:false, excerpt:'Skills, portfolio and communication matter more than platform tricks.', body:['Pick one marketable skill and become good at a specific type of work before widening your offer.','Build two or three sample projects that show your process, then use them to pitch clearly and politely to the right clients.','Treat communication as part of the service: set expectations, confirm scope in writing and deliver on time.'] },
    { title:'How to Learn Online Without Losing Motivation', cat:'Online Learning', date:'2026-07-10', featured:false, excerpt:'Structure, small projects and community make learning stick.', body:['Set a fixed weekly schedule and treat it like an appointment. Consistency beats occasional long sessions.','Build something small after every module. Projects reveal gaps that videos and reading never do.','Find a peer or mentor to review your work. Feedback speeds up progress and keeps you accountable.'] },
    { title:'Five IT Tips to Keep Your Office Running Smoothly', cat:'IT Tips & Tutorials', date:'2026-06-28', featured:false, excerpt:'Small maintenance routines that prevent big outages.', body:['Document your equipment, accounts and renewal dates in one shared place so nothing expires unnoticed.','Schedule regular updates, test your backups, and label network equipment clearly.','Have a simple escalation path: who to call, in what order, when something breaks.'] },
    { title:'Technology Trends Worth Watching in Business', cat:'Technology Updates', date:'2026-06-12', featured:false, excerpt:'A calm look at technology shifts that may affect small and medium businesses.', body:['Automation and AI assistants are becoming part of everyday software. Expect more tools to include them by default.','Security and privacy expectations from customers continue to rise, making good data handling a competitive advantage.','Rather than chasing every trend, pick one improvement per quarter that clearly saves time or earns revenue.'] }
  ],
  blogCategories: ['Technology Updates','Web Development','Software & Applications','AI & Automation','Cybersecurity','Digital Marketing','Freelancing','Online Learning','IT Tips & Tutorials'],

  values: [
    ['Integrity','We are honest about scope, timelines and what technology can and cannot do.'],
    ['Quality','We care about maintainable work that holds up after launch.'],
    ['Learning','We share practical skills through the Academy and in every project.'],
    ['Partnership','We communicate openly and treat client goals as our own.']
  ],
  why: [
    ['Professional Solutions','Structured delivery from discovery to support.','briefcase'],
    ['Modern Technologies','Current, well-supported tools and frameworks.','zap'],
    ['Customized Services','Solutions shaped around your goals, not a template.','target'],
    ['Affordable Solutions','Clear scopes and pricing options for growing businesses.','coins'],
    ['Transparent Communication','Regular updates and plain-language reporting.','message'],
    ['On-Time Delivery','Milestones agreed up front and tracked openly.','clock'],
    ['Ongoing Support','Maintenance and help after launch.','shield'],
    ['Customer Satisfaction','Revisions and feedback built into the process.','heart']
  ],
  process: [
    ['Discover','Understand client requirements.'],['Planning','Develop a strategic roadmap.'],['Design','Create professional UI/UX.'],
    ['Development','Build the solution.'],['Testing','Ensure quality and security.'],['Delivery','Launch the final project.'],['Support','Provide ongoing assistance.']
  ],
  budgets: ['Not sure yet','Under $500','$500 – $1,500','$1,500 – $5,000','$5,000 – $15,000','$15,000+'],
  testimonials: [
    'Placeholder: Replace this with genuine feedback from a real client after you have collected written permission.',
    'Placeholder: A short, honest quote about communication, quality or delivery goes here.',
    'Placeholder: Add the client name, role and company only with their consent.'
  ]
};
