insert into public.categories (name, slug)
values
  ('Skincare', 'skincare'),
  ('Complexion', 'complexion'),
  ('Body Care', 'body-care'),
  ('Hair Care', 'hair-care'),
  ('Lip Care', 'lip-care'),
  ('Sun Care', 'sun-care')
on conflict (slug) do update set name = excluded.name;

with catalog (title, slug, category_slug, description, price, discounted_price, sku, size, routine_step, finish, ingredients, benefits, skin_types, concerns, labels) as (
  values
    ('So White Skin Perfector Dark Spot Corrector Gel 30ml', 'so-white-dark-spot-corrector-gel', 'skincare', 'A cushion-light daily serum that leaves tired skin visibly brighter and deeply replenished.', 89.00, 64.00, 'SW-001', '30 ml / 1 fl oz', 'treat', 'Radiant', array['Rosehip oil','Bakuchiol','Niacinamide','Hyaluronic acid'], array['Brightens dull-looking skin','Supports a softer, smoother texture','Delivers lasting hydration'], array['Normal','Dry','Combination'], array['Dullness','Uneven tone','Dehydration'], array['vegan','cruelty-free','clean']),
    ('So White Exfoliating Soap Bar 200g', 'so-white-exfoliating-soap-bar', 'skincare', 'A creamy, non-foaming cleanser that melts away the day without leaving skin tight or stripped.', 42.00, 31.00, 'SW-002', '150 ml / 5 fl oz', 'cleanse', 'Comforting cream', array['Oat lipid','Squalane','Calendula','Glycerin'], array['Gently removes makeup and SPF','Protects the moisture barrier','Leaves skin supple and calm'], array['Sensitive','Dry','Normal'], array['Sensitivity','Dryness','Redness'], array['vegan','cruelty-free','dermatologist-tested']),
    ('So White Skin Perfector Brightening Cream 50ml', 'so-white-brightening-cream', 'skincare', 'A fine, cooling veil of botanical hydration for an instant reset wherever your day takes you.', 38.00, 28.00, 'SW-003', '100 ml / 3.4 fl oz', 'hydrate', 'Dewy mist', array['Aloe vera','Cucumber water','Panthenol','White tea'], array['Refreshes skin on contact','Replenishes surface hydration','Sets makeup with a dewy finish'], array['All skin types'], array['Dehydration','Dullness','Heat-stressed skin'], array['vegan','cruelty-free','clean']),
    ('So White Brightening Body Oil With Almond Oil 250ml', 'so-white-brightening-body-oil', 'complexion', 'Buildable, breathable coverage with a soft-focus finish that still looks like your skin.', 54.00, 41.00, 'SW-004', '30 ml / 1 fl oz', 'color', 'Soft matte', array['Jojoba esters','Vitamin E','Mineral pigments','Glycerin'], array['Evens the look of skin tone','Blurs without looking heavy','Wears comfortably all day'], array['Normal','Combination','Oily'], array['Uneven tone','Visible pores','Shine'], array['vegan','cruelty-free','clean']),
    ('So White Skin Perfector Brightening Body Lotion 500ml', 'so-white-brightening-body-lotion', 'body-care', 'A rich but quick-melting body cream that wraps dry skin in a silky cocoa-scented veil.', 48.00, 33.00, 'SW-005', '200 ml / 6.7 fl oz', 'body', 'Silken sheen', array['Cocoa butter','Shea butter','Marula oil','Vitamin E'], array['Softens rough, dry patches','Seals in moisture','Leaves skin touchably smooth'], array['Dry','Very dry','Normal'], array['Dryness','Rough texture','Loss of firmness'], array['vegan','cruelty-free','clean']),
    ('So White Brightening Shower Gel 1000ml', 'so-white-brightening-shower-gel', 'hair-care', 'A weightless oil blend that smooths ends, softens strands, and gives hair a healthy-looking glow.', 57.00, 39.00, 'SW-006', '50 ml / 1.7 fl oz', 'hair', 'Glossy, weightless', array['Argan oil','Camellia oil','Baobab oil','Vitamin F'], array['Smooths frizz and flyaways','Adds luminous shine','Nourishes dry ends'], array[]::text[], array['Dryness','Frizz','Split ends'], array['vegan','cruelty-free']),
    ('So White Exfoliating Shower Gel With Tonic Scrub 940ml', 'so-white-exfoliating-shower-gel', 'lip-care', 'An overnight cushion for lips that wake up visibly smoother, softer, and comforted.', 29.00, 22.00, 'SW-007', '15 g / 0.5 oz', 'lips', 'Glossy balm', array['Ceramides','Mango butter','Peptide complex','Hyaluronic acid'], array['Intensely hydrates overnight','Smooths the look of fine lines','Comforts dry, chapped lips'], array['All skin types'], array['Dryness','Chapping','Texture'], array['vegan','cruelty-free','clean']),
    ('So White Essentials Kit', 'so-white-essentials-kit', 'sun-care', 'A sheer mineral SPF that protects daily while leaving skin comfortable, fresh, and glow-ready.', 46.00, 34.00, 'SW-008', '50 ml / 1.7 fl oz', 'protect', 'Natural glow', array['Non-nano zinc oxide','Licorice root','Squalane','Green tea'], array['Broad-spectrum SPF 30 protection','Helps defend against dryness','Layers under makeup'], array['Sensitive','Normal','Combination'], array['Sun exposure','Dullness','Sensitivity'], array['vegan','cruelty-free','dermatologist-tested'])
)
insert into public.products (title, slug, category_id, description, status, price, discounted_price, sku, size, routine_step, finish, ingredients, benefits, skin_types, concerns, labels)
select c.title, c.slug, cat.id, c.description, 'active', c.price, c.discounted_price, c.sku, c.size, c.routine_step, c.finish, c.ingredients, c.benefits, c.skin_types, c.concerns, c.labels
from catalog c
join public.categories cat on cat.slug = c.category_slug
on conflict (slug) do update set
  title = excluded.title,
  category_id = excluded.category_id,
  description = excluded.description,
  status = excluded.status,
  price = excluded.price,
  discounted_price = excluded.discounted_price,
  sku = excluded.sku,
  size = excluded.size,
  routine_step = excluded.routine_step,
  finish = excluded.finish,
  ingredients = excluded.ingredients,
  benefits = excluded.benefits,
  skin_types = excluded.skin_types,
  concerns = excluded.concerns,
  labels = excluded.labels,
  updated_at = now();

insert into public.product_media (product_id, storage_path, alt_text, sort_order)
select p.id, image.path, p.title, 0
from public.products p
join (values
  ('so-white-dark-spot-corrector-gel', '/images/products/fair-white/so-white-dark-spot-gel.png'),
  ('so-white-exfoliating-soap-bar', '/images/products/fair-white/so-white-exfoliating-soap.jpg'),
  ('so-white-brightening-cream', '/images/products/fair-white/so-white-brightening-cream.jpg'),
  ('so-white-brightening-body-oil', '/images/products/fair-white/so-white-brightening-oil.png'),
  ('so-white-brightening-body-lotion', '/images/products/fair-white/so-white-brightening-body-lotion.jpg'),
  ('so-white-brightening-shower-gel', '/images/products/fair-white/so-white-brightening-shower-gel.png'),
  ('so-white-exfoliating-shower-gel', '/images/products/fair-white/so-white-exfoliating-shower-gel.png'),
  ('so-white-essentials-kit', '/images/products/fair-white/so-white-essentials-kit.png')
) as image(slug, path) on image.slug = p.slug
where not exists (
  select 1 from public.product_media media where media.product_id = p.id and media.storage_path = image.path
);
