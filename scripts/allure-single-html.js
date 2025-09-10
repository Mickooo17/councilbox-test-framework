const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const reportDir = 'allure-report';
const htmlPath = path.join(reportDir, 'index.html');

// Učitaj HTML
let html = fs.readFileSync(htmlPath, 'utf8');
const $ = require('cheerio').load(html);

// Inline CSS fajlove
$('link[rel="stylesheet"]').each((i, el) => {
  const href = $(el).attr('href');
  if (href && !href.startsWith('http')) {
    const cssPath = path.join(reportDir, href);
    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf8');
      $(el).replaceWith(`<style>${cssContent}</style>`);
    }
  }
});

// Inline JS fajlove
$('script[src]').each((i, el) => {
  const src = $(el).attr('src');
  if (src && !src.startsWith('http')) {
    const jsPath = path.join(reportDir, src);
    if (fs.existsSync(jsPath)) {
      const jsContent = fs.readFileSync(jsPath, 'utf8');
      $(el).replaceWith(`<script>${jsContent}</script>`);
    }
  }
});

// Inline JSON iz data foldera
// Allure učitava JSON preko fetch/XHR — zamijenit ćemo ih globalnom varijablom
const dataDir = path.join(reportDir, 'data');
if (fs.existsSync(dataDir)) {
  const dataFiles = fs.readdirSync(dataDir);
  let dataScript = '<script>window.__ALLURE_DATA__ = {};';
  dataFiles.forEach(file => {
  const filePath = path.join(dataDir, file);
  const stat = fs.statSync(filePath);
  if (stat.isFile()) {
    const content = fs.readFileSync(filePath, 'utf8');
    dataScript += `window.__ALLURE_DATA__["${file}"] = ${content};`;
  }
});
  dataScript += '</script>';
  $('body').append(dataScript);
}

// Spremi novi HTML fajl
fs.writeFileSync('allure-report-single.html', $.html(), 'utf8');
console.log('✅ Allure single-file HTML generated: allure-report-single.html');