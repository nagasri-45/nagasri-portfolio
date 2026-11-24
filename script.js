/**
 * Mundrathi Nagasri - Modern Software Engineer & Student Portfolio
 * Pure Vanilla JavaScript (Zero Dependencies, Ultra Fast, 60fps)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Particles Background
    initParticles();

    // 2. Initialize Typewriter
    initTypewriter();

    // 3. Initialize Stats Counter
    initCounters();

    // 4. Initialize Project Filters
    initProjectFilters();

    // 5. Initialize Live Interactive Demos (CGPA Calc & SQL Runner)
    initCgpaCalculator();
    initSqlSandbox();

    // 6. Initialize Terminal CLI Hub
    initTerminal();

    // 7. Navbar Scroll Effect & Mobile Drawer
    initNavigation();

    // 8. Footer Year
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

/* ==========================================================================
   1. Interactive Particle Canvas Background
   ========================================================================== */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor(window.innerWidth / 16), 75);

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 1.8 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.45;
            this.speedY = (Math.random() - 0.5) * 0.45;
            this.color = Math.random() > 0.5 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(6, 182, 212, 0.35)';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.12 * (1 - dist / 110)})`;
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================================================
   2. Dynamic Typewriter Effect
   ========================================================================== */
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const phrases = [
        "First-Year B.Tech CSE Student",
        "Aspiring Software Engineer",
        "C & SQL Developer",
        "Web Developer (HTML/CSS/JS)",
        "Fast & Adaptable Problem Solver"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 100;

    function tick() {
        const current = phrases[phraseIndex];

        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            delay = 45;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            delay = 90;
        }

        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            delay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }

        setTimeout(tick, delay);
    }
    tick();
}

/* ==========================================================================
   3. Animated Stats Counter
   ========================================================================== */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    let hasRun = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasRun) {
                hasRun = true;
                counters.forEach(counter => {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const isFloat = target % 1 !== 0;
                    const duration = 1600;
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = isFloat ? target.toFixed(1) : Math.round(target);
                            clearInterval(timer);
                        } else {
                            counter.textContent = isFloat ? current.toFixed(1) : Math.round(current);
                        }
                    }, duration / steps);
                });
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   4. Filterable Project Cards
   ========================================================================== */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/* ==========================================================================
   5. Interactive Live Demos (CGPA Calculator & SQL Sandbox)
   ========================================================================== */
function initCgpaCalculator() {
    window.calculateSemesterGpa = function() {
        const c1 = parseFloat(document.getElementById('c1').value) || 0;
        const g1 = parseFloat(document.getElementById('g1').value) || 0;

        const c2 = parseFloat(document.getElementById('c2').value) || 0;
        const g2 = parseFloat(document.getElementById('g2').value) || 0;

        const c3 = parseFloat(document.getElementById('c3').value) || 0;
        const g3 = parseFloat(document.getElementById('g3').value) || 0;

        const c4 = parseFloat(document.getElementById('c4').value) || 0;
        const g4 = parseFloat(document.getElementById('g4').value) || 0;

        const totalCredits = c1 + c2 + c3 + c4;
        const totalPoints = (c1 * g1) + (c2 * g2) + (c3 * g3) + (c4 * g4);

        const resultEl = document.getElementById('calc-output-score');
        if (totalCredits > 0 && resultEl) {
            const sgpa = (totalPoints / totalCredits).toFixed(2);
            resultEl.textContent = `${sgpa} / 10`;
            showToast(`Calculated SGPA: ${sgpa}`);
        }
    };
}

// Sample SQL Database
const studentDB = [
    { id: 101, name: "Mundrathi Nagasri", course: "B.Tech CSE", university: "Anurag Univ", cgpa: 9.5, c_grade: "O" },
    { id: 102, name: "K. Sneha", course: "B.Tech CSE", university: "Anurag Univ", cgpa: 9.1, c_grade: "A+" },
    { id: 103, name: "V. Rahul", course: "B.Tech IT", university: "Anurag Univ", cgpa: 8.8, c_grade: "A" },
    { id: 104, name: "P. Ananya", course: "B.Tech CSE", university: "Anurag Univ", cgpa: 9.4, c_grade: "O" },
    { id: 105, name: "R. Sai Teja", course: "B.Tech ECE", university: "Anurag Univ", cgpa: 8.6, c_grade: "B+" }
];

