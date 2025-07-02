# Vite Language Learning Game

A React TypeScript project that simulates a language learning game similar to Vite. The game presents images and asks users to select the correct translation from 4 multiple choice options, helping kids learn basic vocabulary.

## Features

- Image-based visual quiz questions using kids vocabulary (ages 5-6)
- Simple 4-option multiple choice gameplay
- Progress tracking with visual progress bar
- Score keeping with celebration effects
- Responsive design for mobile and desktop
- Game completion screen with restart option
- Celebratory sounds and animations when scoring correctly
- Vocabulary organized by categories (Colors, Animals, Body Parts, etc.)
- Adaptive question generation from vocabulary data
- Colorful placeholders when images are not available

## Vocabulary Categories

The game includes vocabulary from these categories:

- **Colors**: red, blue, green, yellow, etc.
- **Animals**: cat, dog, bird, fish, etc.
- **Body Parts**: head, eyes, nose, hand, etc.
- **Clothes**: shirt, pants, dress, hat, etc.
- **Numbers**: one, two, three, four, etc.
- **Everyday Objects**: book, car, phone, ball, etc.
- **Nature**: sun, moon, tree, flower, etc.
- **Family & People**: mom, dad, baby, sister, etc.
- **Actions**: run, jump, eat, play, etc.

## Project Structure

```
src/
├── components/
│   ├── Game.tsx                    # Main game component with game logic
│   └── Game.css                    # Styling for the game component
├── data/
│   ├── questions.ts                # Dynamic question generation
│   └── kids_vocabulary_ages_5_6.json # Vocabulary data by category
├── App.tsx                         # Main application component
└── App.css                         # Global application styles
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Image System

The game uses a smart fallback system for vocabulary images:

1. **Vector Graphics (.svg)**: All words have educational SVG illustrations
2. **Educational Placeholders (.svg)**: Beautiful, color-coded SVG graphics for each word
3. **Dynamic Fallback**: Canvas-generated placeholders as final fallback

The game automatically uses .svg files, or creates a dynamic placeholder if needed. All 130 vocabulary words have educational SVG placeholders included.

## 🎮 How to Play

1. **View the Question**: You'll see an image and the question "What is this?"
2. **Choose Your Answer**: Select the correct word from 4 multiple choice options
3. **Get Feedback**: Your selection will be highlighted as correct (green) or incorrect (red)
4. **Hear Audio**: Enjoy celebratory sounds for correct answers
5. **Track Progress**: Watch your score and progress bar as you advance
6. **Complete & Repeat**: Finish all questions to see your final score and play again

## 🛠 Technologies Used

- **React 18** with TypeScript for type safety
- **Vite** for fast development and building
- **CSS3** with modern features (Grid, Flexbox, Gradients)
- **Web Audio API** for sound effects
- **SVG Graphics** for educational placeholders
- **Dynamic Question Generation** from JSON vocabulary data

## 📊 Game Statistics

- **130 Total Vocabulary Words** across 10 categories
- **15 Questions per Game** (randomly selected and shuffled)
- **Smart Image System** with multiple fallback options
- **Category-Based Learning** with color-coded themes
- **Responsive Design** works on desktop and mobile

## 🔧 Advanced Usage

### Customizing Vocabulary

To modify the vocabulary or add new categories:

1. Edit `src/data/kids_vocabulary_ages_5_6.json`
2. Add new categories or words following the existing structure
3. The game will automatically include new vocabulary in question generation

### Customizing Game Behavior

You can modify game settings in `src/data/questions.ts`:

```typescript
// Change number of questions per game (currently 15)
return shuffledQuestions.slice(0, 20); // Change to 20 questions

// Modify words per category (currently 2)
const selectedWords = getRandomItems(words, Math.min(3, words.length)); // Change to 3
```

### Available Commands

```bash
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint
```

## 🎯 Educational Value

This game is designed for kids ages 5-6 and provides:

- **Visual Learning**: Image-based questions help with word association
- **Category Organization**: Vocabulary grouped by logical themes
- **Immediate Feedback**: Instant visual and audio feedback
- **Progress Tracking**: Motivating progress indicators and scoring
- **Repetitive Learning**: Different word combinations each game session
- **Adaptive Content**: Smart question generation ensures variety

## 🌟 Future Enhancements

Potential improvements you could add:

- **Multiple Languages**: Expand beyond English vocabulary
- **Difficulty Levels**: Easy/Medium/Hard question sets
- **User Profiles**: Save progress and statistics
- **Streak Tracking**: Track consecutive correct answers
- **Timer Mode**: Add time pressure for advanced players
- **Custom Word Lists**: Allow teachers/parents to create custom vocabulary sets

## 📝 License

This project is open source and available under the MIT License.
