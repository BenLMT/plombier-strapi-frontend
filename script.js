// Initialize Lucide icons
lucide.createIcons();

// Form focus function
function focusForm() {
    document.getElementById('urgentForm').scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
        const firstInput = document.querySelector('#urgentForm input[name="prenom"]');
        if (firstInput) firstInput.focus();
    }, 800);
}

// Problem selection handling
document.querySelectorAll('.problem-choice input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function() {
        // Remove selection from all choices
        document.querySelectorAll('.choice-card').forEach(card => {
            card.classList.remove('border-red-500', 'bg-red-50');
            card.classList.add('border-gray-200');
        });
        // Apply selection to chosen option
        const selectedCard = this.nextElementSibling;
        selectedCard.classList.remove('border-gray-200');
        selectedCard.classList.add('border-red-500', 'bg-red-50');
    });
});

// Enhanced form submission
document.getElementById('urgentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 inline mr-2 animate-spin"></i>Envoi en cours...';
    submitBtn.disabled = true;
    lucide.createIcons();

    // Collect form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Simulate API call
    setTimeout(() => {
        // Replace form with success message
        this.innerHTML = `
            <div class="text-center py-8 animate-slide-in">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i data-lucide="check-circle" class="w-12 h-12 text-green-600"></i>
                </div>
                <h3 class="text-2xl font-black text-gray-900 mb-4">✅ Demande envoyée avec succès !</h3>
                <p class="text-gray-600 mb-6 leading-relaxed text-lg">
                    <strong>Mon équipe vous contacte dans les 2 prochaines minutes</strong><br>
                    Un technicien sera chez vous dans les plus brefs délais.
                </p>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div class="font-bold text-blue-800">En attendant, n'hésitez pas à nous appeler directement pour toute question :</div>
                    <a href="tel:0143380323" class="text-xl font-black text-blue-600 hover:underline">01.43.38.03.23</a>
                </div>
            </div>
        `;
        lucide.createIcons();
    }, 1500);
});

// FAQ Toggle
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');

    if (content.classList.contains('hidden')) {
        // Close all other FAQs
        document.querySelectorAll('.faq-content').forEach(item => {
            if (item !== content) {
                item.classList.add('hidden');
                item.previousElementSibling.querySelector('i').classList.remove('rotate-180');
            }
        });
        // Open the clicked one
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}
