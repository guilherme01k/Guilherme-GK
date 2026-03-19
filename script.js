// Script Moderno para GuilhermeGK

document.addEventListener('DOMContentLoaded', function() {
    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.card, .product-card, .news-card');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Add scroll reveal class
    revealElements.forEach(element => {
        element.classList.add('scroll-reveal');
    });
    
    // Initial check
    revealOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', revealOnScroll);
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navUl = document.querySelector('nav ul');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navUl.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Product Card Hover Effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // WhatsApp Button Click Tracking
    const whatsappButtons = document.querySelectorAll('.whatsapp-button');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Adiciona efeito de clique
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Log de clique (opcional)
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            console.log(`WhatsApp clicked for: ${productName}`);
        });
    });
    
    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });
    
    // Loading Animation for Videos
    const videoContainers = document.querySelectorAll('.video-container iframe');
    
    videoContainers.forEach(iframe => {
        iframe.addEventListener('load', function() {
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.transition = 'opacity 0.5s ease';
                this.style.opacity = '1';
            }, 100);
        });
    });
    
    // Form Validation (se houver formulários)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = '<span class="loading"></span> Enviando...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    submitButton.innerHTML = 'Enviar';
                    submitButton.disabled = false;
                    showNotification('Mensagem enviada com sucesso!', 'success');
                }, 2000);
            }
        });
    });
    
    // Notification System
    function showNotification(message, type = 'info') {
        // Remove notificações existentes
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Cria nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        `;
        
        // Cor baseada no tipo
        switch(type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
                break;
            case 'info':
                notification.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
                break;
        }
        
        // Adiciona ao DOM
        document.body.appendChild(notification);
        
        // Animação de entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Performance Optimization - Debounce
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Aplica debounce aos eventos de scroll
    window.addEventListener('scroll', debounce(revealOnScroll, 100));
    
    // Lazy Loading para Imagens
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Console Log para Debug
    console.log('🥅 GuilhermeGK - Site Carregado com Sucesso!');
    console.log('🚀 Todos os sistemas funcionando perfeitamente!');
});

// Adiciona CSS para animações
const style = document.createElement('style');
style.textContent = `
    .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    .scroll-reveal.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    @media (max-width: 768px) {
        nav ul.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            padding: 2rem;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
        
        nav ul:not(.active) {
            display: none;
        }
    }
`;
document.head.appendChild(style);
