# Introduction

Drizzle UI is the minimalist component library used in Drizzle Next. Drizzle UI was greatly influenced by the copy-and-paste approach of shadcn/ui. In fact, shadcn/ui was the original UI solution for Drizzle Next. However, it was ultimately decided that Drizzle Next would benefit from having an ultra-minimalist version of it's own copy-and-paste component library.

Many dependencies were required to use shadcn/ui components. For example, components such as avatar, checkbox, label, select, dark mode and other basic features required various packages to be installed. This slowed down the installation, build and testing process for Drizzle Next. Many of the dependencies seemed extraneous, as a similar result could be attained without added dependencies.

Extra dependencies increase the probability of maintenance issues as reliance on external packages increase. The main objective for Drizzle UI was to see if any dependencies could be removed and still achieve a similar result. The only package that Drizzle UI depends on is `clsx`, and if you're using tailwind, then add in `tailwind-merge`. Drizzle UI uses the `lucide-react` icon set, however its easy swap out, since the components are copied into your project.

For the reasons as outlined above, Drizzle UI was conceptualized for use by Drizzle Next. It is not a replacement for shadcn/ui or radix-ui or any other UI library. It is just a simple starting point for Drizzle Next. You are free to change or add anything you want. That is the beauty of the copy-and-paste way.
