-- Update blog posts with featured images
UPDATE blog_posts 
SET featured_image = '/src/assets/blog-driving-test-tips.jpg'
WHERE slug = 'driving-test-tips';

UPDATE blog_posts 
SET featured_image = '/src/assets/blog-technology-education-gap.jpg'
WHERE slug = 'how-technology-fixes-nigeria-driving-education-gap';

UPDATE blog_posts 
SET featured_image = '/src/assets/blog-road-safety-guide.jpg'
WHERE slug = 'road-safety-guide';