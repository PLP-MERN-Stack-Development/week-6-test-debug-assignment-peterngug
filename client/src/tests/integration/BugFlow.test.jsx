import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';
import axios from 'axios';

jest.mock('axios');

describe('Bug Flow Integration', () => {
  test('creates and displays new bug', async () => {
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({
      data: { _id: '1', title: 'Test Bug', description: 'Test Description', status: 'open' }
    });
    
    render(<App />);
    
    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Test Bug' } });
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByTestId('submit-button'));
    
    expect(await screen.findByText('Test Bug')).toBeInTheDocument();
  });
});