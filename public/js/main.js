// انيميشن عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثير fade in للعناصر
    const elements = document.querySelectorAll('.card, .btn, .form-control');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // تأثير للأيقونات
    const icons = document.querySelectorAll('.user-icon, .avatar');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'bounce 0.6s ease';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.animation = '';
        });
    });

    // تأثير للنماذج
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const button = form.querySelector('button[type="submit"]');
            if (button) {
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
                button.disabled = true;
            }
        });
    });

    // تأثير للرسائل
    const messages = document.querySelectorAll('.card p');
    messages.forEach((msg, index) => {
        msg.style.opacity = '0';
        setTimeout(() => {
            msg.style.transition = 'opacity 1s ease';
            msg.style.opacity = '1';
        }, 1000 + index * 500);
    });

    // تأثير للأزرار عند النقر
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // تأثير للـ modal
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            const content = modal.querySelector('.modal-content');
            content.style.animation = 'modalBounce 0.5s ease';
        });
    });

// إضافة تأثير للخلفية عند التمرير
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const body = document.body;
        body.style.backgroundPosition = `0% ${scrolled * 0.5}px`;

        // تأثير للـ navbar
        const navbar = document.querySelector('.navbar');
        if (scrolled > 50) {
            navbar.style.background = 'rgba(16, 187, 179, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, rgba(16, 187, 179, 0.9), rgba(13, 163, 156, 0.9))';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });

    // تأثير للأيقونات المتحركة
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });

    // تأثير للنماذج عند التركيز
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // تأثير للرسائل عند الظهور
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.message-card, .card').forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });

    // تأثير للأزرار عند الضغط
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && document.activeElement.tagName === 'INPUT') {
            const btn = document.activeElement.closest('form').querySelector('button');
            if (btn) {
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
            }
        }
    });
});

// إضافة keyframes للـ bounce
const style = document.createElement('style');
style.textContent = `
@keyframes bounce {
    0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
    40%, 43% { transform: translate3d(0, -30px, 0); }
    70% { transform: translate3d(0, -15px, 0); }
    90% { transform: translate3d(0, -4px, 0); }
}

@keyframes modalBounce {
    0% { transform: scale(0.5); opacity: 0; }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
}
`;
document.head.appendChild(style);