function initSqlSandbox() {
    window.runSqlQuery = function() {
        const query = document.getElementById('sql-query-select').value;
        const container = document.getElementById('sql-results-table');
        if (!container) return;

        let filtered = [];

        if (query === 'ALL') {
            filtered = studentDB;
        } else if (query === 'TOP_CGPA') {
            filtered = studentDB.filter(s => s.cgpa >= 9.0);
        } else if (query === 'GRADE_O') {
            filtered = studentDB.filter(s => s.c_grade === 'O');
        } else if (query === 'NAGASRI') {
            filtered = studentDB.filter(s => s.name.includes('Nagasri'));
        }

        let html = `
            <thead>
                <tr>
                    <th>Roll ID</th>
                    <th>Student Name</th>
                    <th>Branch</th>
                    <th>CGPA</th>
                    <th>C Grade</th>
                </tr>
            </thead>
            <tbody>
        `;

        filtered.forEach(row => {
            const isNagasri = row.name.includes('Nagasri');
            html += `
                <tr style="${isNagasri ? 'background: rgba(139, 92, 246, 0.2); font-weight: bold;' : ''}">
                    <td>#${row.id}</td>
                    <td>${row.name} ${isNagasri ? '⭐' : ''}</td>
                    <td>${row.course}</td>
                    <td style="color: #67e8f9">${row.cgpa}</td>
                    <td style="color: #6ee7b7">${row.c_grade}</td>
                </tr>
            `;
        });

        html += `</tbody>`;
        container.innerHTML = html;
        showToast(`Executed query: ${filtered.length} records returned`);
    };
}

/* ==========================================================================
   6. Interactive Terminal CLI Hub
   ========================================================================== */
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const chips = document.querySelectorAll('.term-chip');

    if (!input || !output) return;

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const cmd = chip.getAttribute('data-cmd');
            executeCommand(cmd);
        });
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            if (cmd) {
                executeCommand(cmd);
                input.value = '';
            }
        }
    });

    function executeCommand(cmd) {
        let response = '';

        switch (cmd) {
            case 'help':
                response = `
                    <div style="color: #a78bfa;">Available Commands:</div>
                    <div>&bull; <strong style="color: #67e8f9">academics</strong>: Displays university CGPA, Intermediate & 10th score</div>
                    <div>&bull; <strong style="color: #67e8f9">skills</strong>: Shows C, SQL, HTML, CSS, JavaScript proficiency</div>
                    <div>&bull; <strong style="color: #67e8f9">projects</strong>: Lists live portfolio, C student manager, and SQL schema</div>
                    <div>&bull; <strong style="color: #67e8f9">contact</strong>: Shows email, phone, LinkedIn, and GitHub links</div>
                    <div>&bull; <strong style="color: #67e8f9">resume</strong>: Downloads Mundrathi Nagasri's verified PDF resume</div>
                    <div>&bull; <strong style="color: #67e8f9">whoami</strong>: Displays student profile information</div>
                    <div>&bull; <strong style="color: #67e8f9">clear</strong>: Clears the terminal screen</div>
                `;
                break;

            case 'academics':
                response = `
                    <div style="color: #6ee7b7; font-weight: bold;">[Academic Excellence Record]</div>
                    <div>1. <strong>B.Tech CSE (Anurag Univ)</strong>: 2026 - 2030 &bull; <span style="color: #fcd34d;">Current CGPA: 9.5 / 10</span></div>
                    <div>2. <strong>Intermediate (Shine Junior College)</strong>: 2023 - 2025 &bull; <span style="color: #fcd34d;">Score: 983 / 1000 (98.3%)</span></div>
                    <div>3. <strong>Class X (Vikas High School)</strong>: 2023 &bull; <span style="color: #fcd34d;">CGPA: 10 / 10 (Distinction)</span></div>
                `;
                break;

            case 'skills':
                response = `
                    <div style="color: #a78bfa; font-weight: bold;">[Technical Skills Breakdown]</div>
                    <div>&bull; <strong>Programming</strong>: C Language (Pointers, Memory, Structures, Algorithms)</div>
                    <div>&bull; <strong>Database</strong>: SQL (Relational Design, Queries, JOINs, Normalization)</div>
                    <div>&bull; <strong>Web Stack</strong>: HTML5, CSS3, JavaScript (ES6+, DOM Manipulation)</div>
                    <div>&bull; <strong>Soft Skills</strong>: Teamwork, Problem-Solving, Communication, Adaptability</div>
                `;
                break;

            case 'projects':
                response = `
                    <div style="color: #67e8f9; font-weight: bold;">[Featured Projects]</div>
                    <div>1. <strong>Personal Portfolio 2.0</strong>: Live Web Developer showcase deployed on Vercel</div>
                    <div>2. <strong>Student Record Manager</strong>: Structured C application with file I/O & search</div>
                    <div>3. <strong>University Relational DB</strong>: Complex SQL database with enrollment schema</div>
                    <div>4. <strong>JavaScript Mini-Apps Suite</strong>: CGPA calculator, task planner & DOM utilities</div>
                `;
                break;

            case 'contact':
                response = `
                    <div style="color: #fcd34d; font-weight: bold;">[Connect with Nagasri]</div>
                    <div>&bull; Email: <a href="mailto:nagasrimundrathi@gmail.com" style="color: #a78bfa;">nagasrimundrathi@gmail.com</a></div>
                    <div>&bull; Phone: <a href="tel:+919014339557" style="color: #67e8f9;">+91 9014339557</a></div>
                    <div>&bull; LinkedIn: <a href="https://linkedin.com/in/nagasri-mundrathi" target="_blank" style="color: #67e8f9;">linkedin.com/in/nagasri-mundrathi</a></div>
                    <div>&bull; GitHub: <a href="https://github.com/nagasri-45" target="_blank" style="color: #67e8f9;">github.com/nagasri-45</a></div>
                `;
                break;

            case 'resume':
                response = `
                    <div style="color: #6ee7b7;">Opening verified resume: Nagasri_Mundrathi_Resume.pdf...</div>
                `;
                window.open('Nagasri_Mundrathi_Resume.pdf', '_blank');
                break;

            case 'whoami':
                response = `
                    <div><strong>User:</strong> Mundrathi Nagasri</div>
                    <div><strong>Title:</strong> First-Year B.Tech Computer Science & Engineering Student</div>
                    <div><strong>Institution:</strong> Anurag University, Hyderabad, India</div>
                    <div><strong>Status:</strong> Seeking Software & Web Development Internships</div>
                `;
                break;

            case 'clear':
                output.innerHTML = '';
                return;

            default:
                response = `
                    <div style="color: #f87171;">command not found: "${cmd}". Type <span style="color: #67e8f9">help</span> for a list of available commands.</div>
                `;
                break;
        }

        const entry = document.createElement('div');
        entry.innerHTML = `
            <div style="color: #94a3b8; margin-top: 10px;">
                <span style="color: #a78bfa;">nagasri@portfolio:~$</span> ${cmd}
            </div>
            <div style="margin-top: 4px; padding-left: 12px; border-left: 2px solid rgba(139, 92, 246, 0.4);">${response}</div>
        `;
        output.appendChild(entry);

        const terminalBody = document.getElementById('terminal-body');
        if (terminalBody) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }
}

