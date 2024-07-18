import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import TaskForm from './TaskForm';
import type { TaskFormProps } from './TaskForm.type';

const mockOnSubmit = vi.fn();

const defaultValues = {
  id: 1,
  title: 'Sample Task',
  description: 'This is a sample task description.',
  status: 'Pending',
};

const defaultProps: TaskFormProps = {
  onSubmit: mockOnSubmit,
  defaultValues,
};

describe('TaskForm', () => {
  it('renders TaskForm component', () => {
    render(<TaskForm {...defaultProps} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  it('calls onSubmit with sanitized data when form is submitted', async () => {
    render(<TaskForm {...defaultProps} />);

    fireEvent.input(screen.getByLabelText(/title/i), { target: { value: '<script>' } });
    fireEvent.input(screen.getByLabelText(/description/i), { target: { value: '<b>description</b>' } });
    fireEvent.mouseDown(screen.getByLabelText(/status/i));
    fireEvent.click(screen.getByText(/in progress/i));

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        id: defaultValues.id,
        title: '&lt;script&gt;',
        description: '&lt;b&gt;description&lt;/b&gt;',
        status: 'In Progress',
      });
    });
  });
});
