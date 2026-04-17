const express = require('express');
const os = require('os');
const ip = require('ip');
const app = express();
const PORT = 80;

app.get('/', (req, res) => {
  const hostname = os.hostname();
  const nodeIP = ip.address();

  res.send(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>MyApp — Distributed System</title>

      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
      <style>
        :root{
          --bg1: #0f172a;
          --bg2: #0b2545;
          --accent: #7dd3fc;
          --glass: rgba(255,255,255,0.06);
        }

        *{box-sizing:border-box}
        html,body{height:100%}
        body{
          margin:0;
          font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color: #e6eef8;
          background: radial-gradient(1200px 600px at 10% 10%, rgba(45,130,255,0.14), transparent 8%),
                      radial-gradient(1000px 500px at 90% 90%, rgba(0,200,255,0.06), transparent 10%),
                      linear-gradient(135deg, var(--bg1), var(--bg2));
          display:flex;
          align-items:center;
          justify-content:center;
          padding:24px;
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.95; }
          50% { transform: translateY(-8px) rotate(1deg); opacity: 1; }
          100% { transform: translateY(0px) rotate(0deg); opacity: 0.95; }
        }

        .card {
          width: min(920px, 96%);
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
          border-radius: 18px;
          padding: 28px;
          box-shadow: 0 10px 30px rgba(2,6,23,0.6);
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 22px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(6px) saturate(120%);
          border: 1px solid rgba(255,255,255,0.03);
          animation: float 6s ease-in-out infinite;
        }

        @media (max-width:880px){
          .card { grid-template-columns: 1fr; padding:20px; }
        }

        h1 {
          margin: 0 0 6px 0;
          font-size: 1.9rem;
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -0.4px;
          color: #f8fafc;
        }

        .subtitle { color: #cfeefd; opacity: 0.95; font-weight: 500; margin-bottom: 16px; }
        .desc { color: #cfe8ff; opacity: 0.9; line-height: 1.55; margin-bottom: 18px; }

        .actions { display:flex; gap:10px; flex-wrap:wrap; }
        .btn {
          display:inline-flex; align-items:center; gap:10px;
          padding:10px 16px; border-radius:12px; border:none;
          font-weight:600; cursor:pointer;
          background: linear-gradient(90deg, rgba(255,255,255,0.95), rgba(255,255,255,0.88));
          color:#003057; box-shadow:0 6px 18px rgba(6,30,72,0.25);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .btn:hover { transform:translateY(-4px); box-shadow:0 14px 30px rgba(6,30,72,0.32); }
        .btn-outline { background:transparent; border:1px solid rgba(255,255,255,0.08); color:#dff6ff; box-shadow:none; }

        .meta { margin-top:14px; font-size:0.92rem; color:#bfeeff; opacity:0.9; }

        .right { display:flex; align-items:center; justify-content:center; position:relative; }
        .preview {
          width:100%; max-width:320px;
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border-radius:14px; padding:16px; border:1px solid rgba(255,255,255,0.04);
          box-shadow: 0 8px 24px rgba(2,6,23,0.5);
        }
        .logo {
          width:64px; height:64px; border-radius:12px;
          display:inline-grid; place-items:center;
          font-weight:800; font-size:22px;
          background: linear-gradient(135deg, #7dd3fc, #60a5fa);
          color:#02203a; margin-bottom:12px;
        }

        footer.small {
          position: absolute;
          right: 14px;
          bottom: 12px;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.65);
        }

        /* IP info badge */
        .ip-info {
          position: fixed;
          top: 14px;
          right: 16px;
          background: rgba(0, 0, 0, 0.4);
          color: #bfeeff;
          padding: 10px 16px;
          border-radius: 12px;
          font-family: monospace;
          font-size: 0.95rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.4);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.08);
          z-index: 999;
        }

        .badge {
          display:inline-block;
          padding:6px 10px;
          border-radius:999px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.04);
          font-weight:600;
          font-size:0.88rem;
        }
      </style>
    </head>
    <body>
      <div class="ip-info">
        🖥️ Node IP: <strong>${nodeIP}</strong><br/>
        📦 Hostname: <strong>${hostname}</strong>
      </div>

      <div class="card">
        <div class="left">
          <h1>🚀 MyApp - IaC & CI/CD with K3s Cluster</h1>
          <div class="subtitle">https://github.com/mnhat28/iac-with-cicd-pipeline</div>
          <p class="desc">This is an IaC & CI/CD project
          <br/>We implemented a fully automated BUILD and DEPLOY process onto the K3s Cluster built by Terraform.</p>

          <div class="actions">
            <button class="btn" id="sayHi">Say Hi 👋</button>
            <button class="btn btn-outline" id="copyCurl">Copy curl</button>
          </div>

          <div class="meta">
            <span class="badge" id="uptime">Uptime: 0s</span>
            &nbsp;&middot;&nbsp;
            <span>Port: <strong>${PORT}</strong></span>
            &nbsp;&middot;&nbsp;
            <span id="nowTime"></span>
          </div>
        </div>

        <div class="right">
          <div class="preview">
            <div class="logo">MY</div>
            <h3>Service: myapp</h3>
            <p>Small footprint — big clarity. Use this as a landing for quick demos, monitoring, or CI/CD tests.</p>
          </div>
        </div>

        <footer class="small">Designed for demos • K3s / GitHub Actions friendly</footer>
      </div>

      <script>
        const start = Date.now();
        const upEl = document.getElementById('uptime');
        const nowEl = document.getElementById('nowTime');

        function human(ms){
          const s = Math.floor(ms/1000);
          if(s < 60) return s + 's';
          const m = Math.floor(s/60);
          if(m < 60) return m + 'm ' + (s%60) + 's';
          const h = Math.floor(m/60);
          return h + 'h ' + (m%60) + 'm';
        }

        function tick(){
          upEl.textContent = 'Uptime: ' + human(Date.now() - start);
          nowEl.textContent = new Date().toLocaleString();
        }
        tick();
        setInterval(tick, 1000);

        document.getElementById('sayHi').addEventListener('click', () => {
          alert('Hello! Thanks for checking MyApp 🚀');
        });

        document.getElementById('copyCurl').addEventListener('click', async () => {
          const text = 'curl -s http://localhost:${PORT}';
          try {
            await navigator.clipboard.writeText(text);
            const btn = document.getElementById('copyCurl');
            const old = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(()=> btn.textContent = old, 1200);
          } catch(e) {
            alert('Copy failed — use: ' + text);
          }
        });
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
