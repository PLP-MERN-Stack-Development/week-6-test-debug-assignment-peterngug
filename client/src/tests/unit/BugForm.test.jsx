import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../../components/BugForm';
import axios from 'axios';

jest.mock('axios');

describe('BugForm', () => {
  test('renders form elements', () => {
    render(<BugForm onBugAdded={() => {}} />);
    
    expect(screen.getByTestId('title-input')).toBeInTheDocument();
    expect(screen.getByTestId('description-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const mockOnBugAdded = jest.fn();
    axios.post.mockResolvedValue({ data: { _id: '1', title: 'Test', description: 'Test' } });
    
    render(<BugForm onBugAdded={mockOnBugAdded} />);
    
    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Test Bug' } });
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByTestId('submit-button'));
    
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/api/bugs',
      { title: 'Test Bug', description: 'Test Description' }
    );
    expect(mockOnBugAdded).toHaveBeenCalled();
  });

  test('displays error message on failed submission', async () => {
    axios.post.mockRejectedValue({ response: { data: { message: 'Validation error' } } });
    
    render(<BugForm onBugAdded={() => {}} />);
    
    fireEvent.change(screen.getByTestId('title-input'), { target: { value: 'Test Bug' } });
    fireEvent.change(screen.getByTestId('description-input'), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByTestId('submit-button'));
    
    expect(await screen.findByText('Validation error')).toBeInTheDocument();
  });
});