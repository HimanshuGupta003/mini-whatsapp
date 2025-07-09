document.addEventListener("DOMContentLoaded", function() {
    const deleteForms = document.querySelectorAll('.delete-form');
    deleteForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!confirm("Are you sure you want to permanently delete this chat?")) {
                e.preventDefault();
            }
        });
    });

    // Call these functions to activate loading and animation
    hideLoading();
    initAnimations();
});

// Toggle dropdown menus
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = btn.nextElementSibling;
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (menu !== dropdown) {
                menu.classList.remove('active');
            }
            });
            
            dropdown.classList.toggle('active');
        });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
        });
        });

        // Prevent dropdown from closing when clicking inside
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

function initAnimations() {
    // Animate chat items on load
    document.querySelectorAll('.chat-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 1000); // 1 second delay for effect
    }
}