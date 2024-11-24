# Book Store Application

A React-based web application for generating and testing book store data with support for multiple languages, customizable parameters, and infinite scrolling.

🔗 **Live Demo**: [https://book-store-2nuv.onrender.com/](https://book-store-2nuv.onrender.com/)

## Features

- Multi-language support (English, Russian, French)
- Customizable seed value for consistent data generation
- Adjustable likes and reviews per book
- Infinite scrolling book list
- Grid and list view modes
- CSV export functionality
- Responsive design
- Expandable book details with cover preview

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Luk1e/book-store.git
cd book-store
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── components/
│   ├── BookGrid.jsx    # Grid view component for books
│   ├── BookListing.jsx # Main component managing book list
│   ├── BookRow.jsx     # List view component for books
│   └── Controls.jsx    # Control panel component
├── utils/
│   └── bookGenerator.js # Book data generation utility
├── App.jsx
└── main.jsx
```

## Dependencies

- React (v18)
- Vite
- Tailwind CSS
- Lucide React (for icons)
- Papa Parse (for CSV export)
- Lodash (for utility functions)

## Core Functionality

### Book Generation

- Generates random book data based on selected parameters
- Supports different languages and regions
- Creates realistic-looking book information including:
  - ISBN numbers
  - Titles
  - Authors
  - Publishers
  - Reviews
  - Likes

### User Interface

- **Control Panel**:

  - Language selection
  - Seed value input/generation
  - Likes per book adjustment
  - Reviews per book adjustment
  - View mode toggle (Grid/List)
  - Export to CSV functionality

- **Book Display**:
  - Infinite scroll loading
  - Expandable book details
  - Random color-based book covers
  - Review display
  - Like and review count

### Data Management

- Client-side data generation
- No backend required
- Consistent data generation using seed values
- Fractional review/like system support

## Usage

### Basic Controls

1. **Language Selection**: Choose from available languages in the dropdown
2. **Seed Value**: Enter a specific seed or generate random one
3. **Likes Per Book**: Adjust average number of likes (0-10)
4. **Reviews Per Book**: Set average number of reviews
5. **View Mode**: Toggle between grid and list views
6. **Export**: Download current data set as CSV

### Advanced Features

- **Infinite Scrolling**: Scroll down to load more books automatically
- **Expandable Details**: Click on a book to view full details
- **Responsive Layout**: Adapts to different screen sizes
- **Data Persistence**: Same seed generates same data

### Fractional Reviews System

- `0` reviews: No reviews generated
- `0.5` reviews: One review per two books (50% probability)
- `1` review: One review per book
- `1.5` reviews: Mix of one and two reviews per book
- And so on...

## License

ISC

## Author

Luka Gogiashvili
