const fileSystem = {
  '/': {
    type: 'directory',
    name: '/',
    children: {
      // 👤 Profile info
      profile: {
        type: 'directory',
        name: 'profile',
        children: {
          about: {
            type: 'file',
            name: 'about.txt',
            content:
              `👋 Hi, I’m Aryan Shaw — a Software Developer with a passion for performance, clean architecture, and data-driven systems.\n\n` +
              `💻 Over the past few years, I’ve built scalable backend services, real-time APIs, identity systems, and AI-powered platforms.\n\n` +
              `✨ I care deeply about writing maintainable code, solving real business problems, and continuously growing as an engineer.\n\n` +
              `🌐 I’m currently exploring distributed systems, LLM applications, and DevOps tooling.`,
          },
          contact: {
            type: 'file',
            name: 'contact.txt',
            content:
              `✉️  Email: aryan.shaw2702@gmail.com\n\n` +
              `📱  Phone: +91-7044418370\n\n` +
              `🐙  GitHub: https://github.com/aryanshaw\n\n` +
              `🔗  LinkedIn: https://linkedin.com/in/aryanshaw\n\n` +
              `✍️  Medium: https://medium.com/@aryanrot234`,
          },
        },
      },

      // 🛠️ Skills & Tech
      skills: {
        type: 'directory',
        name: 'skills',
        children: {
          techStack: {
            type: 'file',
            name: 'tech-stack.txt',
            content:
              `Languages:\n` +
              `\t• JavaScript/TypeScript\n` +
              `\t• Python\n` +
              `\t• SQL\n\n` +
              `Backend:\n` +
              `\t• Node.js (Express)\n` +
              `\t• Python (FastAPI)\n\n` +
              `Frontend:\n` +
              `\t• React.js, Next.js, React Native, Redux\n\n` +
              `Databases:\n` +
              `\t• PostgreSQL, ClickHouse, MongoDB, Redis, Pinecone\n\n` +
              `DevOps & Cloud:\n` +
              `\t• Docker, Nginx, GCP, AWS (EC2, S3, SES, SQS)\n\n` +
              `AI/ML & LLMs:\n` +
              `\t• RAG pipelines, LangChain, LangGraph, OpenAI, Anthropic, Groq\n\n` +
              `Others:\n` +
              `\t• Airbyte, dbt, Twilio, WebSockets, REST APIs`,
          },
          skills: {
            type: 'file',
            name: 'skills.txt',
            content:
              `Languages:\n` +
              `\t• Python, TypeScript, JavaScript, SQL, Java\n\n` +
              `Frameworks & Libs:\n` +
              `\t• FastAPI, Express, React, React Native, Next.js, Redux\n\n` +
              `Databases:\n` +
              `\t• ClickHouse, PostgreSQL, MongoDB, Redis, Pinecone\n\n` +
              `Cloud & DevOps:\n` +
              `\t• AWS, GCP, Docker, Nginx\n\n` +
              `AI/ML & LLMs:\n` +
              `\t• LangChain, OpenAI, Anthropic, Groq\n\n` +
              `Data Eng:\n` +
              `\t• ELT pipelines, vector search, Airbyte, dbt\n\n` +
              `Real-time:\n` +
              `\t• WebSockets, Socket.IO, Twilio, Expo`,
          },
        },
      },

      // 🎓 Education & Credentials
      education: {
        type: 'directory',
        name: 'education',
        children: {
          education: {
            type: 'file',
            name: 'education.txt',
            content:
              `🎓 B.Tech in Electronics & Communication\n` +
              `\tKalyani Govt Engineering College (2019 – 2023)\n\n` +
              `📈 CGPA: 8.45`,
          },
          positionsOfResponsibility: {
            type: 'file',
            name: 'positions-of-responsibility.txt',
            content:
              `📹 Video Editing & Design Lead, Elixir Magazine (Jan – Aug 2022)\n\n` +
              `\t• Led design of 60+ magazine pages with compelling layouts & high-quality aesthetics.`,
          },
        },
      },

      // 💼 Work Experience
      experience: {
        type: 'directory',
        name: 'experience',
        children: {
          atrean: {
            type: 'file',
            name: 'atrean.txt',
            content:
              `🚀 Atrean (Dec 2023 – Present) | Software Developer\n\n` +
              `\t• Built LLM-powered analytics platform (7M+ rows).\n` +
              `\t• Designed & implemented multi-agent LLM system for data analysis.\n` +
              `\t• ELT pipelines: Airbyte → ClickHouse → dbt (90%+ mapping).\n` +
              `\t• Took ownership of core backend systems: real-time chat, AI agents, ingestion pipelines, and cron-based workflows.\n`,
          },
          ekalsutra: {
            type: 'file',
            name: 'ekalsutra.txt',
            content:
              `📱 Ekalsutra (Nov 2022 – Feb 2023) | Mobile App Developer\n\n` +
              `\t• Built and maintained a parent-facing ERP mobile app adopted by 200+ schools.\n` +
              `\t• Enabled real-time access to student records, fee payments, and academic updates. \n` +
              `\t• Translated Figma designs into responsive, high-performance components.`,
          },
          freelance: {
            type: 'file',
            name: 'freelance.txt',
            content:
              `🤝 Stealth Startup (2025 – Present) | Founding Backend Engineer\n\n` +
              `\t• Designing the backend architecture (FastAPI + PostgreSQL) for a platform helping newcomers find flats and flatmates\n\n` +
              `\t• Leading development of authentication, listings, and matching logic.`,
          },
        },
      },

      // 🚀 Things I Built from Scratch
      thingsIBuiltFromScratch: {
        type: 'directory',
        name: 'thingsIBuiltFromScratch',
        children: {
          spark: {
            type: 'directory',
            name: 'spark',
            children: {
              description: {
                type: 'file',
                name: 'description.txt',
                content:
                  `💙 Spark (Dating App)\n\n` +
                  `\t• Built entire messaging/chat system from scratch with:\n` +
                  `\t\t– AWS SQS 📨\n` +
                  `\t\t– Redis ⚡\n` +
                  `\t\t– Socket.IO 🔌\n` +
                  `\t\t– MongoDB 🗄️\n\n` +
                  `\t• Designed real-time message flow, offline support & push notifications.\n\n` +
                  `\t• Photo/document upload via AWS S3 📸 and Twilio/SES alerts 📧.\n\n` +
                  `\t💬 Chat Service (Most complex):\n` +
                  `\t\t– Integrated AWS SQS, Redis, and Socket.IO\n` +
                  `\t\t– Chat message flow: Frontend → Communication service (Socket) → SQS → Chat → MongoDB → Redis → Connection SQS → Socket → Frontend\n` +
                  `\t\t– Offline messages routed to Notification service if user is inactive\n\n` +
                  `\t🔔 Notification Service:\n` +
                  `\t\t– Used Expo Notification SDK to send mobile push alerts from SQS\n\n` +
                  `\t<img src="/images/spark-arch.png" class="max-h-68 rounded shadow-lg" alt="Spark Architecture" />`,
              },
            },
          },

          deliveryPlus: {
            type: 'directory',
            name: 'deliveryPlus',
            children: {
              description: {
                type: 'file',
                name: 'description.txt',
                content:
                  `📦 DeliveryPlus (Logistics SaaS)\n\n` +
                  `\t• Built the backend for a Cash on Delivery (COD) tracking system used by 2000+ delivery agents. Integrated OCR (Tecstract) to auto-extract data from receipts shared via WhatsApp forms\n\n` +
                  `\t• Enabled admin review dashboard with Flipkart-provided sheets for COD reconciliations.\n` +
                  `\t\t• ~2000 delivery agents upload daily cash receipts via WhatsApp forms.\n` +
                  `\t\t• Tecstract (OCR tool) extracts data from images and stores it in the DB.\n` +
                  `\t\t• Admin uploads daily Flipkart/Meesho/Amazon COD reports via a spreadsheet.\n` +
                  `\t\t• Built backend validation and review system for COD managers to reconcile receipt submissions.\n\n`,
              },
            },
          },

          atrean: {
            type: 'directory',
            name: 'atrean',
            children: {
              description: {
                type: 'file',
                name: 'description.txt',
                content:
                  `🧠 ATREAN (Data + AI SaaS Product)\n\n` +
                  `\t• Lead backend developer for multi-agent LLM workflows (LangChain + Pinecone + ClickHouse).\n` +
                  `\t• I’ve architected the entire backend, AI workflows, data pipelines, and agentic systems that power Atrean — a platform where users can talk to their data and automate analytics. Atrean lets users “talk to their data” — I built core systems for: \n\n` +
                  `\t 🧩 Core Systems:\n` +
                  `\t\t• File Ingestion: Structured (CSV/XLSX via schema detection) & Unstructured (PDF/TXT), plus ELT via Airbyte + dbt\n\n` +
                  `\t\t• RAG-based Query Engine: LangChain + Langraph + Pinecone + ClickHouse with reranking and fallback logic\n\n` +
                  `\t\t• Agentic Workflows: LangGraph-based agentic flow prompt categorization for generating reports, writing emails, or setting alerts \n\n` +
                  `\t\t• Auto Join & Synthetic Builder: Auto-detects table relationships & generates useful business questions \n\n` +
                  `\t\t• Natural Language Cron Jobs: Prompts like “send this report every Monday” trigger APScheduler workflows \n\n` +
                  `<div class="flex justify-center my-4 gap-4">` +
                  `<img src="/images/ingestion-arch.png" alt="ATREAN Ingestion Architecture" class="max-h-68 rounded shadow-lg" />` +
                  `<img src="/images/atrean-chat.png" alt="ATREAN Chat Architecture" class="max-h-68 rounded shadow-lg" />` +
                  `</div>`,
              },
            },
          },
        },
      },

      // ✍️ Writing & Resume
      writing: {
        type: 'directory',
        name: 'writing',
        children: {
          technicalWriting: {
            type: 'file',
            name: 'technical-writing.txt',
            content: `📝 Medium Blog\n` + `\thttps://medium.com/@aryanrot234`,
          },
          resume: {
            type: 'file',
            name: 'resume.txt',
            content:
              `📄 Resume PDF\n` +
              `\thttps://drive.google.com/file/d/1hwz62u9L24_Lm-jUKSaMJHA11NR21jrD/view?usp=sharing`,
          },
        },
      },
    },
  },
};

function resolveNode(fs: any, cwdArray: string[]) {
  let node = fs['/'];
  for (const dir of cwdArray.slice(1)) {
    node = node.children?.[dir];
    if (!node) return node;
  }
  return node;
}

export { fileSystem, resolveNode };
