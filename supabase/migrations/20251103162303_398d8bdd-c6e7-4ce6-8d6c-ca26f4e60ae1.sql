-- Update blog post featured images to use public folder paths
UPDATE blog_posts 
SET featured_image = '/assets/blog-driving-test-tips.jpg'
WHERE slug = 'driving-test-tips';

UPDATE blog_posts 
SET featured_image = '/assets/blog-technology-education-gap.jpg'
WHERE slug = 'how-technology-fixes-nigeria-driving-education-gap';

UPDATE blog_posts 
SET featured_image = '/assets/blog-road-safety-guide.jpg'
WHERE slug = 'road-safety-guide';