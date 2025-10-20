// Test script to verify add button functionality
// Run this in your browser console on http://localhost:3000

console.log('Testing add button functionality...');

// Check if the form exists
const form = document.querySelector('form');
if (form) {
  console.log('✅ Form found');
  
  // Check if input exists
  const input = form.querySelector('input[type="text"]');
  if (input) {
    console.log('✅ Input field found');
    
    // Check if select exists
    const select = form.querySelector('select');
    if (select) {
      console.log('✅ Priority select found');
      
      // Check if button exists
      const button = form.querySelector('button[type="submit"]');
      if (button) {
        console.log('✅ Add button found');
        
        // Test form submission
        console.log('Testing form submission...');
        
        // Fill in the form
        input.value = 'Test todo item';
        select.value = 'high';
        
        // Trigger form submission
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
        
        console.log('Form submission triggered');
      } else {
        console.log('❌ Add button not found');
      }
    } else {
      console.log('❌ Priority select not found');
    }
  } else {
    console.log('❌ Input field not found');
  }
} else {
  console.log('❌ Form not found');
}

// Check for any JavaScript errors
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
});

// Check for Supabase connection
if (window.supabase) {
  console.log('✅ Supabase client found');
} else {
  console.log('❌ Supabase client not found');
}
