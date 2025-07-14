import type { RsbuildPlugin } from '@rsbuild/core';
import { readdirSync } from 'fs';
import { join } from 'path';

interface SitemapRoute {
  path: string;
  priority?: number;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

const generateSitemapXML = (routes: SitemapRoute[], baseUrl: string): string => {
  const today = new Date().toISOString().split('T')[0];
  
  const urlEntries = routes.map(route => {
    const loc = `${baseUrl}${route.path}`;
    const priority = route.priority || 0.5;
    const changefreq = route.changefreq || 'monthly';
    
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

// Function to get slugs from content directories
const getContentSlugs = (contentPath: string): string[] => {
  try {
    const files = readdirSync(contentPath);
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace('.mdx', ''));
  } catch (error) {
    console.warn(`Could not read content directory: ${contentPath}`);
    return [];
  }
};

// Function to get static routes from the routes directory
const getStaticRoutes = (routesPath: string, prefix: string = ''): string[] => {
  try {
    const files = readdirSync(routesPath);
    const routes: string[] = [];
    
    files.forEach(file => {
      // Skip special files
      if (file.startsWith('__') || file.startsWith('$') || file === 'index.tsx') {
        return;
      }
      
      const fullPath = join(routesPath, file);
      
      // Handle directories
      if (!file.includes('.')) {
        try {
          const subFiles = readdirSync(fullPath);
          
          // Check if it has an index.tsx (indicating it's a route)
          if (subFiles.includes('index.tsx')) {
            routes.push(`${prefix}/${file}`);
          }
          
          // Also check for nested routes (like products/code-elimination-performance.tsx)
          const nestedRoutes = getStaticRoutes(fullPath, `${prefix}/${file}`);
          routes.push(...nestedRoutes);
        } catch (e) {
          // Not a directory
        }
      } else if (file.endsWith('.tsx')) {
        // Handle .tsx files as routes
        const routeName = file.replace('.tsx', '');
        routes.push(`${prefix}/${routeName}`);
      }
    });
    
    return routes;
  } catch (error) {
    console.warn(`Could not read routes directory: ${routesPath}`);
    return [];
  }
};

class SitemapGeneratorRspackPlugin {
  private routes: SitemapRoute[];
  private baseUrl: string;
  private generated: boolean;

  constructor() {
    this.baseUrl = 'https://zephyr-cloud.io';
    this.routes = [];
    this.generated = false;
    
    // Initialize routes
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const projectRoot = process.cwd();
    
    // Always include home page
    this.routes.push({ path: '/', priority: 1.0, changefreq: 'weekly' });
    
    // Get static routes from the routes directory
    const routesPath = join(projectRoot, 'src', 'routes');
    const staticRoutes = getStaticRoutes(routesPath);
    
    // Add static routes with appropriate priorities
    staticRoutes.forEach(route => {
      let priority = 0.7;
      let changefreq: SitemapRoute['changefreq'] = 'monthly';
      
      // Set specific priorities and changefreq for known routes
      if (route === '/blog') {
        priority = 0.9;
        changefreq = 'daily';
      } else if (route === '/pricing') {
        priority = 0.9;
      } else if (route === '/changelog') {
        priority = 0.8;
        changefreq = 'weekly';
      } else if (route === '/privacy') {
        priority = 0.5;
        changefreq = 'yearly';
      } else if (route.startsWith('/products/')) {
        priority = 0.8;
      }
      
      this.routes.push({ path: route, priority, changefreq });
    });
    
    // Get blog post slugs
    const blogContentPath = join(projectRoot, 'src', 'content', 'blog');
    const blogSlugs = getContentSlugs(blogContentPath);
    
    // Add blog routes
    blogSlugs.forEach(slug => {
      this.routes.push({
        path: `/blog/${slug}`,
        priority: 0.7,
        changefreq: 'monthly'
      });
    });
    
    // Get changelog entry slugs
    const changelogContentPath = join(projectRoot, 'src', 'content', 'changelog');
    const changelogSlugs = getContentSlugs(changelogContentPath);
    
    // Add changelog routes
    changelogSlugs.forEach(slug => {
      this.routes.push({
        path: `/changelog/${slug}`,
        priority: 0.6,
        changefreq: 'monthly'
      });
    });
  }

  apply(compiler: any) {
    const pluginName = 'SitemapGeneratorRspackPlugin';
    
    // Use processAssets hook which is the modern way to emit assets
    compiler.hooks.compilation.tap(pluginName, (compilation: any) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: pluginName,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        (assets: any, callback: any) => {
          try {
            // Check if sitemap already exists in assets
            if (assets['sitemap.xml'] || this.generated) {
              callback();
              return;
            }
            
            const sitemapContent = generateSitemapXML(this.routes, this.baseUrl);
            
            // Create a source object from the content
            const source = new compiler.webpack.sources.RawSource(sitemapContent);
            
            // Emit the sitemap file
            compilation.emitAsset('sitemap.xml', source);
            
            this.generated = true;
            console.log(`✅ Sitemap generated with ${this.routes.length} URLs`);
            callback();
          } catch (error) {
            callback(error);
          }
        }
      );
    });
  }
}

export const sitemapGeneratorPlugin = (): RsbuildPlugin => ({
  name: 'sitemap-generator',
  setup(api) {
    api.modifyRspackConfig((config) => {
      config.plugins = config.plugins || [];
      config.plugins.push(new SitemapGeneratorRspackPlugin());
      return config;
    });
  }
});