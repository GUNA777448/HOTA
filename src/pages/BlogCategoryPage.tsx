import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import BlogCard from "@/components/blog/BlogCard";
import BlogSEO from "@/components/blog/BlogSEO";
import {
  BLOG_CATEGORIES,
  getBlogCategoryBySlug,
  getPostsByCategory,
} from "@/constants/blog.constants";

export default function BlogCategoryPage() {
  const { slug } = useParams<{ slug: string }>();

  const category = useMemo(
    () => (slug ? getBlogCategoryBySlug(slug) : undefined),
    [slug],
  );

  const posts = useMemo(() => (slug ? getPostsByCategory(slug) : []), [slug]);

  if (!category) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          Category not found
        </h1>
        <Link to="/blog" className="text-accent hover:underline font-semibold">
          ← Back to blog
        </Link>
      </section>
    );
  }

  return (
    <>
      <BlogSEO
        pageTitle={`${category.name} — Blog`}
        pageDescription={category.description}
        canonicalPath={`/blog/category/${category.slug}`}
      />

      <section className="min-h-screen pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors duration-200 mb-10"
          >
            ← Back to blog
          </Link>

          {/* Category header */}
          <div className="text-center mb-12">
            <span
              className="inline-block text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4"
              style={{
                backgroundColor: category.color + "20",
                color: category.color,
              }}
            >
              Category
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-text-primary mb-3">
              {category.name}
            </h1>
            <p className="text-lg text-text-secondary max-w-xl mx-auto">
              {category.description}
            </p>
          </div>

          {/* Posts */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg">
                No articles in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
