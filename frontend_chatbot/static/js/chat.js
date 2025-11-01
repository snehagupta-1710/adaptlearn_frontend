document.addEventListener('DOMContentLoaded', function() {
  const chatbox = document.getElementById('chatbox');
  const messageInput = document.getElementById('message');
  const sendBtn = document.getElementById('sendBtn');
  const subjectSelect = document.getElementById('subject');
  const themeToggle = document.getElementById('themeToggle');

  /* ---------- Add message ---------- */
  function addMessage(who, text) {
    const d = document.createElement('div');
    d.className = 'msg ' + who;
    d.innerText = text;
    chatbox.appendChild(d);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  /* ---------- Send message ---------- */
  async function sendMessage() {
    const msg = messageInput.value.trim();
    if(!msg) return;

    addMessage('user', msg);
    messageInput.value = '';

    const subject = subjectSelect.value || 'introduction_to_database';

    try {
      const res = await fetch('/ask', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({subject, message: msg})
      });

      const js = await res.json();
      if(js.reply) addMessage('bot', js.reply);

    } catch (err) {
      addMessage('bot', '⚠️ Error contacting server.');
      console.error(err);
    }
  }

  /* ---------- Event listeners ---------- */
  sendBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
      sendMessage();
    }
  });

  /* ---------- Theme toggle ---------- */
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')) {
      themeToggle.innerText = '☀️ Light Mode';
    } else {
      themeToggle.innerText = '🌙 Dark Mode';
    }
  });
});
