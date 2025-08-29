const cl = document.getElementById('c-log');
const f = document.getElementById('i-f');
const i = document.getElementById('chat-i');
const sb = document.getElementById('s-box');
const tb = document.getElementById('t-btn');
const mi = document.getElementById('moon-i');
const si = document.getElementById('sun-i');
let s = -1;


const chatInput = document.getElementById('chat-i');

function autoResizeTextarea() {
    chatInput.style.height = 'auto'; 
    if (chatInput.value.trim() === '') {
        chatInput.style.height = '44px'; 
    } else {
        chatInput.style.height = chatInput.scrollHeight + 'px';
    }
}

chatInput.addEventListener('input', autoResizeTextarea);

window.addEventListener('DOMContentLoaded', () => {
    chatInput.style.height = '44px';
});

const t = localStorage.getItem('theme') || 'dark';
document.body.classList.toggle('light-mode', t === 'light');
if (t === 'light') {
    si.style.display = 'block';
    mi.style.display = 'none';
}

tb.addEventListener('click', () => {
    const isL = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isL ? 'light' : 'dark');
    si.style.display = isL ? 'block' : 'none';
    mi.style.display = isL ? 'none' : 'block';
});

function a(t, sd) {
    const md = document.createElement('div');
    md.classList.add('msg', sd);
    const b = document.createElement('div');
    b.classList.add('bbl');
    b.innerHTML = t;
    md.prepend(b);
    cl.prepend(md);
    cl.scrollBottom = "100px";
}

f.addEventListener('submit', e => {
    e.preventDefault();
    const cmd = i.value.trim();
    if (!cmd) return;

    a(cmd, 'usr');
    i.value = '';
    sb.style.display = 'none';

    const p = cmd.split(':').map(pt => pt.trim());
    const n = p[0].toLowerCase();
    const ip = p.length > 1 ? p.slice(1).join(':') : '';

    let r = '';
    if (n === 'help' || n === 'ls') {
        r = 'Here are all the things I can help you with:<br>';
        for (const name in cs) {
            r += `<br><span style="color:black;font-weight:bold">${name}</span>: ${cs[name].d}<br>Example: <span class="c-blk">${cs[name].e}</span><br><br>`;
        }
    } else if (cs[n]) {
        r = cs[n].h(ip);
    } else {
        r = `<span style="color:black;">Hmm, I don't know that one. Type \`help\` to see what I can do.</span>`;
    }
    a(r, 'bot');
});

function ss(q) {
    sb.innerHTML = '';
    const lq = q.toLowerCase();

    function fuzzyMatch(str, query) {
        const queryChars = query.split('');
        return queryChars.every(char => str.includes(char));
    }

    const m = Object.keys(cs).filter(name => fuzzyMatch(name.toLowerCase(), lq));

    if (m.length > 0 && q.length > 0) {
        sb.style.display = 'block';
        m.forEach((n) => {
            const li = document.createElement('li');
            li.textContent = n;
            li.addEventListener('click', () => {
                i.value = n + ': ';
                sb.style.display = 'none';
                i.focus();
            });
            sb.appendChild(li);
        });
        s = -1;
    } else {
        sb.style.display = 'none';
    }
}

function k(e) {
    const sgs = Array.from(sb.children);
    
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (sgs.length === 0) return;
        
        if (e.key === 'ArrowUp') {
            s = (s > 0) ? s - 1 : sgs.length - 1;
        } else {
            s = (s < sgs.length - 1) ? s + 1 : 0;
        }
        
        us();
    } else if (e.key === 'Enter' && s >= 0) {
        e.preventDefault();
        i.value = sgs[s].textContent + ': ';
        sb.style.display = 'none';
        s = -1;
    }
}

function us() {
    const sgs = Array.from(sb.children);
    sgs.forEach((li, idx) => {
        li.classList.toggle('active', idx === s);
    });
    if (s >= 0) {
        sgs[s].scrollIntoView({ block: 'nearest' });
    }
}

i.addEventListener('input', e => {
    const q = e.target.value.split(':')[0].trim();
    ss(q);
});

i.addEventListener('keydown', k);

window.onload = () => i.focus();
