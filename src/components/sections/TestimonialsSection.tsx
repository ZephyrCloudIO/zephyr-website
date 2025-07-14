import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Twitter, Linkedin, Youtube, Twitch } from "lucide-react";
import { Testimonials } from "@/testimonials";
import { companyLogos } from "@/constants/companyLogos";

export const TestimonialsSection: React.FC = () => {
  // Social media platform to icon mapping
  const socialIcons = {
    X: Twitter,
    LinkedIn: Linkedin,
    YouTube: Youtube,
    Twitch: Twitch,
  };

  // Split testimonials into two rows for scrolling effect
  const firstRowTestimonials = Testimonials.filter(
    (_, index) => index % 2 === 0
  );
  const secondRowTestimonials = Testimonials.filter(
    (_, index) => index % 2 === 1
  );

  const TestimonialCard = ({ testimonial }: { testimonial: typeof Testimonials[0] }) => (
    <Card className="bg-stone-950 border-stone-800 text-neutral-300 flex-shrink-0 w-[380px] mx-3">
      <CardContent className="pt-6">
        <p className="mb-4 text-sm">{testimonial.content}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={testimonial.avatar}
                alt={testimonial.name}
              />
              <AvatarFallback>
                {testimonial.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-white text-sm">
                {testimonial.name}
              </div>
              <div className="text-xs text-neutral-400">
                {testimonial.role}, {testimonial.company}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {testimonial.socialLinks.map((social, socialIndex) => {
              const Icon =
                socialIcons[social.platform as keyof typeof socialIcons];
              return Icon ? (
                <a
                  key={socialIndex}
                  href={social.link}
                  target="_blank"
                  rel="noopener"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <Icon size={16} />
                </a>
              ) : null;
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 bg-neutral-950/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-center text-2xl font-semibold text-white">
          You can just ship
        </h2>
      </div>

      {/* Scrolling testimonials container */}
      <div className="relative">
        {/* First row of testimonials */}
        <div className="mb-6 relative">
          <div className="flex scrolling-container">
            {/* Original set */}
            {firstRowTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
            ))}
            {/* Duplicate set for seamless loop */}
            {firstRowTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`first-dup-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Second row of testimonials */}
        <div className="relative">
          <div className="flex scrolling-container">
            {/* Original set */}
            {secondRowTestimonials.map((testimonial, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-[380px] mx-3 group"
              >
                <div className="testimonial-card">
                  <Card className="relative bg-stone-950 border-stone-800 text-neutral-300 h-full z-10">
                    <CardContent className="pt-6">
                      <p className="mb-4 text-sm">{testimonial.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={testimonial.avatar}
                              alt={testimonial.name}
                            />
                            <AvatarFallback>
                              {testimonial.name
                                .substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-white text-sm">
                              {testimonial.name}
                            </div>
                            <div className="text-xs text-neutral-400">
                              {testimonial.role}, {testimonial.company}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {testimonial.socialLinks.map(
                            (social, socialIndex) => {
                              const Icon =
                                socialIcons[
                                  social.platform as keyof typeof socialIcons
                                ];
                              return Icon ? (
                                <a
                                  key={socialIndex}
                                  href={social.link}
                                  target="_blank"
                                  rel="noopener"
                                  className="text-neutral-400 hover:text-white transition-colors"
                                >
                                  <Icon size={16} />
                                </a>
                              ) : null;
                            }
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {secondRowTestimonials.map((testimonial, index) => (
              <div
                key={`second-dup-${index}`}
                className="flex-shrink-0 w-[380px] mx-3 group"
              >
                <div className="testimonial-card">
                  <Card className="relative bg-stone-950 border-stone-800 text-neutral-300 h-full z-10">
                    <CardContent className="pt-6">
                      <p className="mb-4 text-sm">{testimonial.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={testimonial.avatar}
                              alt={testimonial.name}
                            />
                            <AvatarFallback>
                              {testimonial.name
                                .substring(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-white text-sm">
                              {testimonial.name}
                            </div>
                            <div className="text-xs text-neutral-400">
                              {testimonial.role}, {testimonial.company}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {testimonial.socialLinks.map(
                            (social, socialIndex) => {
                              const Icon =
                                socialIcons[
                                  social.platform as keyof typeof socialIcons
                                ];
                              return Icon ? (
                                <a
                                  key={socialIndex}
                                  href={social.link}
                                  target="_blank"
                                  rel="noopener"
                                  className="text-neutral-400 hover:text-white transition-colors"
                                >
                                  <Icon size={16} />
                                </a>
                              ) : null;
                            }
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company logos */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-12">
        <h2 className="text-center text-2xl font-semibold text-white">
          Some folks who love Zephyr
        </h2>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-12 flex flex-wrap justify-center items-center gap-x-20 gap-y-10">
          {companyLogos.map((logo) => (
            <a
              key={logo.alt}
              href={logo.url}
              target="_blank"
              rel="noopener"
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                height={80}
                className="h-[80px] w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
