import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Container, Section } from '@/components/ui';
import { formatDate } from '@/lib/utils';
import { siteConfig } from '@/lib/seo/config';
import { ArticleSchema, BreadcrumbSchema } from '@/lib/seo/structured-data';
import { supabaseAdmin } from '@/lib/supabase/server';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

async function getBlogPost(slug: string) {
  const { data: post, error } = await supabaseAdmin
    .from('blog_posts')
    .select(`
      *,
      author:admin_users!author_id(name)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !post) {
    return null;
  }

  return {
    ...post,
    authorName: post.author?.name || 'Banana Beach Team',
    readTime: Math.ceil((post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0) / 200) || 5,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  const url = `${siteConfig.url}/blog/${slug}`;
  const image = post.og_image || post.featured_image || siteConfig.ogImage;

  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    authors: [{ name: post.authorName }],
    alternates: {
      canonical: post.canonical_url || url,
    },
    robots: {
      index: !post.no_index,
      follow: !post.no_follow,
    },
    openGraph: {
      type: 'article',
      title: post.og_title || post.seo_title || `${post.title} | ${siteConfig.name}`,
      description: post.og_description || post.seo_description || post.excerpt,
      url,
      images: [
        {
          url: image.startsWith('http') ? image : `${siteConfig.url}${image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.published_at,
      authors: [post.authorName],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.twitter_title || post.seo_title || post.title,
      description: post.twitter_description || post.seo_description || post.excerpt,
      images: [(post.twitter_image || image).startsWith('http') ? (post.twitter_image || image) : `${siteConfig.url}${post.twitter_image || image}`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleUrl = `${siteConfig.url}/blog/${slug}`;
  const articleImage = post.featured_image?.startsWith('http') 
    ? post.featured_image 
    : post.featured_image 
      ? `${siteConfig.url}${post.featured_image}` 
      : `${siteConfig.url}${siteConfig.ogImage}`;

  return (
    <main className="min-h-screen">
      <ArticleSchema
        title={post.title}
        description={post.seo_description || post.excerpt || ''}
        image={articleImage}
        url={articleUrl}
        datePublished={post.published_at}
        author={post.authorName}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Blog', url: `${siteConfig.url}/blog` },
          { name: post.title, url: articleUrl },
        ]}
      />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-primary to-primary-dark overflow-hidden">
        {post.featured_image && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${post.featured_image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary" />
          </>
        )}
        
        <Container className="relative z-10 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-accent mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          
          {post.category && (
            <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded-full mb-6">
              {post.category}
            </span>
          )}
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-heading)] text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/60">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.authorName}
            </div>
            {post.published_at && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </div>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <Section className="bg-slate-50 py-16">
        <Container className="max-w-4xl">
          {post.featured_image && (
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12 border border-slate-200 shadow-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${post.featured_image})` }}
              />
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-slate-600 leading-relaxed 
                [&_h1]:text-slate-800 [&_h1]:text-3xl [&_h1]:font-[family-name:var(--font-heading)] [&_h1]:mt-10 [&_h1]:mb-4 
                [&_h2]:text-slate-800 [&_h2]:text-2xl [&_h2]:font-[family-name:var(--font-heading)] [&_h2]:mt-10 [&_h2]:mb-4 
                [&_h3]:text-slate-800 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 
                [&_p]:mb-6 
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 
                [&_li]:mb-2 
                [&_a]:text-accent [&_a]:underline [&_a]:hover:text-primary
                [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-6 [&_blockquote]:text-slate-500
                [&_img]:rounded-xl [&_img]:my-8 [&_img]:border [&_img]:border-slate-200
                [&_strong]:text-slate-800 [&_strong]:font-semibold
                [&_code]:bg-slate-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-accent
                [&_pre]:bg-white [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-slate-200 [&_pre]:overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h4 className="text-slate-500 text-sm uppercase tracking-wider mb-4">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:text-accent hover:border-accent/30 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
