# Senior Front-End Engineer Technical Challenge: Jack Henry & Associates

## Overview
This exercise is part of the Senior Front-End Engineer interview process for Jack Henry & Associates. You will be building a self-contained YouTube Search module. At Jack Henry, we value framework-agnostic, high-performance web standards. While we use Lit for our core UI components, we are interested in your ability to leverage native browser APIs effectively.

## Technical Requirements
- [x] Library: Lit (latest version).
- [x] Language: Your choice of TypeScript or JavaScript. (If using JS, please use modern ESNext features).
- [x] Styling: Native CSS and Shadow DOM.
- [x] State Management: Use native patterns (Events, Lit Context, or Reactive Controllers). Avoid external global state libraries like Redux.

## Feature Requirements
Your application should consist of a Search View containing the following:

### Search & Discovery
- [x] Keyword Search: Integrate with the YouTube Data API to fetch results.
- [x] Sorting: Support sorting by Date, Rating, and Relevance.
- [x] List/Grid View: Display results with:
  - [x] Title (Link to the video on YouTube.com).
  - [x] Thumbnail image.
  - [x] Description.
  - [x] Total comment count.

### The Senior-Level Requirement: Persistence & Decoupling
- [ ] Bookmarks: Users must be able to "Save" videos to a bookmarks list.
- [ ] Users should be able to view their list of bookmarks using the same list/grid components as the regular search.
- [ ] Storage: Bookmarks must persist across sessions.
- [ ] Architecture: The "Search" and "Bookmarks" components should be decoupled. They should be composed from the same base components, but should be able to run independently of one another.

## Engineering Standards
- [x] Accessibility (A11y): In banking, inclusion is a requirement. Ensure your components are keyboard-navigable and screen-reader friendly (ARIA labels, focus management).
- [ ] Security: Demonstrate awareness of XSS risks when rendering data from external APIs.
- [x] Performance: Optimize for "low-end" mobile devices. Consider how you handle 50+ images and text blocks without impacting the main thread. Be careful with how you handle concurrent requests to the YouTube API.
- [x] Responsiveness: Everything should function well on both huge monitors and ancient tiny mobile devices.
- [ ] AI Disclosure: If you use AI tools (e.g., Copilot, ChatGPT), please include a brief AI-LOG.md explaining where you used AI and how you validated its output for security or performance.

## Submission & Interview Format
- [ ] GitHub: Send your repository link the day before our meeting.
- [ ] README: Include a brief "Architectural Decision Record" (ADR) explaining your choice of language (TS vs JS) and your state management strategy.
- [ ] The Session (75 Minutes):
  - [ ] The Deep Dive: You will present your solution to a panel of engineers. We will ask you to explain your component lifecycles and "why" you made specific design choices.
  - [ ] Live Evolution: We will present a new business requirement (e.g., "We need to add a 'Clear All' function that clears both the search and the bookmarks simultaneously") to see how you adapt your code.
  - [ ] Q&A: We will leave a little time at the end for you to ask us questions about the role or the company.
