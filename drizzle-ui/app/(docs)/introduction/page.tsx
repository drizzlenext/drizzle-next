import { ComponentCode } from "@/components/component-layout/component-code";

const code = /*js*/ `
{
  "@radix-ui/react-avatar": "^1.1.0",
  "@radix-ui/react-checkbox": "^1.1.1",
  "@radix-ui/react-dialog": "^1.1.1",
  "@radix-ui/react-dropdown-menu": "^2.1.1",
  "@radix-ui/react-icons": "^1.3.0",
  "@radix-ui/react-label": "^2.1.0",
  "@radix-ui/react-popover": "^1.1.1",
  "@radix-ui/react-radio-group": "^1.2.1",
  "@radix-ui/react-select": "^2.1.4",
  "@radix-ui/react-separator": "^1.1.0",
  "@radix-ui/react-slot": "^1.1.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "cmdk": "^1.0.0",
  "next-themes": "^0.3.0",
  "tailwindcss-animate": "^1.0.7",
}
`;

export default function Page() {
  return (
    <div className="p-5">
      <h1 className="border-b border-muted-300 text-4xl font-bold dark:border-muted-700">
        Introduction
      </h1>
      <div className="flex flex-col gap-5 py-4">
        <p>
          Drizzle UI is mainly a showcase of the components used by Drizzle
          Next. Drizzle UI was heavily influenced by the copy-and-paste approach
          of shadcn/ui. In fact, shadcn/ui was the original UI solution for
          Drizzle Next. However, it was ultimately decided that Drizzle Next
          would benefit from having an ultra-minimalist version of it&apos;s own
          copy-and-paste component library.
        </p>
        <p>
          The first reason was the large number of dependencies that needed to
          be installed just to get the standard form fields. This slowed down
          the installation, build and testing process for Drizzle Next. Here is
          an example of a package.json from a past Drizzle Next installation
          that used shadcn/ui.
        </p>
        <ComponentCode code={code} language="json" title="" />
        <p>
          In addition, many of the dependencies seemed extraneous, as a similar
          result could be attained without added dependencies. Here are 3
          examples:
        </p>
        <ol className="ml-5 list-decimal">
          <li>
            The class variance authority dependency helped you define style
            variants for some of your components like buttons. However, that
            could easily be accomplished with a simple typescript `type`.
          </li>
          <li>
            The next-themes is a component used mainly for its dark mode.
            However, it requires you to add a ThemeProvider to your root layout.
            And it has other features that I have never really used.
          </li>
          <li>
            The select dropdown had some issues with accessing the event object,
            as you only get the string value in the callback. There was also an
            event propagation issue where clicks went through to the DOM
            elements behind the select recently. I believe it was fixed in a
            recent version, but it took time digging into it.
          </li>
        </ol>
        <p>
          This is not a criticism of any specific library. Just an increased
          probability of maintenance issues as reliance on external dependencies
          increase. The main objective for Drizzle UI was to see if any
          dependencies could be removed and still achieve a similar result.
        </p>
        <p>
          For the reasons as outlined above, Drizzle UI was conceptualized for
          use by Drizzle Next. It is not a replacement for shadcn/ui or radix-ui
          or any other UI library. It is just a simple starting point for
          Drizzle Next. You are free to change or add anything you want. That is
          the beauty of the copy-and-paste way.
        </p>
        <p>Drizzle Next is UI agnostic.</p>
      </div>
    </div>
  );
}
