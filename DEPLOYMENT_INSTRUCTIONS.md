# 🚀 Server Deployment Instructions — v0.4.1

## 📋 Pre-Deployment Checklist

✅ Build успішний локально  
✅ Push на `origin/main` виконано  
✅ Всі зображення оптимізовані (AVIF/WebP)  
✅ Dependencies оновлені  
✅ README актуалізовано  

---

## 🖥️ Server Commands (Execute on Server)

### 1. Pull Latest Changes

```bash
# Connect to server
ssh user@your-server.com

# Navigate to project
cd /path/to/Landing-Page-Design

# Pull latest code
git pull origin main
```

**Expected output:**
```
From github.com:Illia-Kh/Landing-Page-Design
 * branch            main       -> FETCH_HEAD
Updating cf95c9d..c303fd2
Fast-forward
 50 files changed, 2776 insertions(+), 2113 deletions(-)
```

---

### 2. Install Dependencies

```bash
# Install/update dependencies
npm install

# Or clean install
rm -rf node_modules package-lock.json
npm install
```

**Expected output:**
```
added X packages, audited Y packages in Zs
found 0 vulnerabilities
```

---

### 3. Build Production

```bash
# Build optimized static export
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Generating static pages (50/50)
✓ Exporting (2/2)

Route (app)                    Size  First Load JS
├ ● /[lang]                  1.7 kB         107 kB
├ ● /[lang]/contacts        1.61 kB         104 kB
└ + First Load JS             102 kB
```

**⚠️ Important:** Build має завершитися успішно без errors. Warnings про ESLint — допустимі.

---

### 4. Verify Build Output

```bash
# Check that 'out' folder exists
ls -lh out/

# Verify key files
ls -lh out/en/index.html
ls -lh out/media/banner/web-development-mobile.avif
ls -lh out/_next/static/chunks/
```

**Expected:**
```
out/
├── en/
│   ├── index.html         ✅
│   ├── contacts/          ✅
│   └── services/          ✅
├── cs/
├── de/
├── ua/
├── media/banner/
│   ├── web-development-mobile.avif    (29 KB)  ✅
│   ├── web-development-mobile-lg.avif (49 KB)  ✅
│   ├── web-development.avif          (125 KB)  ✅
│   └── ...
└── _next/static/chunks/   ✅
```

---

### 5. Backup Current Version (Optional but Recommended)

```bash
# Create backup of current production
cp -r /var/www/html /var/www/html.backup-$(date +%Y%m%d-%H%M%S)

# Or if using nginx
cp -r /usr/share/nginx/html /usr/share/nginx/html.backup-$(date +%Y%m%d-%H%M%S)
```

---

### 6. Deploy to Web Root

#### Option A: nginx

```bash
# Remove old files
rm -rf /usr/share/nginx/html/*

# Copy new build
cp -r out/* /usr/share/nginx/html/

# Set permissions
chown -R www-data:www-data /usr/share/nginx/html
chmod -R 755 /usr/share/nginx/html
```

#### Option B: Apache

```bash
# Remove old files
rm -rf /var/www/html/*

# Copy new build
cp -r out/* /var/www/html/

# Set permissions
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html
```

#### Option C: Custom Directory

```bash
# Example: /home/user/www
rm -rf /home/user/www/*
cp -r out/* /home/user/www/
```

---

### 7. Configure Server Headers (Important for Performance!)

#### nginx Configuration

Edit `/etc/nginx/sites-available/your-site`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name ikhsystems.com www.ikhsystems.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ikhsystems.com www.ikhsystems.com;
    
    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # Trailing slash redirect
    rewrite ^([^.]*[^/])$ $1/ permanent;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss image/svg+xml;
    gzip_min_length 1000;
    
    # Cache headers for static assets
    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    # Cache headers for images
    location /media/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        
        # AVIF support
        location ~ \.avif$ {
            add_header Content-Type "image/avif";
            add_header Cache-Control "public, max-age=31536000, immutable";
        }
        
        # WebP support
        location ~ \.webp$ {
            add_header Content-Type "image/webp";
            add_header Cache-Control "public, max-age=31536000, immutable";
        }
    }
    
    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    
    # Handle localized routes
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }
    
    # Custom 404
    error_page 404 /404/index.html;
}
```

**Apply configuration:**
```bash
# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

