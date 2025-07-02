// Navigation functionality
let activeSection = 'intro';
let mobileMenuOpen = false;

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
    }
}

function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuOpen) {
        mobileMenu.classList.add('active');
    } else {
        mobileMenu.classList.remove('active');
    }
}

function closeMobileMenu() {
    mobileMenuOpen = false;
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
}

// Scroll spy functionality
function handleScroll() {
    const sections = ['intro', 'experience', 'history', 'clients', 'contact'];
    const scrollPosition = window.scrollY + 100;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop;
            const offsetBottom = offsetTop + section.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                if (activeSection !== sectionId) {
                    activeSection = sectionId;
                    updateActiveNavLink(sectionId);
                }
            }
        }
    });
}

function updateActiveNavLink(sectionId) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section link
    document.querySelectorAll(`[data-section="${sectionId}"]`).forEach(link => {
        link.classList.add('active');
    });
}

// Format text with line breaks and styling
function formatDescription(description) {
    return description
        .replace(/v\d+\.\d+/g, match => `${match}<br/>`)
        .replace(/capabilities,/g, 'capabilities,<br/>')
        .replace(/functionality,/g, 'functionality,<br/>')
        .replace(/solution,/g, 'solution,<br/>')
        .replace(/ozcWebBase, IR_SHOP/g, 'ozcWebBase,<br/>IR_SHOP')
        .replace(/ozcShop, IR_SHOP_T/g, 'ozcShop,<br/>IR_SHOP_T');
}

// Format project titles with styled keywords
function formatProjectTitle(title) {
    const typeKeywords = [
        'E-COMMERCE SITE & APPLICATION & MANAGEMENT SYSTEM',
        'E-COMMERCE SITE & WEBSITE',
        'WEBSITE & MANAGEMENT SYSTEM',
        'APPLICATION MANAGEMENT SYSTEM',
        'INTEGRATED MANAGEMENT SYSTEM',
        'INFORMATION SYSTEM',
        'E-COMMERCE SITE',
        'MOBILE APPLICATION',
        'SURVEY SYSTEM',
        'PROMOTION SITE',
        'MANAGEMENT SYSTEM',
        'APPLICATION',
        'WEBSITE PROPOSAL',
        'EXHIBITION VIDEO',
        'PT MADE BY FLASH',
        'MADE BY FLASH',
        'NEWS SITE',
        'PROTOTYPE',
        'WEBZINE',
        'WEBSITE',
        'SYSTEM',
        '(AOS,IOS)',
        '(AOS, IOS)'
    ];
    
    // Sort by length (longest first) to match longer phrases first
    const sortedKeywords = typeKeywords.sort((a, b) => b.length - a.length);
    
    let formattedTitle = title;
    sortedKeywords.forEach(keyword => {
        if (formattedTitle.includes(keyword)) {
            formattedTitle = formattedTitle.replace(
                keyword, 
                `<span class="project-type">${keyword}</span>`
            );
        }
    });
    
    return formattedTitle;
}

// Load projects data
function loadProjects() {
    const container = document.getElementById('projectsContainer');
    
    projectData.forEach(group => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-header">
                <div class="project-period">
                    <div class="period-badge">${group.period}</div>
                    <div class="motto-badge">${group.motto}</div>
                </div>
            </div>
            <div class="project-content">
                <div class="projects-list">
                    ${group.projects.map(project => `
                        <div class="project-item">
                            <div class="project-title">${formatProjectTitle(project.title)}</div>
                            ${project.description ? `<div class="project-description">${project.description}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        container.appendChild(projectCard);
    });
}

// Load timeline data
function loadTimeline() {
    const container = document.getElementById('timelineContainer');
    
    historyData.forEach((yearData, index) => {
        const isLeft = index % 2 === 0;
        
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-card">
                    <div class="timeline-header">
                        <div class="timeline-year-company">
                            <div class="timeline-year">${yearData.year}</div>
                            <div class="company-badge">${yearData.company}</div>
                        </div>
                    </div>
                    <div class="timeline-content-body">
                        <div class="timeline-events">
                            ${yearData.events.map(event => `
                                <div class="timeline-event">
                                    <div class="event-title">${event.title}</div>
                                    <div class="event-description">${formatDescription(event.description)}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(timelineItem);
    });
}

// Load clients data
function loadClients() {
    // Load marquee content
    const marqueeContainer = document.getElementById('marqueeContent');
    const duplicatedClients = [...clientsData, ...clientsData];
    
    duplicatedClients.forEach((client, index) => {
        const marqueeItem = document.createElement('div');
        marqueeItem.className = 'marquee-item';
        marqueeItem.innerHTML = `
            <img src="${client.logo}" alt="${client.name}" class="marquee-logo">
            <span class="marquee-separator">|</span>
        `;
        marqueeContainer.appendChild(marqueeItem);
    });
    
    // Load static grid
    const gridContainer = document.getElementById('clientsGrid');
    clientsData.forEach(client => {
        const clientCard = document.createElement('div');
        clientCard.className = 'client-card';
        clientCard.innerHTML = `
            <img src="${client.logo}" alt="${client.name}" class="client-logo">
        `;
        gridContainer.appendChild(clientCard);
    });
}

// Three.js Scene Setup
function setupThreeScene() {
    const canvas = document.getElementById('threeCanvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.8);
    
    // Create rain drops
    const rainDrops = [];
    const rainGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const rainMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x87ceeb, 
        transparent: true, 
        opacity: 0.6 
    });
    
    // Create multiple rain drops
    for (let i = 0; i < 200; i++) {
        const rainDrop = new THREE.Mesh(rainGeometry, rainMaterial);
        rainDrop.position.x = (Math.random() - 0.5) * 20;
        rainDrop.position.y = Math.random() * 20;
        rainDrop.position.z = (Math.random() - 0.5) * 20;
        rainDrop.userData = {
            speed: Math.random() * 0.02 + 0.01,
            delay: Math.random() * 2000
        };
        scene.add(rainDrop);
        rainDrops.push(rainDrop);
    }
    
    // Create stars
    const starGeometry = new THREE.SphereGeometry(0.01, 6, 6);
    const starMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.8 
    });
    
    for (let i = 0; i < 100; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        star.position.x = (Math.random() - 0.5) * 50;
        star.position.y = (Math.random() - 0.5) * 50;
        star.position.z = (Math.random() - 0.5) * 50;
        scene.add(star);
    }
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        const currentTime = Date.now();
        
        // Animate rain drops
        rainDrops.forEach(drop => {
            if (currentTime > drop.userData.delay) {
                drop.position.y -= drop.userData.speed;
                
                if (drop.position.y < -10) {
                    drop.position.y = 10;
                    drop.position.x = (Math.random() - 0.5) * 20;
                }
            }
        });
        
        // Rotate the scene slightly
        scene.rotation.y += 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', handleResize);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load content
    loadProjects();
    loadTimeline();
    loadClients();
    
    // Setup Three.js scene
    setupThreeScene();
    
    // Setup scroll spy
    window.addEventListener('scroll', handleScroll);
    
    // Initial scroll spy check
    handleScroll();
    
    console.log('inRAIN static website loaded successfully!');
});