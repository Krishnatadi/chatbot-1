    // Function to toggle the visibility of the chat container
    function toggleChat() {
        const chatContainer = document.getElementById("chat-container");
        chatContainer.classList.toggle("show");
        document.querySelector('.menu-btn-container').classList.toggle("hidden");
    }
  

    // Function to resize the chat container
      function resizeChat() {
        const chatContainer = document.getElementById("chat-container");
        const currentWidth = chatContainer.offsetWidth;
        if (currentWidth === 300) {
          chatContainer.style.width = "500px";
        } else {
          chatContainer.style.width = "300px";
        }
    }
  
  
  // Function to close the chat and refresh the page
  function closeChat() {
    const confirmClose = confirm("Are you sure you want to close the chat? Any unsaved data will be lost.");
    if (confirmClose) {
      window.location.reload(); // Refresh the page
    }
  }
  
  // Function to handle keypress events (e.g., Enter key to send message)
      function handleKeyPress(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          sendMessage();
        }
      }
  
      // Function to start the chat and hide the form
      function startChat() {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
  
        if (name === "" || email === "") {
          document.getElementById("name").classList.add("is-invalid");
          document.getElementById("email").classList.add("is-invalid");
          return;
        }
  
        setCookie("name", name, 30);
        setCookie("email", email, 30);
  
        document.getElementById("intro").classList.add("hidden");
        document.getElementById("email-input").classList.add("hidden");
        document.getElementById("start-chat-info").classList.add("hidden");
        document.getElementById("user-input").classList.remove("hidden");
        document.getElementById("send-btn").classList.remove("hidden");
        document.getElementById("user-input").disabled = false;
        document.getElementById("user-input").focus();
        document.getElementById("button-group").classList.remove("hidden");
  
        // Show welcome message
        displayMessage("Welcome " + name + "! How can I assist you today?", "bot");
  
        // Show menu icon
        document.querySelector('.menu-btn-container').classList.remove("hidden");
      }
  
      // Function to send a message
      function sendMessage() {
        const userInput = document.getElementById("user-input").value.trim();
        if (userInput !== "") {
          displayMessage(userInput, "user");
          // Respond to the user's message
          respondToUser(userInput);
          document.getElementById("user-input").value = "";
        }
      }
  
      // Function to display a message in the chat box
      function displayMessage(message, sender) {
          const chatBox = document.getElementById("chat-box");
          const messageWrapper = document.createElement("div");
          messageWrapper.classList.add("message");
          messageWrapper.classList.add(sender === "bot" ? "bot-message" : "user-message");
          messageWrapper.innerHTML = message; // Use innerHTML instead of textContent
          chatBox.appendChild(messageWrapper);
  
          // Add a line break after each message, but not after the last one
          if (chatBox.lastChild !== messageWrapper) {
              chatBox.appendChild(document.createElement("br"));
          }
  
          chatBox.scrollTop = chatBox.scrollHeight;
      }
  
  
  
      // Function to toggle the visibility of the menu
      function toggleMenu() {
        const buttonGroup = document.getElementById("button-group");
        buttonGroup.classList.toggle("hidden");
        document.getElementById("service-btn").disabled = !document.getElementById("service-btn").disabled;
        document.getElementById("contact-btn").disabled = !document.getElementById("contact-btn").disabled;
        document.getElementById("update-btn").disabled = !document.getElementById("update-btn").disabled;
  
        const isAnyButtonHidden = Array.from(buttons).some(button => button.disabled);
  
      // Toggle the disabled attribute on each button
      buttons.forEach(button => {
      button.disabled = !isAnyButtonHidden;
      });
      // Toggle the hidden class on button group
      buttonGroup.classList.toggle("hidden", isAnyButtonHidden);
  
      }
  
  
      // Function to handle responses to user messages
      function respondToUser(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      // Check if the user greeted
      const greetings = ["hi", "hello", "good morning", "good afternoon", "good evening"];
      const greetingResponses = ["Hi there!", "Hello!", "Good morning!", "Good afternoon!", "Good evening!"];
  
      for (let i = 0; i < greetings.length; i++) {
          if (lowerCaseMessage.includes(greetings[i])) {
          displayMessage(greetingResponses[i], "bot");
          return;
          }
      }
  
      // Arrays of phrases for each type of information
      const servicePhrases = ["services", "what services do you offer", "what can you do"];
      const contactPhrases = ["contact", "how can i reach you", "contact information"];
      const updatesPhrases = ["latest updates", "updates", "news", "announcements"];
      const pricingPhrases = ["pricing", "cost", "price"];
      const locationPhrases = ["location", "where are you located", "address"];
      const supportPhrases = ["support", "help", "assistance"];
      const hoursPhrases = ["hours", "opening hours", "business", "timings", "office time", "business hours", "time", "when are you open"];
      const teamPhrases = ["team", "staff", "employees", "who works there"];
      const aboutPhrases = ["about", "about us", "who are you"];
      const careerPhrases = ["career", "job", "opportunities", "work with you"];
      const portfolioPhrases = ["portfolio", "projects", "past work"];
      const blogPhrases = ["blog", "articles", "news"];
      const faqPhrases = ["faq", "frequently asked questions", "questions"];
  
      // Function to check if any phrase in the array is included in the message
      function includesAny(phrases) {
          return phrases.some(phrase => lowerCaseMessage.includes(phrase));
      }
  
      // Check if the user requested information
      if (includesAny(servicePhrases)) {
          displayMessage("Our services include: 1. Web development 2. Mobile app development 3. UI/UX design", "bot");
      } else if (includesAny(contactPhrases)) {
          displayMessage("You can contact us at: Email: contact@example.com Phone: +123456789", "bot");
      } else if (includesAny(updatesPhrases)) {
          displayMessage("Stay tuned for our latest updates and announcements!", "bot");
      } else if (includesAny(pricingPhrases)) {
          displayMessage("Our pricing varies based on the service and project scope. Please contact us for a detailed quote.", "bot");
      } else if (includesAny(locationPhrases)) {
          displayMessage("We are located at 1234 Example Street, City, Country.", "bot");
      } else if (includesAny(supportPhrases)) {
          displayMessage("For support, you can reach our team at support@example.com or call +123456789 during business hours.", "bot");
      } else if (includesAny(hoursPhrases)) {
          displayMessage("Our business hours are Monday to Friday, 9 AM to 6 PM.", "bot");
      } else if (includesAny(teamPhrases)) {
          displayMessage("Our team consists of experienced professionals in web development, mobile app development, and UI/UX design.", "bot");
      } else if (includesAny(aboutPhrases)) {
          displayMessage("We are a leading company in web and mobile app development, committed to delivering the best solutions for our clients.", "bot");
      } else if (includesAny(careerPhrases)) {
          displayMessage("We are always looking for talented individuals to join our team. Please visit our careers page for more information.", "bot");
      } else if (includesAny(portfolioPhrases)) {
          displayMessage("You can view our portfolio and past projects on our website.", "bot");
      } else if (includesAny(blogPhrases)) {
          displayMessage("Check out our blog for the latest articles and insights from our team.", "bot");
      } else if (includesAny(faqPhrases)) {
          displayMessage("You can find answers to frequently asked questions on our FAQ page.", "bot");
      } else {
          // If no specific response is found, display a default message with options
          displayMessage("I'm sorry, I didn't quite understand that. Here are some things you can ask me about:<br/>1. Services<br/>2. Contact<br/>3. Latest updates<br/>4. Pricing<br/>5. Location<br/>6. Support<br/>7. Business hours<br/>8. Team<br/>9. About<br/>10. Careers<br/>11. Portfolio<br/>12. Blog<br/>13. FAQ", "bot");
      }
      }
  
      // Function to send a message when a button is clicked
      function sendButtonMessage(message) {
        displayMessage(message, "user");
        respondToUser(message);
       
     // Hide all menu buttons when a button is clicked
     const buttonGroup = document.getElementById("button-group");
    const buttons = buttonGroup.querySelectorAll("button");
    
    buttons.forEach(button => {
      button.disabled = true;
    });
  
    buttonGroup.classList.add("hidden");
  
      }
  
      // Function to set a cookie
      function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
      }
  
      // Function to get a cookie by name
      function getCookie(name) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookies = decodedCookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
          }
        }
        return "";
      }
  
      // Function to delete cookies
      function deleteCookies() {
        const cookies = ["name", "email", "chat_responses"];
        cookies.forEach(cookie => {
          document.cookie = cookie + '=; Max-Age=-99999999;'; // setting expiry date in past to delete cookie
        });
      }
  
      // Function to clear chat responses
      function clearChat() {
        const chatBox = document.getElementById("chat-box");
        while (chatBox.firstChild) {
          chatBox.removeChild(chatBox.firstChild);
        }
      }
  
      // Clear cookies on page load
      window.reload = function() {
        deleteCookies();
      }