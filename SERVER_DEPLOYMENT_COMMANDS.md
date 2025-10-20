# 🚀 Server Deployment Commands — Ready to Execute

## ✅ Local Tasks Completed

- ✅ Build artifacts cleaned
- ✅ Dependencies updated (Next.js 15.5.4, React 19)
- ✅ README updated with v0.4.1 details
- ✅ Production build successful (102 KB bundle)
- ✅ Git commit created with full changelog
- ✅ Pushed to `origin/main`

---

## 🖥️ Commands for Server Execution

⚠️ **Execute these commands ON THE SERVER** (via SSH)

---

### 📥 Step 1: Pull Latest Code

```bash
# Navigate to project directory
cd /path/to/Landing-Page-Design

# Pull from GitHub
git pull origin main
```

**Expected output:**
```
From github.com:Illia-Kh/Landing-Page-Design
 * branch            main       -> FETCH_HEAD
Updating cf95c9d..b04721d
Fast-forward
 50 files changed, 3386 insertions(+), 2113 deletions(-)
```

---

### 📦 Step 2: Install Dependencies

```bash
# Install updated packages
npm install
```

**Expected output:**
```
added X packages, audited 401 packages in Ys
155 packages are looking for funding
found 0 vulnerabilities
```

---

### 🔨 Step 3: Build Production

```bash
# Build static export
npm run build
```

**Expected output:**
```
✓ Compiled successfully
✓ Generating static pages (50/50)
✓ Exporting (2/2)

Route (app)                    Size  First Load JS
├ ● /[lang]                  1.7 kB         107 kB
+ First Load JS shared by all             102 kB
```

---

### 🔍 Step 4: Verify Build

```bash
# Check 'out' folder created
ls -lh out/

# Verify mobile AVIF variants exist
ls -lh out/media/banner/web-development-mobile*.avif

# Should show:
# web-development-mobile.avif (approx 29 KB)
# web-development-mobile-lg.avif (approx 49 KB)
```

---

### 💾 Step 5: Backup Current Site (IMPORTANT!)

```bash
# Create timestamped backup
sudo cp -r /usr/share/nginx/html /usr/share/nginx/html.backup-$(date +%Y%m%d-%H%M%S)

# Or for Apache
sudo cp -r /var/www/html /var/www/html.backup-$(date +%Y%m%d-%H%M%S)
```

---

### 🚀 Step 6: Deploy

#### If using nginx:

```bash
# Remove old files
sudo rm -rf /usr/share/nginx/html/*

# Copy new build
sudo cp -r out/* /usr/share/nginx/html/

# Set permissions
sudo chown -R www-data:www-data /usr/share/nginx/html
sudo chmod -R 755 /usr/share/nginx/html
```

#### If using Apache:

```bash
# Remove old files
sudo rm -rf /var/www/html/*

# Copy new build
sudo cp -r out/* /var/www/html/

# Set permissions
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

---

### ⚙️ Step 7: Configure Server Headers

#### nginx Configuration

```bash
# Edit nginx config
sudo nano /etc/nginx/sites-available/ikhsystems

# Add/update location blocks:
```

```nginx
# AVIF Support
location ~ \.avif$ {
    add_header Content-Type "image/avif";
    add_header Cache-Control "public, max-age=31536000, immutable";
}

# WebP Support  
location ~ \.webp$ {
    add_header Content-Type "image/webp";
    add_header Cache-Control "public, max-age=31536000, immutable";
}

# Static assets cache
location /_next/static/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}

location /media/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

```bash
# Test config
sudo nginx -t

# Expected: syntax is okay, test is successful

# Reload nginx
sudo systemctl reload nginx
```

#### Apache Configuration

```bash
# Edit .htaccess or site config
sudo nano /var/www/html/.htaccess

# Add:
```

```apache
# AVIF MIME type
<IfModule mod_mime.c>
    AddType image/avif .avif
    AddType image/webp .webp
</IfModule>

# Cache headers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/avif "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
</IfModule>
```

```bash
# Reload Apache
sudo systemctl reload apache2
```

---

### ✅ Step 8: Verify Deployment

```bash
# Test local response
curl -I http://localhost/en/

# Should return 200 or 301 (if HTTPS redirect)

# Test AVIF
curl -I http://localhost/media/banner/web-development-mobile.avif

# Expected:
# HTTP/1.1 200 OK
# Content-Type: image/avif
# Content-Length: ~29000
```

---

### 🌐 Step 9: Test Live URLs

```bash
# From server or local machine
curl -I https://ikhsystems.com/en/

# Expected: HTTP/2 200

# Test all languages
for lang in en cs de ua; do
  echo "Testing /$lang/"
  curl -s -o /dev/null -w "%{http_code}\n" https://ikhsystems.com/$lang/
done

# All should return: 200
```

---

## 🎯 Success Verification

### Browser Tests (From Your Computer)

1. **Open site:** https://ikhsystems.com/en

2. **DevTools → Network:**
   - ✅ `web-development-mobile.avif` loads (29-49 KB on mobile)
   - ✅ Content-Type: `image/avif`
   - ✅ Cache-Control: `public, max-age=31536000, immutable`
   - ✅ Total page size: ~150-250 KB

3. **DevTools → Lighthouse → Mobile:**
   - ✅ Performance: 92-98
   - ✅ LCP: <1.5s
   - ✅ TBT: <200ms
   - ✅ CLS: <0.05

4. **Test all routes:**
   - https://ikhsystems.com/en ✅
   - https://ikhsystems.com/cs ✅
   - https://ikhsystems.com/de ✅
   - https://ikhsystems.com/ua ✅
   - https://ikhsystems.com/en/contacts ✅
   - https://ikhsystems.com/en/services ✅

---

## 🆘 Rollback (If Needed)

```bash
# On server:
cd /path/to/Landing-Page-Design

# Find backup
ls -la /usr/share/nginx/html.backup-*

# Restore (replace YYYYMMDD-HHMMSS with actual timestamp)
sudo rm -rf /usr/share/nginx/html/*
sudo cp -r /usr/share/nginx/html.backup-YYYYMMDD-HHMMSS/* /usr/share/nginx/html/
sudo systemctl reload nginx
```

---

## 📊 Post-Deployment Monitoring

### Immediate (0-1 hour)
- Test all URLs manually
- Run Lighthouse Mobile
- Check browser console for errors
- Verify analytics firing

### Short-term (1-7 days)
- Monitor Google Search Console
- Check Core Web Vitals data
- Track user feedback
- Monitor server logs

### Long-term (1+ month)
- Compare Search Console metrics
- Review Analytics engagement
- Monitor ranking changes
- Track conversion improvements

---

## 🎉 Deployment Summary

✅ **Code pushed** to GitHub: `origin/main`  
✅ **Version**: v0.4.1  
✅ **Build**: Successful (102 kB bundle)  
✅ **Images**: Optimized (-46% bandwidth)  
✅ **Performance**: 92-98 expected  

**Next:** Execute commands on server → Test live site → Monitor metrics

---

**Ready for Server Deployment!** 🚀

