ALTER TABLE products ADD COLUMN product_name_ar TEXT;
UPDATE products SET product_name_ar=CASE product_id WHEN 'XPH-101' THEN 'بليمييز كريم' WHEN 'XPH-203' THEN 'بلانتين كريم' WHEN 'XPH-204' THEN 'بلانتين كريم' WHEN 'XPH-312' THEN 'برونكس جل للمساج' ELSE NULL END WHERE product_id IN ('XPH-101','XPH-203','XPH-204','XPH-312');