/* ==========================================================================
   7. Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
            });
        });
    }
}

/* ==========================================================================
   8. Project Detail Modals
   ========================================================================== */
const projectDetails = {
    'student-manager': {
        title: 'Student Record Management System (in C)',
        category: 'C Language & Systems Programming',
        description: 'A modular, memory-efficient application written in standard C designed to manage institutional student records with zero runtime database dependencies.',
        features: [
            'Dynamic array & pointer arithmetic for student structs',
            'Persistent storage using binary file handling (fread/fwrite)',
            'Instant search by Roll Number and Student Name with linear & binary search algorithms',
            'Grade point average computation and academic standing reports',
            'Robust input validation preventing buffer overflows'
        ],
        techStack: ['C Language', 'GCC Compiler', 'Binary File I/O', 'Structures & Pointers', 'Data Sorting'],
        githubLink: 'https://github.com/nagasri-45'
    },
    'sql-schema': {
        title: 'University Relational Database Schema',
        category: 'Relational Database Architecture',
        description: 'An enterprise-grade normalized relational schema for university management encompassing student enrollments, faculty workloads, prerequisite verification, and semester grading.',
        features: [
            'Normalized to Third Normal Form (3NF) to eliminate data redundancy',
            'Foreign key constraints enforcing referential integrity across 6 entity tables',
            'Complex multi-table INNER and LEFT JOIN queries for department-wise performance reports',
            'Stored procedures & views for rapid transcript generation',
            'Aggregation metrics for semester GPA distributions'
        ],
        techStack: ['SQL', 'Relational Modeling', 'Foreign Keys', 'JOINs', 'Subqueries', 'Views'],
        githubLink: 'https://github.com/nagasri-45'
    },
    'web-calc': {
        title: 'Semester CGPA & Academic Utilities Suite',
        category: 'Vanilla JavaScript & DOM Application',
        description: 'A fast, responsive web application enabling university students to project and calculate semester grade points based on custom course credits and grading scales.',
        features: [
            'Instant real-time calculations via DOM input listeners',
            'Local storage integration to persist user entries across sessions',
            'Dynamic addition and deletion of course rows',
            'Mobile-responsive layout optimized with modern CSS flexbox & grid'
        ],
        techStack: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Local Storage', 'Responsive Design'],
        githubLink: 'https://github.com/nagasri-45'
    },
    'ds-c': {
        title: 'Data Structures Lab in C',
        category: 'Computer Science Core Fundamentals',
        description: 'A collection of foundational data structures developed in C to master low-level memory allocation, pointer manipulation, and runtime complexity.',
        features: [
            'Singly and Doubly Linked Lists with insertion, deletion, and reverse operations',
            'Stack implementation with array and linked list representation (infix to postfix converter)',
            'Circular Queue and Priority Queue implementations',
            'Memory leak tracking via explicit free() invocations'
        ],
        techStack: ['C', 'Pointers', 'Dynamic Memory Allocation (malloc/free)', 'Algorithms', 'Big-O Analysis'],
        githubLink: 'https://github.com/nagasri-45'
    },
    'sql-playground': {
        title: 'In-Browser SQL Query Playground',
        category: 'Educational Web Tool',
        description: 'An interactive client-side visualizer that lets students execute simulated SQL statements directly within the web browser without any database server installation.',
        features: [
            'Parses simulated SELECT, WHERE, and ORDER BY queries',
            'Renders data in real-time responsive HTML tables',
            'Pre-loaded sample dataset featuring Anurag University CSE students',
            'Clear query feedback and visual highlights'
        ],
        techStack: ['JavaScript', 'HTML5', 'CSS3', 'DOM APIs', 'Simulation Engine'],
        githubLink: 'https://github.com/nagasri-45'
    }
};

