// Registration form validation and handling
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const phoneInput = document.getElementById('phone');
    const termsAgreeCheckbox = document.getElementById('termsAgree');
    
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const phoneError = document.getElementById('phoneError');
    const termsAgreeError = document.getElementById('termsAgreeError');
    
    const registerBtn = document.querySelector('.register-btn');

    // Validation rules
    const validationRules = {
        fullName: {
            required: true,
            minLength: 2,
            maxLength: 100,
            pattern: /^[a-zA-Z\s]*$/
        },
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
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
        },
        confirmPassword: {
            required: true,
            mustMatch: 'password'
        },
        phone: {
            required: false,
            pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
        },
        termsAgree: {
            required: true
        }
    };

    // Error messages
    const errorMessages = {
        fullName: {
            required: 'Full name is required',
            minLength: 'Full name must be at least 2 characters long',
            maxLength: 'Full name must not exceed 100 characters',
            pattern: 'Full name can only contain letters and spaces'
        },
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
        },
        confirmPassword: {
            required: 'Please confirm your password',
            mustMatch: 'Passwords do not match'
        },
        phone: {
            pattern: 'Please enter a valid phone number'
        },
        termsAgree: {
            required: 'You must agree to the terms and conditions'
        }
    };

    // Validation function
    function validateField(field, value, compareValue) {
        const rules = validationRules[field];
        const messages = errorMessages[field];

        // Required check
        if (rules.required) {
            if (field === 'termsAgree') {
                if (!termsAgreeCheckbox.checked) {
                    return { isValid: false, message: messages.required };
                }
            } else if (!value || value.trim() === '') {
                return { isValid: false, message: messages.required };
            }
        }

        // Skip other validations if field is empty and not required
        if (!rules.required && (!value || value.trim() === '')) {
            return { isValid: true, message: '' };
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

        // Match check (for password confirmation)
        if (rules.mustMatch && value !== compareValue) {
            return { isValid: false, message: messages.mustMatch };
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

    // Real-time validation for fullName
    fullNameInput.addEventListener('blur', function() {
        const validation = validateField('fullName', this.value);
        if (!validation.isValid) {
            displayError(this, fullNameError, validation.message);
        } else {
            displaySuccess(this, fullNameError);
        }
    });

    // Real-time validation for email
    emailInput.addEventListener('blur', function() {
        const validation = validateField('email', this.value);
        if (!validation.isValid) {
            displayError(this, emailError, validation.message);
        } else {
            displaySuccess(this, emailError);
        }
    });

    // Real-time validation for password
    passwordInput.addEventListener('blur', function() {
        const validation = validateField('password', this.value);
        if (!validation.isValid) {
            displayError(this, passwordError, validation.message);
        } else {
            displaySuccess(this, passwordError);
        }
        
        // Revalidate confirm password if it has a value
        if (confirmPasswordInput.value) {
            const confirmValidation = validateField('confirmPassword', confirmPasswordInput.value, this.value);
            if (!confirmValidation.isValid) {
                displayError(confirmPasswordInput, confirmPasswordError, confirmValidation.message);
            } else {
                displaySuccess(confirmPasswordInput, confirmPasswordError);
            }
        }
    });

    // Real-time validation for confirmPassword
    confirmPasswordInput.addEventListener('blur', function() {
        const validation = validateField('confirmPassword', this.value, passwordInput.value);
        if (!validation.isValid) {
            displayError(this, confirmPasswordError, validation.message);
        } else {
            displaySuccess(this, confirmPasswordError);
        }
    });

    // Real-time validation for phone
    phoneInput.addEventListener('blur', function() {
        if (this.value) { // Only validate if there's a value
            const validation = validateField('phone', this.value);
            if (!validation.isValid) {
                displayError(this, phoneError, validation.message);
            } else {
                displaySuccess(this, phoneError);
            }
        } else {
            // Clear any previous error since this field is optional
            displaySuccess(this, phoneError);
        }
    });

    // Real-time validation for terms checkbox
    termsAgreeCheckbox.addEventListener('change', function() {
        const validation = validateField('termsAgree');
        if (!validation.isValid) {
            termsAgreeError.textContent = validation.message;
            termsAgreeError.classList.add('show');
        } else {
            termsAgreeError.textContent = '';
            termsAgreeError.classList.remove('show');
        }
    });

    // Clear errors on input
    const inputFields = [fullNameInput, emailInput, passwordInput, confirmPasswordInput, phoneInput];
    inputFields.forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
                this.nextElementSibling.classList.remove('show');
            }
        });
    });

    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const fullNameValidation = validateField('fullName', fullNameInput.value);
        const emailValidation = validateField('email', emailInput.value);
        const passwordValidation = validateField('password', passwordInput.value);
        const confirmPasswordValidation = validateField('confirmPassword', confirmPasswordInput.value, passwordInput.value);
        const phoneValidation = phoneInput.value ? validateField('phone', phoneInput.value) : { isValid: true, message: '' };
        const termsAgreeValidation = validateField('termsAgree');

        let isFormValid = true;

        // Display validation results
        if (!fullNameValidation.isValid) {
            displayError(fullNameInput, fullNameError, fullNameValidation.message);
            isFormValid = false;
        } else {
            displaySuccess(fullNameInput, fullNameError);
        }

        if (!emailValidation.isValid) {
            displayError(emailInput, emailError, emailValidation.message);
            isFormValid = false;
        } else {
            displaySuccess(emailInput, emailError);
        }

        if (!passwordValidation.isValid) {
            displayError(passwordInput, passwordError, passwordValidation.message);
            isFormValid = false;
        } else {
            displaySuccess(passwordInput, passwordError);
        }

        if (!confirmPasswordValidation.isValid) {
            displayError(confirmPasswordInput, confirmPasswordError, confirmPasswordValidation.message);
            isFormValid = false;
        } else {
            displaySuccess(confirmPasswordInput, confirmPasswordError);
        }

        if (!phoneValidation.isValid) {
            displayError(phoneInput, phoneError, phoneValidation.message);
            isFormValid = false;
        } else {
            displaySuccess(phoneInput, phoneError);
        }

        if (!termsAgreeValidation.isValid) {
            termsAgreeError.textContent = termsAgreeValidation.message;
            termsAgreeError.classList.add('show');
            isFormValid = false;
        } else {
            termsAgreeError.textContent = '';
            termsAgreeError.classList.remove('show');
        }

        // If form is valid, simulate registration
        if (isFormValid) {
            // Disable button and show loading state
            registerBtn.disabled = true;
            registerBtn.textContent = 'Registering...';

            // Simulate API call
            setTimeout(() => {
                // Reset button
                registerBtn.disabled = false;
                registerBtn.textContent = 'Register';

                // Show success message
                showSuccessMessage('Registration successful! You can now login.');
                
                // In a real application, you would redirect or handle the successful registration
                console.log('Registration successful with:', {
                    fullName: fullNameInput.value,
                    email: emailInput.value,
                    phone: phoneInput.value
                });

                // Optional: Redirect to login page after a short delay
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 3000);
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
            registrationForm.insertBefore(successDiv, registrationForm.firstChild);
        }
        
        successDiv.textContent = message;
        successDiv.classList.add('show');
    }

    // Add demo data for testing (developers only)
    window.demoRegistration = function() {
        fullNameInput.value = 'John Doe';
        emailInput.value = 'john.doe@example.com';
        passwordInput.value = 'TestPass123!';
        confirmPasswordInput.value = 'TestPass123!';
        phoneInput.value = '(555) 123-4567';
        termsAgreeCheckbox.checked = true;
    };

    // Add demo button for testing (only visible in development environment)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const demoBtn = document.createElement('button');
        demoBtn.type = 'button';
        demoBtn.textContent = 'Fill Demo Data';
        demoBtn.style.cssText = 'margin-top: 10px; padding: 8px 16px; background: #f8f9fa; border: 1px solid #dee2e6; border-radius: 4px; cursor: pointer; font-size: 12px;';
        demoBtn.addEventListener('click', window.demoRegistration);
        registrationForm.appendChild(demoBtn);
    }
});
