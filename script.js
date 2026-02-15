// Web3 Wallet Connector Demo - Interactive Script

// Generate a random wallet address for demo purposes
function generateFakeAddress() {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return address;
}

// Format address to show first 6 and last 4 characters
function formatAddress(address) {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Get DOM elements
const connectBtn = document.getElementById('connectBtn');
const disconnectBtn = document.getElementById('disconnectBtn');
const connectedState = document.getElementById('connectedState');
const addressDisplay = document.getElementById('addressDisplay');

// Store connection state
let isConnected = false;
let connectedAddress = null;

// Connect wallet button handler
connectBtn.addEventListener('click', function() {
  if (!isConnected) {
    // Generate a fake wallet address
    connectedAddress = generateFakeAddress();
    isConnected = true;

    // Show connected state with animation
    connectedState.classList.remove('hidden');
    addressDisplay.textContent = connectedAddress;
    
    // Update button appearance
    connectBtn.textContent = 'Connected ✓';
    connectBtn.classList.add('bg-green-600', 'hover:bg-green-700', 'from-green-600', 'to-green-700');
    connectBtn.classList.remove('from-blue-600', 'to-blue-700', 'hover:from-blue-500', 'hover:to-blue-600');
    connectBtn.disabled = true;
    
    // Show success message
    showNotification(`Wallet Connected: ${formatAddress(connectedAddress)}`, 'success');
  }
});

// Disconnect wallet button handler
disconnectBtn.addEventListener('click', function() {
  isConnected = false;
  connectedAddress = null;

  // Hide connected state
  connectedState.classList.add('hidden');
  
  // Reset button appearance
  connectBtn.textContent = 'Connect Wallet';
  connectBtn.classList.remove('bg-green-600', 'hover:bg-green-700', 'from-green-600', 'to-green-700');
  connectBtn.classList.add('from-blue-600', 'to-blue-700', 'hover:from-blue-500', 'hover:to-blue-600');
  connectBtn.disabled = false;
  
  // Show disconnect message
  showNotification('Wallet Disconnected', 'info');
});

// Notification system
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `fixed top-6 right-6 px-6 py-4 rounded-lg font-semibold shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-300`;
  
  // Style based on type
  if (type === 'success') {
    notification.classList.add('bg-green-600', 'text-white');
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <span>${message}</span>
      </div>
    `;
  } else if (type === 'info') {
    notification.classList.add('bg-blue-600', 'text-white');
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
        </svg>
        <span>${message}</span>
      </div>
    `;
  }
  
  document.body.appendChild(notification);

  // Auto remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'fade-out 300ms ease-out forwards';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-in-from-top-2 {
    from {
      transform: translateY(-8px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
    }
  }

  .animate-in {
    animation: fade-in 300ms ease-out;
  }

  .slide-in-from-top-2 {
    animation: slide-in-from-top-2 300ms ease-out;
  }

  .duration-300 {
    animation-duration: 300ms;
  }

  /* Smooth transitions for button */
  button {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }

  button:active {
    transform: scale(0.95);
  }

  /* Address display mono font styling */
  #addressDisplay {
    word-break: break-all;
  }

  /* Card hover effects */
  .hover\:border-slate-600:hover {
    transition: border-color 200ms;
  }
`;
document.head.appendChild(style);

// Initial log for demo purposes
console.log('%cWeb3 Wallet Connector Demo', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
console.log('%cClick "Connect Wallet" to simulate a wallet connection.', 'color: #94a3b8;');