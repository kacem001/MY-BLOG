// Wait for DOM to fully load before running script
document.addEventListener('DOMContentLoaded', function () {
    // 1. Dark mode toggle functionality
    setupDarkModeToggle();

    // 2. Smooth scrolling for navigation
    setupSmoothScrolling();

    // 3. Fetch blog posts from API
    fetchPosts();

    // 4. Contact form validation and submission
    setupFormValidation();

    // 5. Setup blog post creation form
    setupPostCreationForm();

    // 6. Setup sentiment analysis functionality
    setupSentimentAnalysis();
    createPostForm();
    // 7. Setup chatbot functionality
    setupChatbot();
    setupGeminiAI();

});

// Function to fetch posts from the API
function fetchPosts() {
    fetch('/articles')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(posts => {
            if (posts && posts.length) {
                updatePostsInDOM(posts);
                setupReadMoreToggles();
                setupLikeButtons();
            }
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
}

// Function to update posts in the DOM
function updatePostsInDOM(posts) {
    console.log('Posts received:', posts);
    const container = document.querySelector('.article-blocks');
    if (!container) return;

    posts.forEach(post => {
        const formattedContent = formatContent(post.content);
        const postElement = document.createElement('article');
        postElement.className = 'article-block blog-post';
        postElement.innerHTML = `
            <div class="article-image">
                <img src="${post.image || 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}" alt="${post.title}">
            </div>
            <h2>${post.title}</h2>
            <div class="post-content">
                ${formattedContent}
            </div>
            <ul class="post-tags">
                ${post.tags ? post.tags.map(tag => `
                    <li class="clickable-tag" data-tag="${tag}">${tag}</li>
                `).join('') : ''}
            </ul>
            <div class="post-actions">
                <button class="read-more-btn">Read More</button>
                <button class="like-btn">
                    <span class="heart-icon">❤️</span>
                    <span>Like</span>
                    <span class="like-count">${post.likes || 0}</span>
                </button>
                <a class="read-article-btn" href="article.html?id=${post.id}">Read Article</a>
            </div>
        `;

        // No click event needed; tags are just visual now

        container.appendChild(postElement);
    });
}

// Helper function to format content with paragraphs
function formatContent(content) {
    // Split content by newlines and create paragraphs
    if (!content) return '';

    return content.split('\n\n')
        .filter(para => para.trim() !== '')
        .map(para => `<p>${para}</p>`)
        .join('');
}

// --------- DARK MODE TOGGLE ---------
function setupDarkModeToggle() {
    // Remove old button if exists
    let oldBtn = document.querySelector('.dark-mode-toggle');
    if (oldBtn) oldBtn.remove();

    // Remove old container if exists
    let oldContainer = document.querySelector('.theme-switch-container');
    if (oldContainer) oldContainer.remove();

    // Create container
    const container = document.createElement('div');
    container.className = 'theme-switch-container';

    // Create label
    const label = document.createElement('label');
    label.className = 'theme-switch';

    // Create checkbox
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'theme-toggle';

    // Create slider
    const slider = document.createElement('span');
    slider.className = 'slider';

    // Assemble
    label.appendChild(input);
    label.appendChild(slider);
    container.appendChild(label);
    document.body.appendChild(container);

    // Restore saved theme
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-mode');
        input.checked = true;
    }

    // Toggle theme on change
    input.addEventListener('change', function () {
        if (input.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });
}

// --------- SMOOTH SCROLLING ---------
function setupSmoothScrolling() {
    // Select all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll smoothly to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --------- BLOG POST READ MORE ---------
function setupReadMoreToggles() {
    const blogPosts = document.querySelectorAll('.blog-post');

    blogPosts.forEach(post => {
        setupReadMoreToggle(post);
    });
}

// Helper function to set up read more toggle for a single post
function setupReadMoreToggle(post) {
    const content = post.querySelector('.post-content');
    const readMoreBtn = post.querySelector('.read-more-btn');

    if (content && readMoreBtn) {
        // Initially collapse content
        content.classList.add('collapsed');

        // Add click event to toggle visibility
        readMoreBtn.addEventListener('click', function () {
            content.classList.toggle('collapsed');
            readMoreBtn.textContent = content.classList.contains('collapsed') ? 'Read More' : 'Read Less';
        });
    }
}

// --------- LIKE BUTTON FUNCTIONALITY ---------
function setupLikeButtons() {
    const blogPosts = document.querySelectorAll('.blog-post');

    blogPosts.forEach(post => {
        setupLikeButton(post);
    });
}

// Helper function to set up like button for a single post
function setupLikeButton(post) {
    const likeBtn = post.querySelector('.like-btn');
    const likeCount = post.querySelector('.like-count');

    if (likeBtn && likeCount) {
        likeBtn.addEventListener('click', function () {
            // Toggle liked state
            likeBtn.classList.toggle('liked');

            // Update like count
            let count = parseInt(likeCount.textContent);
            if (likeBtn.classList.contains('liked')) {
                likeCount.textContent = count + 1;
            } else {
                likeCount.textContent = Math.max(0, count - 1);
            }
        });
    }
}

// --------- CONTACT FORM VALIDATION ---------
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate each field
            let isValid = true;

            if (!validateField(nameInput, 'Please enter your name')) {
                isValid = false;
            }

            if (!validateField(emailInput, 'Please enter a valid email address', validateEmail)) {
                isValid = false;
            }

            if (!validateField(messageInput, 'Please enter your message')) {
                isValid = false;
            }

            // If form is valid, submit
            if (isValid) {
                // Here you would normally send the data to your server
                // For now, we'll just show a success message
                showPopup('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });

        // Add real-time validation on blur
        [nameInput, emailInput, messageInput].forEach(field => {
            field.addEventListener('blur', function () {
                if (field === emailInput) {
                    validateField(field, 'Please enter a valid email address', validateEmail);
                } else {
                    validateField(field, `Please enter your ${field.name}`);
                }
            });
        });
    }
}

// Helper function to validate form fields
function validateField(field, errorMessage, validationFn = null) {
    const value = field.value.trim();
    let isValid = true;

    // Check if empty
    if (value === '') {
        isValid = false;
    }
    // If validation function is provided, check using that
    else if (validationFn && !validationFn(value)) {
        isValid = false;
    }

    // Show or clear error based on validation
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        field.classList.remove('invalid');

        // Remove error message if it exists
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    return isValid;
}

// Helper function to show field error
function showFieldError(field, message) {
    field.classList.add('invalid');

    // Check if error message already exists
    let errorElement = field.parentNode.querySelector('.error-message');

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = message;
}

// Helper function to validate email format
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

// Function to show popup message
function showPopup(message) {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'popup';

    popup.innerHTML = `
        <div class="popup-content">
            <p>${message}</p>
            <button class="close-btn">Close</button>
        </div>
    `;

    document.body.appendChild(popup);

    // Show with animation
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);

    // Add click event to close button
    popup.querySelector('.close-btn').addEventListener('click', function () {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
        }, 300);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(popup)) {
            popup.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(popup)) {
                    popup.remove();
                }
            }, 300);
        }
    }, 5000);
}

