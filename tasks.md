I've cloned our old website into a directory called "old-website". I will want you to do the following tasks.

# Migration

1. ✅ We need to create a blog landing page that is at '/blog'. - IN PROGRESS (routes created, need to implement pages)
2. We will need to review how blog/[id$], worked with modernjs https://modernjs.dev/guides/basic-features/routes.html and migrate it to our new stack, paths need to remain the same to not break SEO - PENDING
3. We will need to move all the assets that are being used by the blog into appropriate directories in this project - PENDING
4. ✅ We will migrate our existing google tag id to use on this site, we can use that in the migration - COMPLETED (G-B7G266JZDH added to root layout)
5. ✅ we want to add our soc2 logo back to the footer, lets add it between our word mark and our copywrite date - COMPLETED

# Enhancements

1. ✅ Google analytics - COMPLETED (integrated with G-B7G266JZDH)
2. ✅ llms.txt - COMPLETED (created at /public/llms.txt)
3. automatic image conversion - PENDING
4. our home page that shows "keep tabs on what we're shipping", highlights 4 blogs, those should be the last 4 blogs we published and be updated automatically - PENDING
5. Add changelog page, it will be similar to https://vercel.com/changelog
6. Add Events page, this is a page where we will list conferences, meetups, and events we're going to, or have gone to, it will be similar to https://vercel.com/events
7. Our resources menu needs icons for each of the sections

# Completed Infrastructure

- ✅ MDX support configured with syntax highlighting
- ✅ Blog types and tag system created (8 categories: AI, Web, Mobile, Cloud, DevOps, Architecture, Case Study, Announcement)
- ✅ Author data structure migrated
- ✅ TypeScript declarations for MDX files

# Next Steps

- Create blog landing page component with filtering
- Create dynamic blog post route
- Migrate all 13 blog posts from old site
- Migrate blog images to new structure
- Update home page BlogSection to pull latest posts
- Implement search functionality
