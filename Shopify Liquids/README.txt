AVRO — Shopify Liquid export
============================

This folder contains hand-converted, theme-editor-editable Shopify Online Store 2.0
sections for the AVRO site. Each page (and the shared header / footer) lives in its own
subfolder, containing:

  - <name>.liquid.txt   ->  the section code (copy/paste into a .liquid file)
  - all images that page actually uses (excess/unused images are NOT included)
  - <name>.html         ->  (home only) the embedded decorative graphic, if used

Folders in this export
----------------------
  home/      Homepage (hero carousel, value props, product trio, cohorts, how-it-works,
             benefits, founder note, testimonials, FAQ, final CTA)
  header/    Site navigation bar (announcement bar, logo, menu, cart link)
  footer/    Site footer (link columns, newsletter, legal row)

  (Remaining pages are added in later batches once this pilot format is approved.)


HOW TO IMPORT INTO SHOPIFY
==========================

A. Upload the images (do this first)
-------------------------------------
1. In Shopify admin go to:  Content > Files
2. Drag in EVERY image from the page's folder (e.g. all images in /home).
3. Shopify stores them on its CDN. The Liquid uses {{ 'filename.png' | asset_url }},
   which resolves to those uploaded files once they're in the theme's /assets.

   NOTE: There are two valid homes for images in Shopify:
   - Theme assets  (Online Store > Themes > ... > Edit code > Assets > Add a new asset)
       Use this for the UI/graphic images. {{ 'file.png' | asset_url }} points here.
       -> Upload the page's images here for the section code to work as-written.
   - Content > Files (CDN)
       Use this if you'd rather reference full URLs. If you upload here instead,
       replace {{ 'file.png' | asset_url }} with the file's CDN URL in the Liquid.

   RECOMMENDED: add each page's images under Edit code > Assets so the as-written
   {{ '...' | asset_url }} references resolve with no edits.

B. Add a section
----------------
1. Online Store > Themes > (your theme) > ... > Edit code
2. Under "Sections", click "Add a new section", name it (e.g. "avro-home").
3. Delete the boilerplate, then paste the FULL contents of home/home.liquid.txt
   (including the {% schema %} ... {% endschema %} block at the bottom).
4. Save.

C. Put the section on a page
----------------------------
- HOME: Online Store > Themes > Customize. The homepage template ("Home page")
  -> "Add section" -> choose "AVRO Home". Reorder/edit all text + images in the
  right-hand panel. (Or add it to templates/index.json.)
- HEADER / FOOTER: these map to the theme's header/footer groups. Easiest path:
  Customize > select the Header (or Footer) group > "Add section" and pick
  "AVRO Header" / "AVRO Footer". You can disable the theme's default header/footer
  so only these render.

D. Edit everything in the Theme Editor
--------------------------------------
- Every heading, paragraph, button label + link, and image is an editable setting.
- Repeating items (hero slides, product cards, cohort tiles, steps, benefits,
  testimonials, FAQ rows, footer columns, nav links) are BLOCKS: add, remove,
  reorder, and edit them with the "Add block" controls. No code needed.


GOOD TO KNOW
============
- Styling is self-contained: each section ships its own scoped <style> with the AVRO
  design tokens (colors, fonts) baked in, so it renders correctly without Tailwind
  and without touching theme.css. Fonts referenced: a clean sans + a bold display
  serif — set these in your theme's font settings or via the section's font settings
  to match exactly.
- Interactions (hero carousel, FAQ accordions, mobile nav) use small scoped vanilla
  JS inside the section; no theme JS dependencies.
- Product cards in the homepage link to product URLs you set per-block. To make them
  pull live price/availability from your existing Shopify products instead of static
  text, see the comment near the "Product trio" block in home.liquid.txt.
- "*" disclaimers and legal copy are preserved verbatim from the live site.