// --------- POST CREATION FUNCTIONALITY ---------
function setupPostCreationForm() {
    // Instead of creating a button, directly create and display the form
    createPostForm();

}


function createPostForm() {
    // Check if form already exists
    if (document.getElementById('create-post-form')) {
        return;
    }

    // Create form container
    const formContainer = document.createElement('section');
    formContainer.id = 'create-post';
    formContainer.className = 'section';

    formContainer.innerHTML = `
        <h2 class="section-title">Create New Post</h2>
        <article class="article-block contact-block">
            <form class="contact-form" id="create-post-form">
                <div class="form-group">
                    <label for="post-title">Post Title</label>
                    <input type="text" id="post-title" name="title" placeholder="Enter post title" required>
                </div>
                <div class="form-group">
                    <label for="post-content">Post Content</label>
                    <textarea id="post-content" name="content" placeholder="Write your post content here..." required></textarea>
                </div>
                <div class="form-group">
                    <label for="post-tags">Tags (comma separated)</label>
                    <input type="text" id="post-tags" name="tags" placeholder="technology, innovation, etc.">
                </div>
                <div class="form-group">
                    <label for="post-image">Image URL</label>
                    <input type="text" id="post-image" name="image" placeholder="https://example.com/image.jpg">
                </div>
                <button type="submit" class="submit-btn">Publish Post</button>
            </form>
        </article>
    `;

    // Insert after blog section
    const blogSection = document.getElementById('blog');
    blogSection.after(formContainer);

    // Setup form submission
    const postForm = document.getElementById('create-post-form');

    postForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const title = document.getElementById('post-title').value.trim();
        const content = document.getElementById('post-content').value.trim();
        const tagsInput = document.getElementById('post-tags').value.trim();
        const imageUrl = document.getElementById('post-image').value.trim();

        // Validate
        if (!title || !content) {
            showPopup('Please fill in the required fields.');
            return;
        }

        // Process tags
        const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];

        // Create post object
        const newPost = {
            title,
            content,
            tags,
            image: imageUrl,
            date: new Date().toISOString().split('T')[0],
            likes: 0
        };

        // Add post to DOM
        addNewPostToDOM(newPost);

        // Show success message
        showPopup('Your post has been published!');

        // Reset the form instead of removing it
        postForm.reset();
    });
}

