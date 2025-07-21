document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('date-buttons-container');
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const today = new Date();
    const todayString = today.toDateString(); // For comparison

    // Create buttons for the next 7 days
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const button = document.createElement('button');
        button.className = 'c1-date';
        button.innerHTML = `
      <span class="buttontitle">${date.getDate()} ${months[date.getMonth()].toLowerCase()}</span><br>
      <span class="buttonsubtitle">${daysOfWeek[date.getDay()].toLowerCase()}</span>
    `;

        // Store the full date as data attribute
        button.dataset.fullDate = date.toISOString();

        // Check if this is today's date
        if (date.toDateString() === todayString) {
            button.classList.add('selected');
        }

        // Click handler
        button.addEventListener('click', function() {
            // Remove selection from all buttons
            document.querySelectorAll('.c1-date').forEach(btn => {
                btn.classList.remove('selected');
            });

            // Add selection to clicked button
            this.classList.add('selected');
        });

        container.appendChild(button);
    }
});

// Define page flow order
const PAGE_FLOW = ['c1-pg-1', 'c1-pg-2', 'c1-pg-3', 'c1-pg-4']; // Add all your page classes

function navigateToNextSection() {
    // Find current active section
    const currentSection = document.querySelector('.main-section.active');
    if (!currentSection) return;

    // Get current page class (e.g., 'c1-pg-1')
    const currentPageClass = Array.from(currentSection.classList)
        .find(cls => cls.startsWith('c1-pg-'));

    // Find next page in flow
    const currentIndex = PAGE_FLOW.indexOf(currentPageClass);
    const nextPageClass = PAGE_FLOW[currentIndex + 1];

    // If we're at the end, loop or disable (your choice)
    if (!nextPageClass) {
        console.log('Last page reached');
        return;
    }

    // Switch active classes
    currentSection.classList.remove('active');

    const nextSection = document.querySelector(`.${nextPageClass}`);
    if (nextSection) {
        nextSection.classList.add('active');

        // Optional: Scroll to top of new section
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Example usage in your buttons:
document.querySelectorAll('.next-button').forEach(button => {
    button.addEventListener('click', navigateToNextSection);
});