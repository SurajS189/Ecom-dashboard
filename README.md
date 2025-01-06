E-Commerce Dashboard- https://surajs189.github.io/Ecom-dashboard/

This project is a feature-rich e-commerce dashboard that enables users to browse, filter, and sort products dynamically. The architecture is designed with scalability and maintainability in mind, incorporating modern design patterns and best practices in frontend development.

Project Structure

src/
|-- assets/              # Contains static assets like images (e.g., placeholder.png).
|-- components/          # Reusable React components.
|   |--ProductModel/      # Contents the models 
|   |-- ProductCard/     # Displays individual product details.
|   |-- ProductList/     # Main product listing page.
|   |-- Filter/          # Handles filtering and sorting of products.
|   |-- Thumbnail/       # Manages product image thumbnails.
|   |-- RatingStars/     # For review rating
|-- utils/               # Utility functions (e.g., API calls).
|-- App.js               # Main application component.
|-- index.js             # Entry point for the React app.

Features Implemented

1. Dynamic Product Listing

Products are displayed in a grid format with pagination and infinite scrolling.

Lazy loading is implemented for images to optimize performance.

2. Filtering and Sorting

Products can be filtered by categories and price range.

Products can be sorted by price in ascending (low to high) or descending (high to low) order.

3. Product Modal

Clicking on a product opens a modal with detailed information.

4. Thumbnail Management

Allows users to preview product images via thumbnails.

Handles fallback to a placeholder image if the original image fails to load.

5. Error Handling

Graceful fallback for API errors and image loading failures.

Displays appropriate messages when there are no products left or filters yield no results.

6. Responsive Design

Fully responsive layout using CSS modules.

Adaptive grid structure for different screen sizes.

7. Modern Design Patterns

Component-Based Design: Encapsulates functionality in reusable components.

Container-Presenter Pattern: Separates business logic and UI rendering.

Lazy Loading: Optimizes image and component loading.

Getting Started

Prerequisites

Ensure you have the following installed:

Node.js (v14 or later)

npm or yarn

Installation

1.Clone the repository:
git clone https://github.com/your-username/ecommerce-dashboard.git
cd ecommerce-dashboard

2.Install dependencies:
npm install
# or
yarn install

Running the Application

1.Start the development server: 
  npm start

APIs Used

fetchProducts(page, limit): Fetches paginated products from the backend.
fetchCategory:fetching all the category

How It Works

Filtering & Sorting

Filters and sorting preferences are stored in the filters state.

The applyFilters function dynamically applies category, price range, and sorting preferences to the product list.

Infinite Scrolling

The handleScroll function listens for scroll events to load more products when the user approaches the bottom of the page.

Lazy Loading

The loading="lazy" attribute is added to images to defer loading until they are visible in the viewport.

Fallback Mechanism

A placeholder image is displayed when a product image fails to load.

Error boundaries and fallback messages are implemented for robust error handling.

Future Enhancements

Add user authentication and cart functionality.

Integrate a global state management library like Redux or Context API for better sta