// Function to add a new post to the DOM
function addNewPostToDOM(post) {
    const container = document.querySelector('.article-blocks');
    if (!container) return;

    const postElement = document.createElement('article');
    postElement.className = 'article-block blog-post';

    const formattedContent = formatContent(post.content);

    postElement.innerHTML = `
        <div class="article-image">
            <img src="${post.image || 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}" alt="${post.title}">
        </div>
        <h2>${post.title}</h2>
        <div class="post-content">
            ${formattedContent}
        </div>
        <ul>
            ${post.tags.map(tag => `<li>${tag}</li>`).join('')}
        </ul>
        <div class="post-actions">
            <button class="read-more-btn">Read More</button>
            <button class="like-btn">
                <span>Like</span>
                <span class="like-count">${post.likes}</span>
            </button>
        </div>
    `;

    // Add at the beginning of the container
    container.prepend(postElement);

    // Setup interactions for the new post
    setupReadMoreToggle(postElement);
    setupLikeButton(postElement);
}

// Replace the sentiment analysis function with this fixed version
function setupSentimentAnalysis() {
    console.log('Setting up sentiment analysis');
    const sentimentForm = document.getElementById('sentiment-form');
    const sentimentInput = document.getElementById('sentiment-input');
    const sentimentResult = document.getElementById('sentiment-result');

    if (!sentimentForm) {
        console.error('Sentiment form not found!');
        return;
    }

    console.log('Form found, adding event listener');

    sentimentForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        console.log('Form submitted');

        // Get the text from the input field
        const text = sentimentInput.value.trim();
        console.log('Text to analyze:', text);

        // Check if input is empty
        if (!text) {
            sentimentResult.innerHTML = `
                <div class="sentiment-message error">
                    <span class="sentiment-emoji">⚠️</span>
                    <div class="sentiment-result-row">
                        <span class="sentiment-score">Score: 0</span>
                        <span class="sentiment-label">Warning</span>
                    </div>
                    <p class="sentiment-text">Please enter some text to analyze.</p>
                </div>
            `;
            return;
        }

        // Show loading state
        sentimentResult.innerHTML = '<div class="sentiment-loading">Analyzing...</div>';

        try {
            // Send request to server
            console.log('Sending request to /analyze');
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }

            // Get the result
            const result = await response.json();
            console.log('Result received:', result);

            // Explicitly log the score to debug
            console.log('Score from response:', result.score);

            // Ensure score is a number (default to 0 if undefined)
            let score = 0;
            if (result.score !== undefined && result.score !== null) {
                score = Number(result.score);
                if (isNaN(score)) score = 0;
            }
            console.log('Processed score:', score);

            // Determine sentiment label and emoji
            let label = 'Neutral';
            let emoji = result.emoji || '😐';

            if (result.sentiment === 'positive') {
                label = 'Good';
                emoji = result.emoji || '😊';
            } else if (result.sentiment === 'negative') {
                label = 'Bad';
                emoji = result.emoji || '😠';
            }

            // Display the result with the updated format
            sentimentResult.innerHTML = `
                <div class="sentiment-message ${result.sentiment}">
                    <span class="sentiment-emoji">${emoji}</span>
                    <div class="sentiment-result-row">
                        <span class="sentiment-score">Score: ${score}</span>
                        <span class="sentiment-label">${label}</span>
                    </div>
                    <p class="sentiment-text">${result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)}: ${text}</p>
                </div>
            `;
        } catch (error) {
            console.error('Error analyzing sentiment:', error);
            sentimentResult.innerHTML = `
                <div class="sentiment-message error">
                    <span class="sentiment-emoji">❌</span>
                    <div class="sentiment-result-row">
                        <span class="sentiment-score">Score: 0</span>
                        <span class="sentiment-label">Error</span>
                    </div>
                    <p class="sentiment-text">Error analyzing sentiment. Please try again.</p>
                </div>
            `;
        }
    });
}