#### Apache Configuration

Edit `/etc/apache2/sites-available/your-site.conf` or `.htaccess`:

```apache
# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache headers
<IfModule mod_expires.c>
    ExpiresActive On
    
    # Static assets - 1 year
    ExpiresByType image/avif "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/css "access plus 1 year"
    
    # HTML - no cache
    ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# AVIF MIME type
<IfModule mod_mime.c>
    AddType image/avif .avif
    AddType image/webp .webp
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header set X-Frame-Options "DENY"
    Header set X-Content-Type-Options "nosniff"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "no-referrer-when-downgrade"
    Header set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
</IfModule>

# Rewrite rules
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Trailing slash
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_URI} !(.*)/$
    RewriteRule ^(.*)$ $1/ [L,R=301]
    
    # SPA routing
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ /index.html [L]
</IfModule>
```

**Apply:**
```bash
# Reload Apache
sudo systemctl reload apache2
```

---

### 8. Verify Deployment

```bash
# Check file permissions
ls -la /usr/share/nginx/html/ | head -20

# Check AVIF files exist
ls -lh /usr/share/nginx/html/media/banner/*.avif

# Test nginx syntax (if using nginx)
sudo nginx -t
```

---

### 9. Test Live Site

#### From Server
```bash
# Test local response
curl -I http://localhost/en/

# Should return 200 or 301→HTTPS
```

#### From Browser
```
1. Open: https://ikhsystems.com/en
2. Check DevTools → Network:
   ✅ Status 200 for index.html
   ✅ web-development-mobile.avif loads (29-49 KB)
   ✅ Content-Type: image/avif
   ✅ Cache-Control: public, max-age=31536000
   
3. Run Lighthouse Mobile:
   ✅ Performance: 92-98
   ✅ LCP: <1.5s
   ✅ TBT: <200ms
   ✅ CLS: <0.05
```

---

## 🔍 Post-Deployment Verification

### 1. Performance Check
```bash
# From your local machine:
# Visit https://pagespeed.web.dev/
# URL: https://ikhsystems.com/en
# Device: Mobile

Expected scores:
- Performance: 92-98
- SEO: 98-100
- Accessibility: 95-100
- Best Practices: 95-100
```

### 2. Image Optimization Check
```bash
# Check mobile variant loads
curl -I https://ikhsystems.com/media/banner/web-development-mobile.avif

# Should show:
HTTP/2 200
content-type: image/avif
cache-control: public, max-age=31536000, immutable
content-length: ~29000 (approx 29 KB)
```

### 3. SEO Validation
```
- https://ikhsystems.com/sitemap.xml ✅
- https://ikhsystems.com/robots.txt ✅
- https://ikhsystems.com/en (200) ✅
- https://ikhsystems.com/cs (200) ✅
- https://ikhsystems.com/de (200) ✅
- https://ikhsystems.com/ua (200) ✅
```

### 4. Analytics Check
```
1. Open site in incognito
2. Check browser console for:
   - Google Analytics loaded ✅
   - No JavaScript errors ✅
3. Verify in GA4 dashboard
```

---

## 🔄 Rollback Procedure (if needed)

```bash
# On server:
cd /path/to/Landing-Page-Design

# Restore from backup
rm -rf /usr/share/nginx/html/*
cp -r /usr/share/nginx/html.backup-YYYYMMDD-HHMMSS/* /usr/share/nginx/html/

# Or git rollback
git reset --hard HEAD~1
npm install
npm run build
# Copy out/* to web root
```

---

## 📊 Monitoring Setup (Optional)

### Google Search Console
1. Verify property ownership
2. Submit sitemap: https://ikhsystems.com/sitemap.xml
3. Monitor Core Web Vitals
4. Check coverage report

### Uptime Monitoring
```bash
# Setup cron for health check (on server)
crontab -e

# Add:
*/5 * * * * curl -f https://ikhsystems.com/en > /dev/null 2>&1 || echo "Site down!" | mail -s "Alert" your@email.com
```

---

## 🎯 Success Criteria

### Performance (Mobile)
- [ ] Lighthouse Performance ≥ 92
- [ ] LCP ≤ 1.5s
- [ ] TBT ≤ 200ms
- [ ] CLS ≤ 0.05
- [ ] FCP ≤ 1.0s

