import { describe,it,expect } from "vitest";
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react'
import RecipeCard from "../components/RecipeCard";

describe('RecipeCard', () => {
    it('renders name, image, rating, amount of ingredients and time', () => {
        const recipe = {
            _id: '1',
            title: 'Knäckkola',
            imageUrl: 'https://i.imgur.com/7HUcUtm.jpeg',
            avgRating: '4',
            ingredients: [
                {name: 'Smör', amount: '100', unit: 'g'},
                {name: 'Socker', amount: '2', unit: 'dl'},
                {name: 'Ljus sirap', amount: '1', unit: 'dl'}
            ],
            timeInMins: 60
        };

        render(<RecipeCard recipe={recipe} />)

        expect(screen.getByText('Knäckkola')).toBeInTheDocument();

        const img = screen.getByAltText('Knäckkola');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', 'https://i.imgur.com/7HUcUtm.jpeg');

        expect(screen.getByText(/Betyg: 4/)).toBeInTheDocument();

        expect(screen.getByText(/Ingredienser: 3/)).toBeInTheDocument();

        expect(screen.getByText(/Betyg: 4/)).toBeInTheDocument();

    })
})