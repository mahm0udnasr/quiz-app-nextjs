# Modern Quiz App

An interactive and modern quiz application built with Next.js and TypeScript, specifically designed for academic and educational assessments in Arabic language.

## Key Features

### Diverse Question Types

- True/False questions
- Multiple choice questions
- Easy support for adding new question types

### Advanced User Interface

- Modern and responsive design
- Interactive animations
- Compatible with all devices (mobile, tablet, desktop)
- Smooth transitions between questions

### Timing and Tracking System

- Real-time timer for measuring quiz duration
- Dynamic progress bar
- Detailed performance statistics

### Local Data Storage

- Automatic saving of results in browser
- Complete history of previous attempts
- Ability to resume quiz later

### Smart Evaluation System

- Accurate result calculation
- Pass rate determination (50% minimum)
- Detailed statistics display
- Success and failure animations

### Advanced State Management

- Custom hooks for quiz management
- Smart local state management
- Comprehensive error handling

## Technologies Used

### Frontend Framework

- **Next.js 14** - Advanced React framework
- **TypeScript** - For type safety
- **React Hooks** - For state management

### Styling & UI

- **Tailwind CSS** - For fast and responsive design
- **Lucide React** - Modern icon library
- **CSS Animations** - Custom animations

### State Management

- **Custom Hooks** - For quiz logic management
- **Local Storage** - For local data persistence
- **React State** - For temporary state management

## Project Structure

```
quiz-app/
├── app/
│ ├── page.tsx # Main page
│ ├── layout.tsx # App layout
│ └── globals.css # Global styles
├── components/
│ └── quiz/
│ ├── quiz-app.tsx # Main component
│ ├── quiz-header.tsx # Quiz header
│ ├── question-card.tsx # Question display
│ ├── quiz-navigation.tsx # Navigation buttons
│ ├── quiz-results.tsx # Results page
│ └── animations.tsx # Animations
├── hooks/
│ └── use-local-storage.ts # Local storage hook
├── types/
│ └── quiz.ts # TypeScript definitions
├── data/
│ └── quiz-data.ts # Question data
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/mahm0udnasr/quiz-app-nextjs.git
   cd quiz-app-nextjs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the project**
   ```bash
   npm run dev
   ```

4. **Open the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Current Quiz Content

### Topics Covered:

- Change management in organizations
- Information technology and innovation
- Digital transformation
- Business process reengineering
- Environmental sustainability
- Artificial intelligence and its applications

## Customization and Development

### Adding New Questions

```typescript
// In data/quiz-data.ts file
{
  id: 51,
  type: "multiple", // or "truefalse"
  question: "Your question here",
  options: ["Option 1", "Option 2", "Option 3", "Option 4"], // for multiple choice only
  correctAnswer: 0 // correct answer index
}
```

### Customizing Design

```css
/* In app/globals.css file */
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### Adding New Question Types

1. Update interface in `types/quiz.ts`
2. Add display logic in `question-card.tsx`
3. Update evaluation logic in `quiz-app.tsx`

## Contributing

We welcome your contributions! Please follow these steps:

1. **Fork the project**
2. **Create a new branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Guidelines:

- Write clear and understandable code
- Add tests for new features
- Update documentation when needed
- Follow existing design standards

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit) file for details.

## Developer

**Your Name Here**

- Email: [contact.mahmoudnasr@gmail.com](mailto:contact.mahmoudnasr@gmail.com)
- LinkedIn: [mahm0udnasr](https://www.linkedin.com/in/mahm0udnasr)
- GitHub: [mahm0udnasr](https://github.com/mahm0udnasr)