### Images
- [ ] AVIF served with correct Content-Type
- [ ] Mobile variants (29-49 KB) load on mobile
- [ ] Cache headers: max-age=31536000
- [ ] No "wasted bytes" in Lighthouse

### Functionality
- [ ] All 4 languages accessible
- [ ] Contact form works
- [ ] Dark mode persists
- [ ] Carousel auto-plays
- [ ] Navigation smooth

### SEO
- [ ] Sitemap accessible
- [ ] Robots.txt correct
- [ ] Meta descriptions present
- [ ] Structured data valid
- [ ] Hreflang tags correct

---

## 🆘 Troubleshooting

### Issue: Images not loading
```bash
# Check file permissions
ls -la /usr/share/nginx/html/media/banner/

# Should be: -rw-r--r-- (644)
# Fix if needed:
chmod 644 /usr/share/nginx/html/media/banner/*
```

### Issue: 404 on routes
```bash
# Nginx: Ensure try_files is correct
# Apache: Ensure mod_rewrite is enabled

# Test:
curl -I https://ikhsystems.com/en/services/

# Should return 200, not 404
```

### Issue: AVIF shows as octet-stream
```bash
# Add MIME type to server config
# nginx: See step 7
# Apache: AddType image/avif .avif

# Reload server
sudo systemctl reload nginx  # or apache2
```

### Issue: Performance < 90
```bash
# Check:
1. Gzip/Brotli enabled? 
2. Cache headers set?
3. AVIF Content-Type correct?
4. CDN/caching layer active?

# Debug:
curl -H "Accept: image/avif" https://ikhsystems.com/media/banner/web-development-mobile.avif -I
```

---

## 📈 Expected Performance (After Deploy)

### Mobile Lighthouse
```
Performance:  92-98  ✅
Accessibility: 95-100 ✅
Best Practices: 90-95 ✅
SEO: 98-100 ✅
```

### Core Web Vitals
```
LCP: 0.5-1.2s   (Target: ≤2.5s)  ⚡
FID: 20-80ms    (Target: ≤100ms) ✅
CLS: 0.00-0.02  (Target: ≤0.1)   ✨
```

### Network
```
Total Page Size: ~150-250 KB
Total Requests: 15-25
Time to Interactive: 1.5-3.0s
```

---

## 🔐 Security Headers Verification

```bash
# Test security headers
curl -I https://ikhsystems.com/en | grep -i "x-frame-options\|x-content-type\|strict-transport"

# Expected output:
x-frame-options: DENY
x-content-type-options: nosniff
strict-transport-security: max-age=63072000; includeSubDomains; preload
```

---

## 🎉 Deployment Complete!

### Quick Test URLs
- 🏠 Home: https://ikhsystems.com/en
- 📞 Contact: https://ikhsystems.com/en/contacts
- 🛠️ Services: https://ikhsystems.com/en/services
- 📄 Privacy: https://ikhsystems.com/en/privacy-policy

### Performance Test
- 📊 PageSpeed: https://pagespeed.web.dev/analysis?url=https://ikhsystems.com/en

### Monitoring
- 🔍 Search Console: https://search.google.com/search-console
- 📈 Analytics: https://analytics.google.com

---

## 📝 Notes

- **Static Export**: Сайт працює без Node.js server
- **AVIF Support**: Fallback на WebP для старих браузерів
- **Mobile-First**: Оптимізовано під mobile viewport
- **CDN Ready**: Може бути розміщено на Cloudflare/CDN
- **Cache**: Immutable assets з 1-year TTL

---

## 🎯 Next Steps

1. ✅ **Test site live**: https://ikhsystems.com
2. ✅ **Run PageSpeed Mobile**
3. ✅ **Verify all routes** (4 langs × 9 pages)
4. ✅ **Check analytics** tracking
5. ✅ **Monitor Search Console** for issues
6. ⏳ **Wait 24-48h** for Google indexing
7. 📊 **Track Core Web Vitals** improvement

---

**Deployment Ready!** 🚀

If you encounter any issues, check server logs:
```bash
# nginx
sudo tail -f /var/log/nginx/error.log

# apache
sudo tail -f /var/log/apache2/error.log
```

