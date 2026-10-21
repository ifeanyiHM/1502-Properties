<?php
// Live Open Graph tags for social crawlers on cPanel.
// .htaccess sends crawler requests for /blog/<slug> and /expandPropertyDetails/<slug> here.
// It reads index.html (the built SPA shell) and injects per-item tags from Supabase.

$cfg = @include __DIR__ . '/og-config.php';
$SITE = rtrim($cfg['site_url'] ?? 'https://1502properties.com', '/');
$SB_URL = rtrim($cfg['supabase_url'] ?? 'https://hgvmdoevulnsfenaynow.supabase.co', '/');
$SB_KEY = $cfg['supabase_key'] ?? '';
$DEFAULT_IMG = $SITE . '/openg.png';

$html = @file_get_contents(__DIR__ . '/index.html');
if ($html === false) { http_response_code(500); exit; }

function out($html) { header('Content-Type: text/html; charset=UTF-8'); echo $html; exit; }

function e($v) { return htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

// Mirrors slugify(title, { lower: true, strict: true }) used by the blog route.
function blog_slug($t) {
  $t = str_replace('-', ' ', $t);
  $c = @iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $t);
  if ($c !== false) $t = $c;
  $t = preg_replace('/[^A-Za-z0-9\s]/', '', $t);
  return strtolower(preg_replace('/\s+/', '-', trim($t)));
}
// Mirrors slugify(title) used by the property route.
function prop_slug($t) {
  $t = str_replace('-', ' ', $t);
  $t = preg_replace('/[^\w\s$*_+~.()\'"!\-:@]+/', '', $t);
  return preg_replace('/\s+/', '-', trim($t));
}

function fetch_rows($table, $cols, $url, $key) {
  if ($key === '') return [];
  $cache = sys_get_temp_dir() . '/og_' . $table . '.json';
  if (is_file($cache) && time() - filemtime($cache) < 300) {
    $d = json_decode(@file_get_contents($cache), true);
    if (is_array($d)) return $d;
  }
  $ch = curl_init("$url/rest/v1/$table?select=" . rawurlencode($cols));
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 6,
    CURLOPT_HTTPHEADER => ["apikey: $key", "Authorization: Bearer $key"],
  ]);
  $body = curl_exec($ch);
  $ok = curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200;
  curl_close($ch);
  $d = $ok ? json_decode($body, true) : null;
  if (!is_array($d)) { $d = json_decode(@file_get_contents($cache), true); return is_array($d) ? $d : []; }
  @file_put_contents($cache, $body);
  return $d;
}

function clean($s) {
  $s = html_entity_decode(strip_tags(str_replace('</p>', ' </p>', (string)$s)), ENT_QUOTES, 'UTF-8');
  return trim(preg_replace('/\s+/u', ' ', str_replace("\xC2\xA0", ' ', $s)));
}
function abs_img($src, $site, $default) {
  if (!$src || preg_match('/\.(mp4|webm|ogg)(\?.*)?$/i', $src)) return $default;
  return preg_match('#^https?://#i', $src) ? $src : $site . '/' . ltrim($src, '/');
}

$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH) ?: '');
if (!preg_match('#^/(blog|expandPropertyDetails)/([^/]+)/?$#', $path, $m)) out($html);
[$_, $kind, $slug] = $m;

$meta = null;
if ($kind === 'blog') {
  foreach (fetch_rows('blogs', 'title,content,images', $SB_URL, $SB_KEY) as $b) {
    if (!empty($b['title']) && blog_slug($b['title']) === $slug) {
      preg_match('/<p[^>]*>(?:(?!<\/p>)[\s\S])*?\S[\s\S]*?<\/p>/i', (string)$b['content'], $pm);
      $desc = clean($pm[0] ?? '') ?: $b['title'];
      $meta = [
        'title' => $b['title'] . ' | 1502 Properties',
        'desc' => mb_substr($desc, 0, 200),
        'url' => "$SITE/blog/$slug",
        'img' => abs_img($b['images'][0] ?? '', $SITE, $DEFAULT_IMG),
        'type' => 'article',
      ];
      break;
    }
  }
} else {
  foreach (fetch_rows('properties', 'title,src,price,location', $SB_URL, $SB_KEY) as $p) {
    if (!empty($p['title']) && prop_slug($p['title']) === $slug) {
      $price = (string)($p['price'] ?? '');
      if ($price !== '' && !preg_match('/^(₦|Contact)/u', $price)) $price = '₦ ' . $price;
      $desc = implode(' | ', array_filter([$price, $p['location'] ?? '']));
      $meta = [
        'title' => $p['title'] . ' | 1502 Properties',
        'desc' => $desc ?: $p['title'],
        'url' => "$SITE/expandPropertyDetails/$slug",
        'img' => abs_img($p['src'][0] ?? '', $SITE, $DEFAULT_IMG),
        'type' => 'website',
      ];
      break;
    }
  }
}
if (!$meta) out($html); // unknown slug: serve the normal shell

$html = preg_replace([
  '#<title>[\s\S]*?</title>#i',
  '#<link\s+rel="canonical"[^>]*>#i',
  '#<meta\s+name="description"[\s\S]*?/>#i',
  '#<meta\s+property="og:(?!site_name|locale)[\s\S]*?/>#i',
  '#<meta\s+name="twitter:(?:title|description|image|site|card)"[\s\S]*?/>#i',
], '', $html);

$t = e($meta['title']); $d = e($meta['desc']); $u = e($meta['url']); $i = e($meta['img']);
$tags = <<<TAGS
<title>$t</title>
<meta name="description" content="$d" />
<link rel="canonical" href="$u" />
<meta property="og:type" content="{$meta['type']}" />
<meta property="og:title" content="$t" />
<meta property="og:description" content="$d" />
<meta property="og:url" content="$u" />
<meta property="og:image" content="$i" />
<meta property="og:image:alt" content="$t" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="$t" />
<meta name="twitter:description" content="$d" />
<meta name="twitter:image" content="$i" />
</head>
TAGS;
out(str_replace('</head>', $tags, $html));
