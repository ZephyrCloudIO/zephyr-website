import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPolicy,
})

function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
      <div className="prose prose-lg  prose-invert max-w-none">
        <p>
          This Privacy Notice describes how Zephyr (&ldquo;our,&rdquo;
          &ldquo;we&rdquo;) collects, uses, and shares personal information.
        </p>
        <br/>
        <p>In particular, this Privacy Notice applies to:</p>
        <br/>
        <p>
          Our website at Zephyr-Cloud.io as available to the general public, and
          any of our subdomains of zephyr-cloud.io (our &ldquo;Website&rdquo;).
          This Privacy Notice applies to visitors to our Website
          (&ldquo;Visitors&rdquo;).
        </p>
        <br/>
        <p>
          Our other online services we operate that post this Notice
          (&ldquo;Services&rdquo;). As a central part of our Services, we enable
          our customers and their employees (&ldquo;Customers&rdquo;) to track,
          observe and more effectively utilize software code and other developed
          components and content across their websites and online services.
          Through our Services, we may interact with our Customers&rsquo; online
          visitors to their websites and online services
          (&ldquo;Customers&rsquo; Audience&rdquo;).
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
        <p>
          To provide our Website and Services, we may collect data by which
          Visitors, Customers, and members of our Customers&rsquo; Audience may
          be identified. We may also collect information about the devices and
          equipment you use to access our Website and Services, including usage
          data.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">
          How We Collect Information
        </h2>
        <p>We collect this information from a variety of sources, including:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Directly from you when you provide it to us.</li>
          <li>
            Indirectly through our provision of Services to our Customers.
          </li>
          <li>Automatically as you utilize the Website or Services.</li>
          <li>
            With respect to our Website, from third parties, including analytics
            providers.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Information</h2>
        <p>
          If you have any questions or concern about this privacy notice or the
          privacy practices at Zephyr, please contact us by emailing us at{' '}
          <a
            href="mailto:support@zephyr-cloud.io"
            className="text-blue-400 hover:text-blue-300"
          >
            support@zephyr-cloud.io
          </a>
          .
        </p>

        <p className="mt-8 text-sm text-gray-400">Last Updated: 4/16/2024</p>
      </div>
    </div>
  )
}
