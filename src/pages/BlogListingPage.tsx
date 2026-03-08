import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import BlogCard from "@/components/blog/BlogCard";
import BlogSearch from "@/components/blog/BlogSearch";
import BlogCategoryFilter from "@/components/blog/BlogCategoryFilter";
import BlogSEO from "@/components/blog/BlogSEO";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  getPostsByCategory,
  searchBlogPosts,
} from "@/constants/blog.constants";
import { useInView } from "@/hooks/useInView";

export default function BlogListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || null;
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = BLOG_POSTS.find((p) => p.featured);

  const filteredPosts = useMemo(() => {
    let posts = categoryParam
      ? getPostsByCategory(categoryParam)
      : [...BLOG_POSTS];

    if (searchQuery.trim()) {
      const searched = searchBlogPosts(searchQuery);
      const searchIds = new Set(searched.map((p) => p.id));
      posts = posts.filter((p) => searchIds.has(p.id));
    }

    // Don't show featured post in grid if no filters are active
    if (!categoryParam && !searchQuery.trim() && featuredPost) {
      posts = posts.filter((p) => p.id !== featuredPost.id);
    }

    return posts;
  }, [categoryParam, searchQuery, featuredPost]);

  const handleCategorySelect = (slug: string | null) => {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: filterRef, inView: filterInView } = useInView({ threshold: 0.1 });
  const { ref: gridRef, inView: gridInView } = useInView({ threshold: 0.05 });

  const showFeaturedHero =
    featuredPost && !categoryParam && !searchQuery.trim();

  return (
    <>
      <BlogSEO
        pageTitle="Blog"
        pageDescription="Insights on branding, marketing, and growth from HOTA — India's creative growth agency."
        canonicalPath="/blog"
      />

      <section className="min-h-screen pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary mb-4">
              The Growth <span className="text-accent">Journal</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Insights, strategies, and stories on branding, marketing, and
              building brands that dominate — not just exist.
            </p>
          </div>

          {/* Featured Hero Article */}
          {showFeaturedHero && featuredPost && (
            <div
              ref={heroRef}
              className={`mb-16 transition-all duration-700 ${
                heroInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <BlogCard post={featuredPost} variant="hero" />
            </div>
          )}

          {/* Filters & Search */}
          <div
            ref={filterRef}
            className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 transition-all duration-700 delay-100 ${
              filterInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <BlogCategoryFilter
              categories={BLOG_CATEGORIES}
              activeCategory={categoryParam}
              onSelect={handleCategorySelect}
            />
            <BlogSearch value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Articles Grid */}
          <div
            ref={gridRef}
            className={`transition-all duration-700 delay-200 ${
              gridInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-text-muted text-lg">
                  No articles found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchParams({});
                  }}
                  className="mt-4 text-accent hover:underline text-sm font-semibold cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20">
            <NewsletterCTA variant="inline" />
          </div>
        </div>
      </section>
    </>
  );
}
