"use client";

import { useParams } from "next/navigation";
import { blogPosts } from "@/data/blog";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "@/components/icons";
import AnimatedHeading from "@/components/AnimatedHeading";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function BlogPostPage() {
    const { slug } = useParams();
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
                    <Link href="/blog" className="text-accent hover:underline">Return to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20">
            <div className="mx-auto max-w-4xl px-4">
                {/* Back Link */}
                <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-accent mb-12 transition-colors">
                    <ArrowLeft className="size-4 mr-2" />
                    Back to Insights
                </Link>

                {/* Content */}
                <article className="relative z-10">
                    <RevealOnScroll width="100%">
                        <div className="mb-8">
                            <span className="text-xs font-semibold text-accent uppercase tracking-wider px-2 py-1 bg-accent/10 rounded">
                                {post.category}
                            </span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-12 py-6 border-y border-white/10">
                            <div className="flex items-center gap-2">
                                <Calendar className="size-4" />
                                <span>{new Date(post.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tag className="size-4" />
                                <div className="flex gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="hover:text-white transition-colors">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.2} width="100%">
                        <div className="prose prose-invert prose-lg max-w-none">
                            {/* Note: In a real app, you'd use a markdown renderer here. 
                  For this implementation, we render the pre-formatted content. */}
                            <div className="whitespace-pre-wrap leading-relaxed space-y-4">
                                {post.content}
                            </div>
                        </div>
                    </RevealOnScroll>
                </article>

                {/* CTA */}
                <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-accent/20 to-transparent border border-accent/20 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Ready to Automate Your Signals?</h2>
                    <p className="text-muted-foreground mb-8">
                        Experience the power of the Signal Sync Hub and never miss a trade again.
                    </p>
                    <Link href="https://www.signaltradingbots.com/products" className="inline-flex items-center justify-center rounded-full bg-accent text-accent-foreground px-8 py-4 font-bold hover:scale-105 transition-transform" target="_blank" rel="noopener noreferrer">
                        Explore Signal Sync
                    </Link>
                </div>
            </div>
        </div>
    );
}
