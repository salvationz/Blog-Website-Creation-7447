import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the latest trends shaping the future of web development, from AI integration to progressive web apps and beyond.",
    content: `
      <h2>Introduction</h2>
      <p>The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends and technologies that will reshape how we build and interact with web applications.</p>
      
      <h2>AI-Powered Development</h2>
      <p>Artificial Intelligence is revolutionizing web development through automated code generation, intelligent debugging, and enhanced user experiences. Tools like GitHub Copilot and ChatGPT are becoming integral parts of developers' workflows.</p>
      
      <h2>Progressive Web Apps (PWAs)</h2>
      <p>PWAs continue to bridge the gap between web and native applications, offering offline functionality, push notifications, and app-like experiences directly through web browsers.</p>
      
      <h2>WebAssembly Growth</h2>
      <p>WebAssembly is enabling high-performance applications in the browser, allowing developers to run code written in languages like C++, Rust, and Go at near-native speeds.</p>
      
      <h2>Conclusion</h2>
      <p>As we move forward, staying updated with these trends will be crucial for developers looking to create cutting-edge web experiences.</p>
    `,
    author: "Sarah Johnson",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop",
    likes: 42,
    bookmarked: false
  },
  {
    id: 2,
    title: "Mastering Modern CSS: Grid, Flexbox, and Beyond",
    excerpt: "A comprehensive guide to modern CSS layout techniques that every developer should know in 2024.",
    content: `
      <h2>The Evolution of CSS Layouts</h2>
      <p>CSS has come a long way from the days of float-based layouts. Today's CSS offers powerful layout systems that make creating responsive, flexible designs easier than ever.</p>
      
      <h2>CSS Grid: The Ultimate Layout Tool</h2>
      <p>CSS Grid provides a two-dimensional layout system that allows you to create complex layouts with ease. Learn how to use grid-template-areas, grid-gap, and other essential properties.</p>
      
      <h2>Flexbox for Component Layouts</h2>
      <p>While Grid excels at page layouts, Flexbox is perfect for component-level layouts. Master the flex properties to create flexible, responsive components.</p>
      
      <h2>Container Queries: The Future is Here</h2>
      <p>Container queries allow you to style elements based on their container's size rather than the viewport, opening up new possibilities for truly modular designs.</p>
    `,
    author: "Mike Chen",
    date: "Dec 12, 2024",
    readTime: "7 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    likes: 35,
    bookmarked: false
  },
  {
    id: 3,
    title: "Building Scalable React Applications: Best Practices",
    excerpt: "Learn the essential patterns and practices for building maintainable and scalable React applications.",
    content: `
      <h2>Component Architecture</h2>
      <p>Building scalable React applications starts with good component architecture. Learn about composition patterns, prop drilling solutions, and when to split components.</p>
      
      <h2>State Management Strategies</h2>
      <p>Explore different state management approaches from useState and useContext to Redux Toolkit and Zustand. Choose the right tool for your application's needs.</p>
      
      <h2>Performance Optimization</h2>
      <p>Discover techniques like memoization, code splitting, and lazy loading to keep your React applications fast and responsive as they grow.</p>
      
      <h2>Testing Strategies</h2>
      <p>Implement comprehensive testing strategies using Jest, React Testing Library, and end-to-end testing tools to ensure your application remains reliable.</p>
    `,
    author: "Alex Rodriguez",
    date: "Dec 10, 2024",
    readTime: "8 min read",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    likes: 58,
    bookmarked: false
  },
  {
    id: 4,
    title: "The Art of Minimalist Design in Digital Products",
    excerpt: "Discover how minimalist design principles can improve user experience and create more effective digital products.",
    content: `
      <h2>Understanding Minimalism</h2>
      <p>Minimalist design isn't about removing everything—it's about removing the unnecessary to highlight what matters most. Learn the core principles of minimalist design.</p>
      
      <h2>White Space as a Design Element</h2>
      <p>White space isn't empty space—it's a powerful design tool that improves readability, creates focus, and enhances the overall user experience.</p>
      
      <h2>Typography in Minimalist Design</h2>
      <p>Typography plays a crucial role in minimalist design. Discover how to choose fonts, establish hierarchy, and create visual interest through typography alone.</p>
      
      <h2>Color Psychology and Restraint</h2>
      <p>Learn how to use color strategically in minimalist designs, understanding when to use bold colors and when restraint creates more impact.</p>
    `,
    author: "Emma Wilson",
    date: "Dec 8, 2024",
    readTime: "6 min read",
    category: "Design",
    image: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=800&h=400&fit=crop",
    likes: 29,
    bookmarked: false
  },
  {
    id: 5,
    title: "Remote Work: Finding Balance in a Digital World",
    excerpt: "Tips and strategies for maintaining work-life balance while working remotely in today's digital landscape.",
    content: `
      <h2>Setting Boundaries</h2>
      <p>One of the biggest challenges of remote work is setting clear boundaries between work and personal life. Learn strategies for creating physical and mental separation.</p>
      
      <h2>Creating Your Ideal Workspace</h2>
      <p>Your environment significantly impacts your productivity and well-being. Discover how to create a workspace that promotes focus and creativity.</p>
      
      <h2>Communication in Remote Teams</h2>
      <p>Effective communication becomes even more critical in remote settings. Learn about tools, techniques, and best practices for staying connected with your team.</p>
      
      <h2>Managing Time and Productivity</h2>
      <p>Remote work offers flexibility, but it also requires discipline. Explore time management techniques and productivity systems that work in remote environments.</p>
    `,
    author: "David Park",
    date: "Dec 5, 2024",
    readTime: "5 min read",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    likes: 41,
    bookmarked: false
  },
  {
    id: 6,
    title: "Sustainable Travel: Exploring the World Responsibly",
    excerpt: "How to travel sustainably while still having amazing experiences and creating lasting memories.",
    content: `
      <h2>Planning Sustainable Trips</h2>
      <p>Sustainable travel starts with planning. Learn how to choose destinations, accommodations, and transportation options that minimize your environmental impact.</p>
      
      <h2>Supporting Local Communities</h2>
      <p>Discover how to travel in ways that benefit local communities, from choosing locally-owned businesses to participating in community-based tourism initiatives.</p>
      
      <h2>Minimizing Environmental Impact</h2>
      <p>Explore practical strategies for reducing your carbon footprint while traveling, including packing tips, transportation choices, and waste reduction techniques.</p>
      
      <h2>Meaningful Travel Experiences</h2>
      <p>Learn how sustainable travel can lead to more meaningful and authentic experiences that create lasting memories while preserving destinations for future generations.</p>
    `,
    author: "Lisa Thompson",
    date: "Dec 3, 2024",
    readTime: "7 min read",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop",
    likes: 33,
    bookmarked: false
  }
];