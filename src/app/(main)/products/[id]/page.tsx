import Link from "next/link";
import { ArrowLeft, Star, CheckCircle, Zap, Download } from "@/components/icons";
import { products as catalog } from "@/data/products";
import { getProductDownload } from "@/data/downloads";
import ProductPageClient from "./ProductPageClient";

const products = Object.fromEntries(catalog.map((p) => [p.id, p]));

// Generate static params for all products
export function generateStaticParams() {
  return catalog.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products[id as keyof typeof products];
  const downloadInfo = getProductDownload(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
          <Link href="/products" className="text-blue-400 hover:text-blue-300">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductPageClient product={product} downloadInfo={downloadInfo} params={{ id }} />;
}