window.openModal = function(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-content');
    if (!modal || !content) return;

    let featuresHtml = '';
    data.features.forEach(f => {
        featuresHtml += `<li style="margin-bottom: 8px; color: #cbd5e1;">&bull; ${f}</li>`;
    });

    let tagsHtml = '';
    data.techStack.forEach(t => {
        tagsHtml += `<span class="tech-tag">${t}</span>`;
    });

    content.innerHTML = `
        <span class="tag-badge" style="margin-bottom: 8px;">${data.category}</span>
        <h2 style="font-size: 1.5rem; font-weight: 800; color: #ffffff; margin-bottom: 12px;">${data.title}</h2>
        <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin-bottom: 18px;">${data.description}</p>
        
        <h4 style="font-size: 0.9rem; font-family: var(--font-mono); color: #a78bfa; margin-bottom: 8px; text-transform: uppercase;">Key Architectural Features</h4>
        <ul style="list-style: none; padding-left: 4px; font-size: 0.88rem; margin-bottom: 20px;">
            ${featuresHtml}
        </ul>

        <h4 style="font-size: 0.9rem; font-family: var(--font-mono); color: #67e8f9; margin-bottom: 8px; text-transform: uppercase;">Technologies Employed</h4>
        <div class="tech-tags" style="margin-bottom: 24px;">
            ${tagsHtml}
        </div>

        <div style="display: flex; gap: 12px; border-top: 1px solid var(--border-light); padding-top: 20px;">
            <a href="${data.githubLink}" target="_blank" class="btn btn-primary" style="flex: 1;">
                <i class="fa-brands fa-github"></i> View on GitHub
            </a>
            <button onclick="closeModal()" class="btn btn-secondary" style="flex: 1;">Close</button>
        </div>
    `;

    modal.classList.add('open');
};

window.closeModal = function() {
    const modal = document.getElementById('project-modal');
    if (modal) modal.classList.remove('open');
};

// Close modal on click outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        closeModal();
    }
});

/* ==========================================================================
   9. Copy to Clipboard & Toast
   ========================================================================== */
window.copyToClipboard = function(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied "${text}" to clipboard!`);
        if (btnElement) {
            const originalHTML = btnElement.innerHTML;
            btnElement.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
            setTimeout(() => {
                btnElement.innerHTML = originalHTML;
            }, 1800);
        }
    }).catch(err => {
        console.error('Failed to copy', err);
    });
};

function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

/* ==========================================================================
   10. Contact Form Submission
   ========================================================================== */
window.handleContactSubmit = function(e) {
    e.preventDefault();

    const name = document.getElementById('sender-name').value;
    const email = document.getElementById('sender-email').value;
    const subject = document.getElementById('sender-subject').value || 'Internship Opportunity for Nagasri';
    const message = document.getElementById('sender-message').value;

    // Construct Mailto Link
    const mailtoBody = encodeURIComponent(
        `Hi Nagasri,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`
    );
    const mailtoUrl = `mailto:nagasrimundrathi@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

    showToast('Launching your email client to send message to Nagasri...');
    
    setTimeout(() => {
        window.location.href = mailtoUrl;
    }, 600);
};
