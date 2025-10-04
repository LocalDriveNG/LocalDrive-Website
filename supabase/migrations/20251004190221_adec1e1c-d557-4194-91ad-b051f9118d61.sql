-- Create blog_posts table
CREATE TABLE public.blog_posts (
  slug text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  og_image text,
  published_at timestamp with time zone DEFAULT now(),
  author text NOT NULL,
  keywords text[],
  meta_title text,
  meta_description text,
  canonical_url text,
  structured_data jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create index on published_at for performance
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Public read access (no authentication required)
CREATE POLICY "Public can read published blog posts"
ON public.blog_posts
FOR SELECT
USING (true);

-- Policy: Only admins can insert blog posts
CREATE POLICY "Admins can insert blog posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (((SELECT auth.jwt() AS jwt) ->> 'is_admin'::text) = 'true'::text);

-- Policy: Only admins can update blog posts
CREATE POLICY "Admins can update blog posts"
ON public.blog_posts
FOR UPDATE
USING (((SELECT auth.jwt() AS jwt) ->> 'is_admin'::text) = 'true'::text)
WITH CHECK (((SELECT auth.jwt() AS jwt) ->> 'is_admin'::text) = 'true'::text);

-- Policy: Only admins can delete blog posts
CREATE POLICY "Admins can delete blog posts"
ON public.blog_posts
FOR DELETE
USING (((SELECT auth.jwt() AS jwt) ->> 'is_admin'::text) = 'true'::text);

-- Insert initial blog posts
INSERT INTO public.blog_posts (
  slug,
  title,
  description,
  content,
  author,
  keywords,
  meta_title,
  og_image,
  published_at
) VALUES (
  'driving-test-tips',
  '10 Tips to Pass Your Driving Test in Nigeria',
  'Struggling with your driving test? Here are 10 proven tips to boost your chances of passing the first time in Nigeria.',
  '<article class="blog-content">
    <p class="lead">Taking your driving test in Nigeria can be nerve-wracking, but with the right preparation and mindset, you can pass on your first attempt. Here are 10 proven tips to help you succeed.</p>
    
    <h2>1. Master the Basics Before Test Day</h2>
    <p>Ensure you''re comfortable with all fundamental driving skills: steering control, smooth acceleration and braking, proper mirror usage, and understanding traffic signs. Practice these basics until they become second nature.</p>
    
    <h2>2. Know the Highway Code Inside Out</h2>
    <p>The Nigerian Highway Code is your bible for the driving test. Study it thoroughly, paying special attention to road signs, markings, and right-of-way rules. Many test failures come from not understanding basic traffic regulations.</p>
    
    <h2>3. Practice on the Actual Test Route</h2>
    <p>If possible, practice on the roads where the test typically takes place. Familiarize yourself with common challenging intersections, roundabouts, and road conditions. This knowledge will boost your confidence on test day.</p>
    
    <h2>4. Get Comfortable with Your Test Vehicle</h2>
    <p>Practice with the same type of vehicle you''ll use for the test. Every car has different dimensions, blind spots, and controls. Being comfortable with your test vehicle eliminates one major source of anxiety.</p>
    
    <h2>5. Perfect Your Parking Skills</h2>
    <p>Parking maneuvers—parallel parking, reverse parking, and three-point turns—are critical test components. Practice these until you can execute them smoothly and confidently without multiple attempts.</p>
    
    <h2>6. Develop a Pre-Drive Routine</h2>
    <p>Before starting the engine, check your mirrors, adjust your seat and headrest, fasten your seatbelt, and ensure all controls are within reach. Examiners appreciate candidates who demonstrate safety awareness from the start.</p>
    
    <h2>7. Stay Calm and Drive Defensively</h2>
    <p>Nervousness is normal, but let it sharpen your focus rather than cloud your judgment. Drive defensively, anticipate other road users'' actions, and maintain a safe following distance. Show the examiner you''re a cautious, responsible driver.</p>
    
    <h2>8. Communicate Your Intentions Clearly</h2>
    <p>Use your indicators well in advance of any maneuver. Check mirrors and blind spots before changing lanes or turning. Make your observations obvious to the examiner—they need to see that you''re actively checking your surroundings.</p>
    
    <h2>9. Understand Nigerian Road Conditions</h2>
    <p>Nigerian roads present unique challenges: potholes, irregular traffic patterns, and sometimes poorly marked lanes. Demonstrate that you can adapt to these conditions while maintaining safe driving practices.</p>
    
    <h2>10. Learn from Mock Tests</h2>
    <p>Take practice tests with your instructor. Get feedback on your weak areas and work on improving them. A mock test simulates the pressure of the real examination and helps you identify areas needing more practice.</p>
    
    <div class="bg-primary/10 p-6 rounded-lg my-8">
      <h3>Final Thoughts</h3>
      <p>Remember, the driving test isn''t designed to trick you—it''s meant to ensure you''re safe on the road. Focus on demonstrating safe, confident driving habits, and you''ll be well on your way to earning your license.</p>
      <p class="mb-0"><strong>Ready to start your driving journey?</strong> Connect with certified instructors on LocalDrive and begin your path to confident, safe driving today.</p>
    </div>
  </article>',
  'LocalDrive Team',
  ARRAY['driving test', 'driving tips', 'Nigeria driving test', 'pass driving test', 'driving exam preparation'],
  '10 Tips to Pass Your Driving Test in Nigeria | LocalDrive',
  NULL,
  now()
), (
  'road-safety-guide',
  'Road Safety Guide for Nigerian Drivers',
  'Stay safe on Nigerian roads with these essential road safety rules and driving best practices tailored for local conditions.',
  '<article class="blog-content">
    <p class="lead">Road safety is paramount for every driver in Nigeria. Our unique road conditions, traffic patterns, and infrastructure require special awareness and defensive driving skills. This comprehensive guide will help you navigate Nigerian roads safely.</p>
    
    <h2>Understanding Nigerian Road Conditions</h2>
    <p>Nigerian roads present diverse challenges—from well-maintained highways to poorly marked rural roads. Understanding these conditions is the first step to staying safe.</p>
    
    <h3>Common Road Hazards</h3>
    <ul>
      <li><strong>Potholes:</strong> Watch for sudden potholes, especially during rainy season. Maintain a safe speed that allows you to react quickly.</li>
      <li><strong>Poor Road Markings:</strong> Many roads lack clear lane markings. Stay alert and maintain safe distances from other vehicles.</li>
      <li><strong>Unpredictable Traffic:</strong> Expect motorcycles, pedestrians, and street vendors. Always anticipate unexpected movements.</li>
      <li><strong>Limited Street Lighting:</strong> Exercise extra caution when driving at night, especially on unfamiliar routes.</li>
    </ul>
    
    <h2>Essential Defensive Driving Techniques</h2>
    
    <h3>1. Maintain Safe Following Distance</h3>
    <p>The three-second rule is your friend. Keep at least three seconds of travel time between you and the vehicle ahead. In heavy traffic or poor weather, increase this to five seconds.</p>
    
    <h3>2. Anticipate Other Drivers'' Actions</h3>
    <p>Watch for early warning signs: brake lights, turn signals (when used), and vehicle positioning. In Nigeria, not all drivers signal their intentions, so watch vehicle movements carefully.</p>
    
    <h3>3. Use Mirrors Constantly</h3>
    <p>Check your mirrors every 5-8 seconds. Be especially vigilant for motorcycles (okada) that may appear suddenly in your blind spots.</p>
    
    <h3>4. Never Assume Right of Way</h3>
    <p>Even when you have the right of way, ensure other drivers are yielding before proceeding. This simple practice prevents many accidents.</p>
    
    <h2>Vehicle Maintenance for Nigerian Conditions</h2>
    <p>Regular maintenance is crucial for safety on Nigerian roads.</p>
    
    <h3>Critical Maintenance Checks</h3>
    <ul>
      <li><strong>Tires:</strong> Check tire pressure weekly and tread depth monthly. Nigerian roads are harsh on tires.</li>
      <li><strong>Brakes:</strong> Have brakes inspected every 6 months. Responsive brakes are essential for safety.</li>
      <li><strong>Lights:</strong> Ensure all lights work properly. This is critical for night driving and signaling your presence.</li>
      <li><strong>Windshield Wipers:</strong> Replace worn wipers before rainy season. Visibility is crucial for safety.</li>
      <li><strong>Suspension:</strong> Regular suspension checks help handle potholes and uneven roads better.</li>
    </ul>
    
    <h2>Traffic Rules and Regulations</h2>
    
    <h3>Speed Limits</h3>
    <p>Observe posted speed limits, but also drive according to conditions. On Nigerian roads, the safest speed isn''t always the legal maximum—it''s the speed appropriate for current conditions.</p>
    
    <h3>Seatbelt Usage</h3>
    <p>Always wear your seatbelt, and ensure all passengers are buckled up. This simple action can be life-saving in an accident.</p>
    
    <h3>Avoid Distracted Driving</h3>
    <p>Put away your phone. Eating, texting, or any activity that takes your attention from the road significantly increases accident risk.</p>
    
    <h3>Never Drink and Drive</h3>
    <p>Alcohol impairs judgment, reaction time, and coordination. If you plan to drink, arrange alternative transportation.</p>
    
    <h2>Emergency Preparedness</h2>
    
    <h3>Essential Items to Keep in Your Car</h3>
    <ul>
      <li>Spare tire, jack, and lug wrench (check monthly)</li>
      <li>First aid kit</li>
      <li>Fire extinguisher</li>
      <li>Warning triangle</li>
      <li>Flashlight with extra batteries</li>
      <li>Basic tool kit</li>
      <li>Emergency contact numbers</li>
    </ul>
    
    <h3>What to Do After an Accident</h3>
    <ol>
      <li>Check for injuries and call for medical help if needed</li>
      <li>Move vehicles to safety if possible, but take photos first</li>
      <li>Exchange information with other parties</li>
      <li>Report to the nearest police station</li>
      <li>Notify your insurance company promptly</li>
    </ol>
    
    <h2>Special Considerations for Different Road Types</h2>
    
    <h3>City Driving</h3>
    <p>Heavy traffic requires patience and heightened awareness. Watch for pedestrians crossing between vehicles and motorcycles weaving through traffic.</p>
    
    <h3>Highway Driving</h3>
    <p>Maintain consistent speed, use the passing lane only for overtaking, and watch for vehicles merging. Be especially cautious of large trucks.</p>
    
    <h3>Rural Roads</h3>
    <p>Reduce speed on unfamiliar roads. Watch for livestock, pedestrians, and unmarked hazards. Rural roads often lack shoulders for emergency stops.</p>
    
    <div class="bg-primary/10 p-6 rounded-lg my-8">
      <h3>Your Safety is Our Priority</h3>
      <p>Road safety starts with proper training and continues with constant vigilance. At LocalDrive, we connect you with certified instructors who emphasize safe driving practices from day one.</p>
      <p class="mb-0"><strong>Start your safe driving journey today.</strong> Book lessons with experienced instructors who understand Nigerian road conditions and will prepare you for real-world driving challenges.</p>
    </div>
  </article>',
  'LocalDrive Team',
  ARRAY['road safety', 'Nigerian roads', 'driving safety', 'defensive driving', 'safe driving tips'],
  'Road Safety Guide for Nigerian Drivers | LocalDrive',
  NULL,
  now()
);