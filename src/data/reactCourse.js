export const REACT_COURSE = {
  id: 'react-web-dev',
  title: 'Build Websites with React',
  subtitle: 'Learn to create modern websites and your own portfolio — step by step',
  icon: '⚛️',
  finalProject: 'Personal Portfolio Website',
  modules: [
    {
      id: 'm1',
      title: 'What is a Website?',
      description: 'Discover how websites work — perfect for young explorers!',
      minAgeMode: 'explorer',
      lessons: [
        { id: 'l1-1', title: 'Websites Are Digital Islands', duration: '5 min', type: 'story', xp: 50, icon: '🌐' },
        { id: 'l1-2', title: 'Pages, Links & Buttons', duration: '8 min', type: 'visual', xp: 75, icon: '🔗' },
        { id: 'l1-3', title: 'Your First Web Page Idea', duration: '10 min', type: 'creative', xp: 100, icon: '✨' },
      ],
    },
    {
      id: 'm2',
      title: 'HTML & CSS Foundations',
      description: 'Structure and style your pages like a pro designer',
      minAgeMode: 'creator',
      lessons: [
        { id: 'l2-1', title: 'HTML Tags & Structure', duration: '12 min', type: 'code', xp: 120, icon: '📝' },
        { id: 'l2-2', title: 'CSS Colors & Layout', duration: '15 min', type: 'code', xp: 150, icon: '🎨' },
        { id: 'l2-3', title: 'Responsive Design Basics', duration: '15 min', type: 'interactive', xp: 180, icon: '📱' },
      ],
    },
    {
      id: 'm3',
      title: 'Introduction to React',
      description: 'Meet React — the tool developers use to build modern sites',
      minAgeMode: 'creator',
      lessons: [
        { id: 'l3-1', title: 'What is React?', duration: '10 min', type: 'video', xp: 100, icon: '⚛️' },
        { id: 'l3-2', title: 'JSX — HTML in JavaScript', duration: '15 min', type: 'code', xp: 150, icon: '💻' },
        { id: 'l3-3', title: 'Your First Component', duration: '20 min', type: 'code', xp: 200, icon: '🧩' },
      ],
    },
    {
      id: 'm4',
      title: 'Components & Props',
      description: 'Build reusable UI blocks like LEGO pieces',
      minAgeMode: 'innovator',
      lessons: [
        { id: 'l4-1', title: 'Functional Components', duration: '15 min', type: 'code', xp: 180, icon: '🔧' },
        { id: 'l4-2', title: 'Props — Passing Data', duration: '18 min', type: 'code', xp: 200, icon: '📦' },
        { id: 'l4-3', title: 'Component Composition', duration: '20 min', type: 'project', xp: 250, icon: '🏗️' },
      ],
    },
    {
      id: 'm5',
      title: 'State & Interactivity',
      description: 'Make your website respond to clicks and user input',
      minAgeMode: 'innovator',
      lessons: [
        { id: 'l5-1', title: 'useState Hook', duration: '20 min', type: 'code', xp: 220, icon: '🔄' },
        { id: 'l5-2', title: 'Events & Handlers', duration: '18 min', type: 'code', xp: 200, icon: '👆' },
        { id: 'l5-3', title: 'Conditional Rendering', duration: '15 min', type: 'code', xp: 180, icon: '🔀' },
      ],
    },
    {
      id: 'm6',
      title: 'Build a Real Website',
      description: 'Create a multi-section website from scratch',
      minAgeMode: 'innovator',
      lessons: [
        { id: 'l6-1', title: 'Navigation & Routing', duration: '25 min', type: 'code', xp: 280, icon: '🧭' },
        { id: 'l6-2', title: 'Layout with Tailwind CSS', duration: '25 min', type: 'code', xp: 280, icon: '🎯' },
        { id: 'l6-3', title: 'Deploy Your Website', duration: '20 min', type: 'project', xp: 300, icon: '🚀' },
      ],
    },
    {
      id: 'm7',
      title: 'Portfolio Project',
      description: 'Showcase your skills — your capstone project!',
      minAgeMode: 'innovator',
      lessons: [
        { id: 'l7-1', title: 'Portfolio Structure', duration: '30 min', type: 'project', xp: 350, icon: '📂' },
        { id: 'l7-2', title: 'Projects Showcase Section', duration: '30 min', type: 'project', xp: 350, icon: '🖼️' },
        { id: 'l7-3', title: 'Publish & Share Portfolio', duration: '25 min', type: 'project', xp: 400, icon: '🌍' },
      ],
    },
  ],
}

export const LESSON_SNIPPETS = {
  'l3-3': {
    starter: `function Welcome() {
  return (
    <div>
      <h1>Hello, Zanzibar.Center!</h1>
    </div>
  );
}`,
    challenge: 'Add a <p> tag with your name below the heading',
    validate: (code) => code.includes('<p>') && code.includes('</p>'),
    hint: 'Use <p>Your Name</p> inside the div',
  },
  'l4-2': {
    starter: `function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Use it:
<Greeting name="Explorer" />`,
    challenge: 'Change the name prop to your island name',
    validate: (code) => code.includes('name='),
    hint: 'Props go inside the component tag: name="..."',
  },
  'l5-1': {
    starter: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicks: {count}
    </button>
  );
}`,
    challenge: 'Add a second button to decrease the count',
    validate: (code) => code.includes('count - 1') || code.includes('count-1'),
    hint: 'Use setCount(count - 1) in another onClick',
  },
  'l7-1': {
    starter: `function Portfolio() {
  return (
    <main>
      <header><h1>My Portfolio</h1></header>
      <section>{/* About */}</section>
      <section>{/* Projects */}</section>
    </main>
  );
}`,
    challenge: 'Add an About section with a short bio paragraph',
    validate: (code) => code.toLowerCase().includes('about') && code.includes('<p>'),
    hint: 'Fill the About section with <p>Your bio here</p>',
  },
}

export function getAllLessons() {
  return REACT_COURSE.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title, minAgeMode: m.minAgeMode }))
  )
}

export function getCourseProgress(completedLessons = {}) {
  const all = getAllLessons()
  const done = all.filter((l) => completedLessons[l.id]?.completed).length
  return { completed: done, total: all.length, percent: Math.round((done / all.length) * 100) }
}

const MODE_ORDER = { explorer: 0, creator: 1, innovator: 2 }

export function filterModulesByAge(modules, ageMode = 'creator') {
  const level = MODE_ORDER[ageMode] ?? 1
  return modules.filter((m) => (MODE_ORDER[m.minAgeMode] ?? 1) <= level)
}
