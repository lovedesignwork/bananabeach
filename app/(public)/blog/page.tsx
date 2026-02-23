import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { generatePageMetadata } from '@/lib/seo/config';
import { supabaseAdmin } from '@/lib/supabase/server';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = generatePageMetadata(
  'Blog - Beach Tips & Island Stories',
  'Read the latest news, beach tips, travel guides, and stories from Banana Beach Koh Hey. Discover island experiences, travel tips, and tropical paradise insights.',
  '/blog'
);

export const revalidate = 60;

async function getBlogPosts() {
  const { data: posts, error } = await supabaseAdmin
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, category, published_at, content')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return posts.map(post => ({
    ...post,
    readTime: Math.ceil((post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0) / 200) || 5,
  }));
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/Hero%20Image/Beach.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-transparent to-primary" />
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              Our Blog
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] text-white mb-6">
              Island <span className="text-accent">Stories</span>
            </h1>
            <p className="text-lg text-white/70">
              Tips, stories, and news from Phuket&apos;s premier beach destination
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Posts Section */}
      <Section className="bg-slate-50 py-20">
        <Container>
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-600 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group h-full bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-accent/30 transition-all duration-300 shadow-sm">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ 
                          backgroundImage: post.featured_image ? `url(${post.featured_image})` : undefined, 
                          backgroundColor: '#e2e8f0' 
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                      {post.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-full">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-xl font-[family-name:var(--font-heading)] text-slate-800 mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">{post.published_at ? formatDate(post.published_at) : ''}</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-4 h-4" />
                          {post.readTime} min read
                        </span>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <span className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
