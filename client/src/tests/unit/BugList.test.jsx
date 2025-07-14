import { render, screen, fireEvent } from '@testing-library/react';
import BugList from '../../components/BugList';
import axios from 'axios';

jest.mock('axios');

describe('BugList', () => {
  test('renders bug list', async () => {
    axios.get.mockResolvedValue({
      data: [
        { _id: '1', title: 'Test Bug', description: 'Test Description', status: 'open' }
      ]
    });
    
    render(<BugList />);
    
    expect(await screen.findByTestId('bug-list')).toBeInTheDocument();
    expect(screen.getByText('Test Bug')).toBeInTheDocument();
  });

  test('handles status change', async () => {
    axios.get.mockResolvedValue({
      data: [
        { _id: '1', title: 'Test Bug', description: 'Test Description', status: 'open' }
      ]
    });
    axios.put.mockResolvedValue({
      data: { _id: '1', title: 'Test Bug', description: 'Test Description', status: 'in-progress' }
    });
    
    render(<BugList />);
    
    const select = await screen.findByTestId('status-select-1');
    fireEvent.change(select, { target: { value: 'in-progress' } });
    
    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:5000/api/bugs/1',
      { status: 'in-progress' }
    );
  });
});