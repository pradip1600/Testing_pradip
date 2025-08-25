// Login form validation and handling
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginBtn = document.querySelector('.login-btn');

    // Validation rules
    const validationRules = {
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            minLength: 5,
            maxLength: 100
        },
        password: {
            required: true,
            minLength: 8,
            maxLength: 50,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        }
    };

    // Error messages
    const errorMessages = {
        email: {
            required: 'Email is required',
            invalid: 'Please enter a valid email address',
            minLength: 'Email must be at least 5 characters long',
            maxLength: 'Email must not exceed 100 characters'
        },
        password: {
            required: 'Password is required',
            minLength: 'Password must be at least 8 characters long',
            maxLength: 'Password must not exceed 50 characters',
            pattern: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }
    };

    // Validation function
    function validateField(field, value) {
        const rules = validationRules[field];
        const messages = errorMessages[field];

        // Required check
        if (rules.required && (!value || value.trim() === '')) {
            return { isValid: false, message: messages.required };
        }

        // Length checks
        if (value && rules.minLength && value.length < rules.minLength) {
            return { isValid: false, message: messages.minLength };
        }

        if (value && rules.maxLength && value.length > rules.maxLength) {
            return { isValid: false, message: messages.maxLength };
        }

        // Pattern check
        if (value && rules.pattern && !rules.pattern.test(value)) {
            if (field === 'email') {
                return { isValid: false, message: messages.invalid };
            } else {
                return { isValid: false, message: messages.pattern };
            }
        }

        return { isValid: true, message: '' };
    }

    // Display error function
    function displayError(input, errorElement, message) {
        input.classList.remove('success');
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    // Display success function
    function displaySuccess(input, errorElement) {
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // Real-time validation for email (on input for better UX)
    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            emailError.classList.remove('show');
        }
        // Add real-time validation for better UX
        if (this.value.length > 0) {
            const validation = validateField('email', this.value);
            if (validation.isValid) {
                displaySuccess(this, emailError);
            }
        }
    });

    // Real-time validation for email (on blur)
    emailInput.addEventListener('blur', function() {
        const validation = validateField('email', this.value);
        if (!validation.isValid) {
            displayError(this, emailError, validation.message);
        } else {
            displaySuccess(this, emailError);
        }
    });

    // Real-time validation for password (with strength indicator)
    passwordInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            passwordError.classList.remove('show');
        }
        // Show password strength in real-time
        updatePasswordStrength(this.value);
    });

    // Real-time validation for password (on blur)
    passwordInput.addEventListener('blur', function() {
        const validation = validateField('password', this.value);
        if (!validation.isValid) {
            displayError(this, passwordError, validation.message);
        } else {
            displaySuccess(this, passwordError);
        }
    });

    // Password strength indicator function
    function updatePasswordStrength(password) {
        const strengthIndicator = document.getElementById('passwordStrength');
        if (!strengthIndicator) return;

        let strength = 0;
        const strengthText = strengthIndicator.querySelector('.strength-text');
        const strengthBar = strengthIndicator.querySelector('.strength-bar');

        // Calculate strength
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[@$!%*?&]/.test(password)) strength++;

        // Update strength indicator
        const strengthLevels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        const strengthColors = ['#e74c3c', '#e67e22', '#f39c12', '#27ae60', '#27ae60'];
        
        if (password.length === 0) {
            strengthText.textContent = '';
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = '#e1e1e1';
        } else {
            strengthText.textContent = strengthLevels[strength - 1] || 'Very Weak';
            strengthBar.style.width = `${(strength / 5) * 100}%`;
            strengthBar.style.backgroundColor = strengthColors[strength - 1] || '#e74c3c';
        }
    }

    // Clear errors on input
    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            emailError.classList.remove('show');
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            passwordError.classList.remove('show');
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const emailValidation = validateField('email', emailInput.value);
        const passwordValidation = validateField('password', passwordInput.value);

        let isFormValid = true;

        // Display email validation result
        if (!emailValidation.isValid) {
            displayError(emailInput, emailError, emailValidation.message);
            isFormValid = false;
        } else {
            displaySuccess(emailInput, emailError);
        }

        // Display password validation result
        if (!passwordValidation.isValid) {
            displayError(passwordInput, passwordError, passwordValidation.message);
            isFormValid = false;
        } else {
            displaySuccess(passwordInput, passwordError);
        }

        // If form is valid, simulate login
        if (isFormValid) {
            // Disable button and show loading state
            loginBtn.disabled = true;
            loginBtn.textContent = 'Logging in...';

            // Simulate API call
            setTimeout(() => {
                // Reset button
                loginBtn.disabled = false;
                loginBtn.textContent = 'Login';

                // Show success message
                showSuccessMessage('Login successful! Welcome back.');
                
                // In a real application, you would redirect or handle the successful login
                console.log('Login successful with:', {
                    email: emailInput.value,
                    rememberMe: document.getElementById('rememberMe').checked
                });
            }, 2000);
        }
    });

    // Success message function
    function showSuccessMessage(message) {
        // Create success message element if it doesn't exist
        let successDiv = document.querySelector('.success-message');
        if (!successDiv) {
            successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            loginForm.insertBefore(successDiv, loginForm.firstChild);
        }
        
        successDiv.textContent = message;
        successDiv.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            successDiv.classList.remove('show');
        }, 5000);
    }

    // Demo data for testing
    window.demoLogin = function() {
        emailInput.value = 'test@example.com';
        passwordInput.value = 'TestPass123!';
    };

    // Add demo button for testing
    const demoBtn = document.createElement('button');
    demoBtn.type = 'button';
    demoBtn.textContent = 'Fill Demo Data';
    demoBtn.style.cssText = 'margin-top: 10px; padding: 8px 16px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px; cursor: pointer; font-size: 12px;';
    demoBtn.addEventListener('click', window.demoLogin);
    loginForm.appendChild(demoBtn);
});