// --------- CHATBOT FUNCTIONALITY ---------
function setupChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotMessages = document.getElementById('chatbot-messages');

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function () {
        chatbotContainer.classList.toggle('active');
    });

    // Close chatbot
    chatbotClose.addEventListener('click', function () {
        chatbotContainer.classList.remove('active');
    });

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();

        if (message === '') {
            return;
        }

        // Add user message to chat
        const userMessageElement = document.createElement('div');
        userMessageElement.className = 'user-message';
        userMessageElement.textContent = message;
        chatbotMessages.appendChild(userMessageElement);

        // Clear input
        chatbotInput.value = '';

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'bot-message typing';
        typingIndicator.textContent = '...';
        chatbotMessages.appendChild(typingIndicator);

        // Send to server
        fetch('/chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: message }),
        })
            .then(response => response.json())
            .then(data => {
                // Remove typing indicator
                chatbotMessages.removeChild(typingIndicator);

                // Add bot response
                const botMessageElement = document.createElement('div');
                botMessageElement.className = 'bot-message';
                botMessageElement.textContent = data.response;
                chatbotMessages.appendChild(botMessageElement);

                // Scroll to bottom
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            })
            .catch(error => {
                console.error('Error:', error);
                // Remove typing indicator
                chatbotMessages.removeChild(typingIndicator);

                // Add error message
                const errorMessageElement = document.createElement('div');
                errorMessageElement.className = 'bot-message error';
                errorMessageElement.textContent = 'Sorry, I encountered an error. Please try again.';
                chatbotMessages.appendChild(errorMessageElement);

                // Scroll to bottom
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            });
    }

    // Send message on button click
    chatbotButton.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });


}
// --------- GEMINI AI FUNCTIONALITY ---------
function setupGeminiAI() {
    const geminiToggle = document.getElementById('gemini-toggle');
    const geminiContainer = document.getElementById('gemini-container');
    const geminiClose = document.getElementById('gemini-close');
    const geminiInput = document.getElementById('gemini-input');
    const geminiButton = document.getElementById('gemini-button');
    const geminiContent = document.getElementById('gemini-content');

    // Gemini API key
    const GEMINI_API_KEY = 'AIzaSyCbOlb3N_Bru-OKJvl22H1-KGuZmbHULFE';

    // Toggle Gemini container visibility
    geminiToggle.addEventListener('click', function () {
        geminiContainer.classList.toggle('active');
    });

    // Close Gemini container
    geminiClose.addEventListener('click', function () {
        geminiContainer.classList.remove('active');
    });

    // Send query to Gemini API
    function askGemini() {
        const query = geminiInput.value.trim();

        if (query === '') {
            return;
        }

        // Clear input
        geminiInput.value = '';

        // Show loading state
        geminiContent.innerHTML = '<div class="gemini-loading">Getting answer from Gemini...</div>';

        // Call Gemini API directly
        fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: query }]
                }]
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.status);
                }
                return response.json();
            })
            .then(data => {
                // Extract text from the Gemini response
                let responseText = '';
                if (data &&
                    data.candidates &&
                    data.candidates[0] &&
                    data.candidates[0].content &&
                    data.candidates[0].content.parts) {

                    // Extract text from each part
                    responseText = data.candidates[0].content.parts
                        .map(part => part.text || '')
                        .join('\n');
                }

                // Format and display the response
                geminiContent.innerHTML = `
                <p><strong>Your question:</strong> ${query}</p>
                <div class="gemini-response">${responseText || 'No response from Gemini.'}</div>
            `;
            })
            .catch(error => {
                console.error('Error:', error);
                geminiContent.innerHTML = `
                <p><strong>Your question:</strong> ${query}</p>
                <div class="gemini-response">
                    Sorry, I encountered an error when calling the Gemini API. Please try again.
                </div>
            `;
            });
    }

    // Send query on button click
    geminiButton.addEventListener('click', askGemini);

    // Send query on Enter key
    geminiInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            askGemini();
        }
    });
}

// Add this after the updatePostsInDOM function

function findRelatedPosts(currentPost, allPosts) {
    // Filter out the current post and find posts with matching tags
    return allPosts
        .filter(post => post.title !== currentPost.title)
        .map(post => {
            const matchingTags = post.tags.filter(tag =>
                currentPost.tags.includes(tag)
            );
            return {
                ...post,
                matchingTagsCount: matchingTags.length
            };
        })
        .filter(post => post.matchingTagsCount > 0)
        .sort((a, b) => b.matchingTagsCount - a.matchingTagsCount)
        .slice(0, 3); // Get top 3 related posts
}

function showRelatedPosts(currentPost, relatedPosts) {
    // Remove any existing popup first
    const existingPopup = document.querySelector('.popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    const relatedPostsHTML = `
        <div class="related-posts">
            <div class="popup-header">
                <h3>Related Articles</h3>
                <button class="close-btn" aria-label="Close">&times;</button>
            </div>
            <div class="related-posts-scrollable">
                <div class="related-posts-container">
                    ${relatedPosts.map(post => `
                        <div class="related-post">
                            <img src="${post.image || 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}" alt="${post.title}">
                            <h4>${post.title}</h4>
                            <p>${post.content.substring(0, 100)}...</p>
                            <div class="related-post-tags">
                                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    const modal = document.createElement('div');
    modal.className = 'popup';
    modal.innerHTML = `<div class="popup-content">${relatedPostsHTML}</div>`;

    // Prevent scrolling of background content
    document.body.style.overflow = 'hidden';

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);

    function closePopup() {
        modal.classList.remove('show');
        // Restore scrolling
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    // Close button functionality
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', closePopup);

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePopup();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closePopup();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}