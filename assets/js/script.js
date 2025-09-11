//navbar
document.addEventListener('DOMContentLoaded', function() {
    const toggleSidebar = document.querySelector('.nav-toggle-btn');
const navbar = document.querySelector('.navbar');

toggleSidebar.onclick = function() {
    navbar.classList.toggle('active');
}
});


// Funzione elemento date

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

// Funzione Next Page

const PAGE_FLOW = ['c1-pg-1', 'c1-pg-2', 'c1-pg-3', 'c1-pg-4', 'c1-pg-5', 'c1-pg-6', 'c1-pg-7', 'c1-pg-8']; // Add all your page classes

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


// Funzione counter

// Initialize all counters on the page
function initCounters() {
    // Find all counter containers
    const counterContainers = document.querySelectorAll('.counter');

    console.log(`Found ${counterContainers.length} counter containers`);

    // Check if any counters were found
    if (counterContainers.length === 0) {
        console.error('No counter containers found with class "counter"');
        return;
    }

    counterContainers.forEach((container, index) => {
        console.log(`Processing counter #${index + 1}`, container);

        // Find elements within this specific counter container using CLASSES
        const minusBtn = container.querySelector('.minus-btn');
        const plusBtn = container.querySelector('.plus-btn');
        const inputField = container.querySelector('.counter-input');

        // Debug: Check if elements exist
        console.log(`Counter #${index + 1} - minusBtn:`, minusBtn);
        console.log(`Counter #${index + 1} - plusBtn:`, plusBtn);
        console.log(`Counter #${index + 1} - inputField:`, inputField);

        // Skip this counter if any element is missing
        if (!minusBtn) {
            console.error(`Counter #${index + 1} is missing minus button with class 'minus-btn'`);
        }
        if (!plusBtn) {
            console.error(`Counter #${index + 1} is missing plus button with class 'plus-btn'`);
        }
        if (!inputField) {
            console.error(`Counter #${index + 1} is missing input field with class 'counter-input'`);
        }

        if (!minusBtn || !plusBtn || !inputField) {
            console.error(`Counter #${index + 1} skipped due to missing elements`);
            return;
        }

        // Initialize counter value
        let count = 0;

        // Update the input field
        function updateCounter() {
            inputField.value = count;
            console.log(`Counter #${index + 1} updated to:`, count);
        }

        // Event listeners for buttons
        minusBtn.addEventListener('click', () => {
            console.log(`Counter #${index + 1} minus button clicked`);
            if (count > 0) {
                count--;
                updateCounter();
            } else {
                console.log(`Counter #${index + 1} already at minimum value (0)`);
            }
        });

        plusBtn.addEventListener('click', () => {
            console.log(`Counter #${index + 1} plus button clicked`);
            count++;
            updateCounter();
        });

        // Initialize the counter display
        updateCounter();

        console.log(`Counter #${index + 1} initialized successfully`);
    });
}

// Initialize counters when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
} else {
    // DOM is already ready
    initCounters();
}


// ------KEYBOARD-------

document.addEventListener('DOMContentLoaded', function() {
    var $keyboardWrapper = $('.virtual-keyboard'),
    $key = $keyboardWrapper.find("input"),
    $key_delete = $('.delete'),
    $key_shift = $('.shift'),
    $outputField = $('.output input'),
    $currentValue = $outputField.val(),
    actionKeys = $(".delete,.shift")
    activeShiftClass = "shift-activated";

    
    window.onload = function() {
        document.getElementById('.output input').reset();
    }

    // handle keystrokes
    function _keystroke(keyCase){
    
    $key.not(actionKeys).on('click',function(e){
        e.preventDefault();
        
        // check for shift key for upper
        if($key_shift.hasClass(activeShiftClass)){
        keyCase = 'upper';
        $key_shift.removeClass(activeShiftClass);
        }else{
        keyCase = 'lower';
        }
        
        // handle case
        if(keyCase == 'upper'){
        var keyValue = $(this).val().toUpperCase();
        }else{
        var keyValue = $(this).val().toLowerCase();
        }
        
        // grab current value
        var output = $('.output input').val();
            $outputField.val(output + keyValue);
            getCurrentVal();
            focusOutputField();
    });
    
    } // keystroke
    
    // delete
    $key_delete.on('click',function(e){
    e.preventDefault();
    $outputField.val($currentValue.substr(0,$currentValue.length - 1));
    getCurrentVal();
    focusOutputField();
    });

    // shift
    $key_shift.on('click',function(e){
    e.preventDefault();
    $(this).toggleClass(activeShiftClass);
    });

    // grab current value of typed text
    function getCurrentVal(){
    $currentValue = $outputField.val();
    }

    // focus for cursor hack
    function focusOutputField(){
    $outputField.focus();
    }

    _keystroke("lower"); // init keystrokes
});
